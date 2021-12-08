import { FC, useContext, useState } from "react";
import FormContext, { defaultState } from "./FormContext";

export const useFormContext = () => useContext(FormContext);

const FormContextProvider: FC = ({ children }) => {
  const [editItem, setEditItem] = useState(defaultState.editItem);

  return (
    <FormContext.Provider
      value={{
        editItem,
        setEditItem,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormContextProvider;
