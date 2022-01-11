import {CircularProgress} from "@mui/material";
import {Box} from "@mui/system";
import {Outlet, useLocation, Navigate} from "react-router-dom";
import {useAuthContext} from "../../context/AuthContextProvider";
import {routes} from "../../routes";
import {useMemo} from "react";

const RequiresAuth = () => {
    const {user, loading} = useAuthContext();
    const location = useLocation();

    console.log("Rendering RequiresAuth")
    const isVerified = useMemo(() => user?.emailVerified ?? false, [user]);

    if (!user) {
        return <Navigate to={routes.signIn} state={{from: location}}/>
    }

    if (!isVerified) {
        return <Navigate to={routes.verifyEmail} state={{from: location}}/>
    }

    if (loading) {
        return (
            <Box display="flex" minHeight="100vh" minWidth="100vw" alignItems="center"
                 justifyContent="center" bgcolor="background">
                <CircularProgress/>
            </Box>
        );
    }

    return <Outlet/>;
};

export default RequiresAuth;
