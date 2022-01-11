import {
    Alert,
    Box,
    Button,
    CircularProgress, Divider,
    Link, Stack,
    TextField,
    useTheme,
} from "@mui/material";
import {darken} from "@mui/system";
import {useFormik} from "formik";
import {MouseEvent, useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router";
import {useFirebaseErrors} from "../../api/useFirebaseErrors";
import {useAuthContext} from "../../context/AuthContextProvider";
import {routes} from "../../routes";
import {SignInSchema} from "../../schemas/SignInSchema";

interface FormState {
    email: string;
    password: string;
}

const SignInForm = () => {
    const {getErrorMessage} = useFirebaseErrors();
    const formik = useFormik<FormState>({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: SignInSchema,
        onSubmit: async (values) => {
            try {
                setLoading(true);
                formik.resetForm({
                    values: {
                        email: values.email,
                        password: formik.initialValues.password,
                    },
                });
                await signIn(formik.values.email, formik.values.password);
            } catch (error) {
                setError(getErrorMessage((error as Error).message));
            } finally {
                setLoading(false);
            }
        },
    });
    const navigate = useNavigate();
    const {palette} = useTheme();
    const {loading, setLoading, signIn, signInWithGoogle, user} = useAuthContext();
    const [error, setError] = useState<string | null>(null);

    const emailRef = useRef<HTMLInputElement | null>(null);

    async function onSubmit(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        await formik.submitForm();
    }

    function onGotoSignup(e: MouseEvent<HTMLAnchorElement>) {
        e.preventDefault();
        navigate(routes.signUp);
    }

    async function onGoogleSignIn() {
        try {
            await signInWithGoogle();
        } catch (e) {
            setError(getErrorMessage((e as Error).message));
        }
    }

    useEffect(() => {
        if (user?.emailVerified) {
            navigate(routes.home);
        }
    }, [user, navigate]);

    return (
        <Box component="form" noValidate autoComplete="off" display="flex" flexDirection="column" gap={2}
             minWidth={300}>
            {loading ? (
                <Box flex="1" display="flex" alignItems="center" justifyContent="center">
                    <CircularProgress/>
                </Box>
            ) : (
                <>
                    <TextField
                        autoFocus
                        inputRef={emailRef}
                        size="small"
                        name="email"
                        label="Email"
                        type="email"
                        value={formik.values.email}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        onChange={formik.handleChange}
                        variant="outlined"
                    />
                    <TextField
                        size="small"
                        name="password"
                        label="Password"
                        type="password"
                        value={formik.values.password}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                        onChange={formik.handleChange}
                        variant="outlined"
                    />
                    {error && (
                        <Alert sx={{alignItems: "center"}} severity="error">
                            {error}
                        </Alert>
                    )}
                    <Box display="flex" alignItems="center" justifyContent="space-between" gap={4}>
                        <Link sx={{cursor: "pointer"}} color={darken(palette.secondary.main, 0.2)}
                              onClick={onGotoSignup}>
                            Create an account!
                        </Link>
                        <Button variant="outlined" disabled={loading} onClick={onSubmit} type="submit" color="success">
                            Sign In
                        </Button>
                    </Box>
                    <Divider>or</Divider>
                    <Stack alignItems="center">
                        <Button disableRipple onClick={onGoogleSignIn} sx={{
                            width: 191,
                            height: 46,
                            background: "url('/images/btn_google_signin_dark_normal_web.png')",
                            backgroundRepeat: "no-repeat",
                            "&:hover": {
                                background: "url('/images/btn_google_signin_dark_focus_web.png') no-repeat"
                            }
                        }}/>
                    </Stack>
                </>
            )}
        </Box>
    );
};

export default SignInForm;
