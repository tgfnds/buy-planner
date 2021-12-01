import { FC, useContext, useState } from "react";
import { BuyItem } from "../types";
import FormContext, { defaultState } from "./FormContext";

export const useFormContext = () => useContext(FormContext);

const FormContextProvider: FC = ({ children }) => {
  const [type, setType] = useState(defaultState.type);
  const [item, setItem] = useState<BuyItem>(defaultState.item);

  return (
    <FormContext.Provider
      value={{
        type,
        item,
        setType,
        setItem,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormContextProvider;
