import { createContext } from "react";
import { IFormState } from "../types";

export const defaultState: IFormState = {
  editItem: null,
  setEditItem: () => null,
};

const FormContext = createContext<IFormState>(defaultState);

export default FormContext;
