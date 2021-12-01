import { FC, useContext, useState } from "react";
import { BuyItem } from "../types";
import FormContext, { defaultState } from "./FormContext";

export const useFormContext = () => useContext(FormContext);

const FormContextProvider: FC = ({ children }) => {
  const [type, setType] = useState(defaultState.type);
  const [data, setData] = useState<BuyItem>(defaultState.data);

  return (
    <FormContext.Provider
      value={{
        type,
        data,
        setType,
        setData,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormContextProvider;
