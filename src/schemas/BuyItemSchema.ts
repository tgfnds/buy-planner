import * as Yup from "yup";

export const BuyItemSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name is too short!")
    .max(100, "Name is too long!")
    .required("Name is required!"),
  value: Yup.number()
    .min(0, "Value is too low!")
    .max(999999999, "Value is too high!")
    .required("Value is required!"),
});
