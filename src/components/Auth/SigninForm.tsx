import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Link,
  TextField,
  useTheme,
} from "@mui/material";
import { darken } from "@mui/system";
import { useFormik } from "formik";
import { MouseEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useFirebaseErrors } from "../../api/useFirebaseErrors";
import { useAuthContext } from "../../context/AuthContextProvider";
import { routes } from "../../routes";
import { SigninSchema } from "../../schemas/SigninSchema";

interface FormState {
  email: string;
  password: string;
}

const SigninForm = () => {
  const { getErrorMessage } = useFirebaseErrors();
  const formik = useFormik<FormState>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: SigninSchema,
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
  const { palette } = useTheme();
  const { loading, setLoading, signIn, user } = useAuthContext();
  const [error, setError] = useState<string | null>(null);

  const emailRef = useRef<HTMLInputElement | null>(null);

  async function onSubmit(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    formik.submitForm();
  }

  function onGotoSignup(e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    navigate(routes.signUp);
  }

  useEffect(() => {
    if (user) navigate(routes.home);
  }, [user, navigate]);

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      display="flex"
      flexDirection="column"
      width="60%"
      minHeight={150}
      gap={2}
    >
      {loading ? (
        <Box
          flex="1"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <CircularProgress />
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
            <Alert sx={{ alignItems: "center" }} severity="error">
              {error}
            </Alert>
          )}
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Link
              sx={{
                cursor: "pointer",
              }}
              color={darken(palette.secondary.main, 0.2)}
              onClick={onGotoSignup}
            >
              Create a new account!
            </Link>
            <Button
              variant="outlined"
              onClick={onSubmit}
              type="submit"
              color="success"
            >
              Sign In
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default SigninForm;
