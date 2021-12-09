import * as Yup from "yup";

export const SigninSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email must be in the correct format!")
    .required("Email is required!"),
  password: Yup.string()
    .min(6, "Password must have at least 6 characters!")
    .max(30, "Password cannot contain more than 30 characters!")
    .required("Password is required!"),
});
