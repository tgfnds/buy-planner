import { createContext } from "react";
import { IFormState } from "../types";

export const defaultState: IFormState = {
  type: "ADD",
  data: {
    name: "",
    value: "",
  },
  setType: () => null,
  setData: () => null,
};

const FormContext = createContext<IFormState>(defaultState);

export default FormContext;
