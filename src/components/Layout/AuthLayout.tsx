import {Outlet} from "react-router-dom";
import {Stack, Typography} from "@mui/material";

const AuthLayout = () => {
    return (
        <Stack minHeight="100vh" alignItems="center" justifyContent="center">
            <Stack alignItems="center" minWidth="100%">
                <Typography variant="h2" fontSize={64} marginBottom={3}>
                    BuyPlanner
                </Typography>
                <Outlet/>
            </Stack>
        </Stack>
    );
};

export default AuthLayout;
