import * as Yup from "yup";

export const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email must be in the correct format!")
    .required("Email is required!"),
  password: Yup.string()
    .min(6, "Password must have at least 6 characters!")
    .max(30, "Password cannot contain more than 30 characters!")
    .required("Password is required!"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match!")
    .required("Passwords must match!"),
  username: Yup.string()
    .min(3, "Name must have at least 3 characters!")
    .max(20, "Name cannot have more than 20 characters!")
    .required("Name is required."),
});
