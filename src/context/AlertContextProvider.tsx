import {AlertColor} from "@mui/material";
import {FC, useCallback, useContext, useState} from "react";
import AlertContext, {defaultState} from "./AlertContext";

export const useAlertContext = () => useContext(AlertContext);

const AlertContextProvider: FC = ({children}) => {
    const [message, setMessage] = useState(defaultState.message);
    const [severity, setSeverity] = useState(defaultState.severity);
    const [open, setOpen] = useState(defaultState.open);

    const show = useCallback((message: string, severity: AlertColor) => {
        if (!message) return;

        setMessage(message);
        setSeverity(severity);
        setOpen(true);
    }, []);

    const close = useCallback(() => {
        setOpen(false);
    }, []);

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
