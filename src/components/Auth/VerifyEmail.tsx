import {Alert, Stack, Typography} from "@mui/material";
import {useCallback, useEffect, useState} from "react";
import {useInterval} from "../../hooks/useInterval";
import {sendEmailVerification} from "../../api/firebase";
import {useAuthContext} from "../../context/AuthContextProvider";
import {useFirebaseErrors} from "../../api/useFirebaseErrors";
import {useNavigate} from "react-router-dom";
import {routes} from "../../routes";

// Cooldown in seconds
const defaultCooldown = 60;

const VerifyEmail = () => {
    const {user, setLoading} = useAuthContext();
    const {getErrorMessage} = useFirebaseErrors();
    const [cooldown, setCooldown] = useState<number>(defaultCooldown);
    const [error, setError] = useState<string | null>();
    const navigate = useNavigate();

    const sendEmail = useCallback(async () => {
        try {
            setError(null);
            if (!user) return;
            await sendEmailVerification(user);
            setCooldown(defaultCooldown);
        } catch (e) {
            setError(getErrorMessage((e as Error).message));
        }
    }, [user, getErrorMessage]);

    useInterval(() => {
        if (cooldown !== 0) {
            setCooldown((prev) => prev - 1);
        }
    }, 1000);

    useEffect(() => {
        sendEmail();
    }, [sendEmail]);

    useEffect(() => {
        if (!user) return navigate(routes.signIn);
        if (user?.emailVerified) {
            setLoading(false);
            navigate(routes.signUpComplete);
        }
    }, [navigate, setLoading, user]);

    return (
        <Stack alignItems="center" m="auto" gap={1}>
            <Typography mb={3}>An email was sent to: <b>{user?.email}</b></Typography>
            {error && <Alert severity="error">{error}</Alert>}
            <Typography>Didn't get our email?</Typography>
            <Typography>Resend verification email {
                cooldown
                    ? `in ${cooldown}`
                    : <Typography component="a" color="secondary" onClick={sendEmail}>here</Typography>
            }.
            </Typography>
        </Stack>
    );
}

export default VerifyEmail;