import {CircularProgress} from "@mui/material";
import {Box} from "@mui/system";
import {Outlet, Navigate, useLocation} from "react-router-dom";
import {useAuthContext} from "../../context/AuthContextProvider";
import {routes} from "../../routes";

const RequiresAuth = () => {
    const {user, loading} = useAuthContext();
    const location = useLocation();

    if (loading)
        return (
            <Box
                display="flex"
                minHeight="100vh"
                minWidth="100vw"
                alignItems="center"
                justifyContent="center"
                bgcolor="background"
            >
                <CircularProgress/>
            </Box>
        );

    if (!user || !user.emailVerified) return <Navigate to={routes.signIn} state={{from: location}}/>;

    return <Outlet/>;
};

export default RequiresAuth;
