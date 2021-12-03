import {
  Box,
  Button,
  CircularProgress,
  Link,
  TextField,
  useTheme,
} from "@mui/material";
import { darken } from "@mui/system";
import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useAuthContext } from "../../context/AuthContextProvider";
import { routes } from "../../routes";

interface FormState {
  email: string;
  password: string;
}

const defaultFormState: FormState = {
  email: "",
  password: "",
};

const SigninForm = () => {
  const [formState, setFormState] = useState<FormState>(defaultFormState);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const { loading, setLoading, signIn, user } = useAuthContext();

  const emailRef = useRef<HTMLInputElement | null>(null);

  const isSubmitDisabled = () => !formState.email || !formState.password;

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  }

  async function onSubmit(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      const signed = await signIn(formState.email, formState.password);
      if (signed) {
        navigate(routes.home);
      } else {
        setFormState({
          ...formState,
          password: defaultFormState.password,
        });
      }
    } catch (error) {
      // TODO: Show an alert or something.
      console.log(`Couldn't login. ${error}`);

      setLoading(false);
    }
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
            value={formState.email}
            onChange={onChange}
            variant="outlined"
          />
          <TextField
            size="small"
            name="password"
            label="Password"
            type="password"
            value={formState.password}
            onChange={onChange}
            variant="outlined"
          />
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
              disabled={isSubmitDisabled()}
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
