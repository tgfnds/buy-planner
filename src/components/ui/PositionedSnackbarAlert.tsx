import { Alert, Snackbar, SnackbarOrigin } from "@mui/material";
import { useAlertContext } from "../../context/AlertContextProvider";

interface PositionedSnackbarProps {
  origin: SnackbarOrigin;
  autoHideDuration: number;
}

const PositionedSnackbarAlert = ({
  origin,
  autoHideDuration,
}: PositionedSnackbarProps) => {
  const { message, severity, open, close } = useAlertContext();

  return (
    <Snackbar
      anchorOrigin={origin}
      autoHideDuration={autoHideDuration}
      open={open}
      onClose={close}
    >
      <Alert severity={severity}>{message}</Alert>
    </Snackbar>
  );
};

export default PositionedSnackbarAlert;
