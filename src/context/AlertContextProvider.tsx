import { AlertColor } from "@mui/material";
import { FC, useContext, useState } from "react";
import AlertContext, { defaultState } from "./AlertContext";

export const useAlertContext = () => useContext(AlertContext);

const AlertContextProvider: FC = ({ children }) => {
  const [message, setMessage] = useState(defaultState.message);
  const [severity, setSeverity] = useState(defaultState.severity);
  const [open, setOpen] = useState(defaultState.open);

  function show(message: string, severity: AlertColor) {
    if (!message) return;

    setMessage(message);
    setSeverity(severity);
    setOpen(true);
  }

  function close() {
    setOpen(false);
  }

  return (
    <AlertContext.Provider
      value={{
        message,
        open,
        severity,
        show,
        close,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContextProvider;
