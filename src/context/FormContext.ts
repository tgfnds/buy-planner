import { createContext } from "react";
import { IFormState } from "../types";

export const defaultState: IFormState = {
  type: "ADD",
  item: {
    name: "",
    value: "",
  },
  setType: () => null,
  setItem: () => null,
};

const FormContext = createContext<IFormState>(defaultState);

export default FormContext;
