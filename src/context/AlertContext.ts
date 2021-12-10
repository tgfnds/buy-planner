import { AlertColor } from "@mui/material";
import { createContext } from "react";

export interface AlertState {
  open: boolean;
  message: string | null;
  severity: AlertColor;
  show: (message: string, severity: AlertColor) => void;
  close: () => void;
}

export const defaultState: AlertState = {
  open: false,
  message: null,
  severity: "info",
  show: () => null,
  close: () => null,
};

const AlertContext = createContext(defaultState);

export default AlertContext;
