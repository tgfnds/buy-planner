import {Alert, Box, CircularProgress, Stack, Typography} from "@mui/material";
import {useLocation} from "react-router-dom";
import {useEffect, useMemo, useState} from "react";
import {useAuthContext} from "../context/AuthContextProvider";
import {useFirebaseErrors} from "../api/useFirebaseErrors";

const Verify = () => {
    const location = useLocation();
    const {verifyEmail} = useAuthContext();
    const {getErrorMessage} = useFirebaseErrors();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const params = useMemo(() => {
        const params = new URLSearchParams(location.search);
        const mode = params.get("mode");
        const oobCode = params.get("oobCode");
        return {mode, oobCode};
    }, [location.search]);

    useEffect(() => {
        async function verify() {
            if (params.mode !== "verifyEmail" || params.oobCode === null) return;
            try {
                console.log("verifying: ", params.oobCode);
                await verifyEmail(params.oobCode);
            } catch (e) {
                setError(getErrorMessage((e as Error).message));
            } finally {
                setLoading(false);
            }
        }

        verify();
    }, [getErrorMessage, params.mode, params.oobCode, verifyEmail]);

    if (loading) {
        return (
            <Box display="flex">
                <CircularProgress/>
            </Box>
        )
    }

    if (error) {
        return (
            <Box display="flex">
                <Alert severity="error">{error}</Alert>
            </Box>
        )
    }

    return (
        <Stack alignItems="center" gap={2}>
            <Typography>Email Verified!</Typography>
            <Typography>You can close this page now.</Typography>
        </Stack>
    );
};

export default Verify;