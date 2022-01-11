import { createContext } from "react";
import { FormState } from "../types";

export const defaultState: FormState = {
  editItem: null,
  setEditItem: () => null,
};

const FormContext = createContext<FormState>(defaultState);

export default FormContext;
