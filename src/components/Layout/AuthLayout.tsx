import { Outlet } from "react-router-dom";
import { Box, Typography } from "@mui/material";

const AuthLayout = () => {
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
        <Typography variant="h2" fontSize={64} marginBottom={3}>
          BuyPlanner
        </Typography>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AuthLayout;
