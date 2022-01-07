import {Alert, Box, Button, CircularProgress, TextField} from "@mui/material";
import {useFormik} from "formik";
import {MouseEvent, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useFirebaseErrors} from "../../api/useFirebaseErrors";
import {useAuthContext} from "../../context/AuthContextProvider";
import {routes} from "../../routes";
import {SignupSchema} from "../../schemas/SignupSchema";

interface FormState {
    email: string;
    password: string;
    confirmPassword: string;
    username: string;
}

const SignUpForm = () => {
    const navigate = useNavigate();
    const {getErrorMessage} = useFirebaseErrors();
    const {loading, setLoading, signUp} = useAuthContext();
    const [error, setError] = useState<string | null>(null);
    const formik = useFormik<FormState>({
        initialValues: {
            email: "",
            password: "",
            confirmPassword: "",
            username: "",
        },
        validationSchema: SignupSchema,
        onSubmit: async (values) => {
            try {
                setLoading(true);
                await signUp(values.email, values.password, values.username);
            } catch (error) {
                setError(getErrorMessage((error as Error).message));
            } finally {
                navigate(routes.verifyEmail);
            }
        },
    });

    const emailRef = useRef<HTMLInputElement | null>(null);

    function onCancel(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        navigate(routes.signIn);
    }

    async function onSubmit(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        await formik.submitForm();
    }

    return (
        <Box component="form" noValidate autoComplete="off" display="flex" flexDirection="column" minWidth={300}
             gap={2}>
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
                        variant="outlined"/>
                    <TextField
                        size="small"
                        name="username"
                        label="Name"
                        value={formik.values.username}
                        error={formik.touched.username && Boolean(formik.errors.username)}
                        helperText={formik.touched.username && formik.errors.username}
                        onChange={formik.handleChange}
                        variant="outlined"/>
                    <TextField
                        size="small"
                        name="password"
                        label="Password"
                        type="password"
                        value={formik.values.password}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                        onChange={formik.handleChange}
                        variant="outlined"/>
                    <TextField
                        size="small"
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        value={formik.values.confirmPassword}
                        error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                        helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                        onChange={formik.handleChange}
                        variant="outlined"/>
                    {error && <Alert sx={{alignItems: "center"}} severity="error">{error}</Alert>}
                    <Box display="flex" alignItems="center" justifyContent="end" gap={1}>
                        <Button variant="outlined" onClick={onCancel} color="error">
                            Cancel
                        </Button>
                        <Button variant="outlined" onClick={onSubmit} type="submit" color="success">
                            Sign Up
                        </Button>
                    </Box>
                </>
            )}
        </Box>
    );
};

export default SignUpForm;
