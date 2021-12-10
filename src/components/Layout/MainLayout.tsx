import { useNavigate, Outlet } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { useAuthContext } from "../../context/AuthContextProvider";
import { MouseEvent } from "react";
import { routes } from "../../routes";
import PositionedSnackbarAlert from "../ui/PositionedSnackbarAlert";

const MainLayout = () => {
  const { signOut, user } = useAuthContext();
  const navigate = useNavigate();

  async function onSignout(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    await signOut();
    navigate(routes.signIn);
  }

  return (
    <Box
      display="flex"
      minHeight="100vh"
      minWidth="100vw"
      alignItems="center"
      justifyContent="center"
      bgcolor="background"
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="600px"
        p={5}
        borderRadius={2}
        bgcolor="background.paper"
      >
        <Box
          width="100%"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={3}
        >
          <Typography variant="h3">BuyPlanner</Typography>
          <Box display="flex" flexDirection="column" alignItems="end">
            <Typography mb={1}>
              Logged as {user?.displayName ?? user?.email}
            </Typography>
            <Button
              color="secondary"
              variant="outlined"
              size="small"
              onClick={onSignout}
            >
              Sign Out
            </Button>
          </Box>
        </Box>
        <Outlet />
        <PositionedSnackbarAlert
          origin={{
            horizontal: "center",
            vertical: "top",
          }}
          autoHideDuration={3000}
        />
      </Box>
    </Box>
  );
};

export default MainLayout;
