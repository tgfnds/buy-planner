import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContextProvider";
import { routes } from "../../routes";

interface FormState {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
}

const defaultFormState: FormState = {
  email: "",
  password: "",
  confirmPassword: "",
  username: "",
};

const SignupForm = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState<FormState>(defaultFormState);
  const { loading, setLoading, signUp, user } = useAuthContext();

  const emailRef = useRef<HTMLInputElement | null>(null);

  const isSubmitDisabled = () =>
    !formState.email || !formState.password || !formState.confirmPassword;

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  }

  function onCancel(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    navigate(routes.signIn);
  }

  async function onSubmit(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (formState.password !== formState.confirmPassword) {
      return;
      // TODO: Show error message.
    }
    setLoading(true);
    try {
      await signUp(formState.email, formState.password, formState.username);
    } catch (error) {
      // TODO: Show an alert or something.
      console.log(`Couldn't signup. ${error}`);
    }
    setLoading(false);
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
            name="username"
            label="Name"
            value={formState.username}
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
          <TextField
            size="small"
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            value={formState.confirmPassword}
            onChange={onChange}
            variant="outlined"
          />
          <Box display="flex" alignItems="center" justifyContent="end" gap={1}>
            <Button variant="outlined" onClick={onCancel} color="error">
              Cancel
            </Button>
            <Button
              variant="outlined"
              onClick={onSubmit}
              type="submit"
              color="success"
              disabled={isSubmitDisabled()}
            >
              Sign Up
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default SignupForm;
