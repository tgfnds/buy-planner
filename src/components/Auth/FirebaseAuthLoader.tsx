import {CircularProgress} from "@mui/material";
import {Box} from "@mui/system";
import {Outlet} from "react-router-dom";
import {useAuthContext} from "../../context/AuthContextProvider";

const FirebaseAuthLoader = () => {
    const {loading} = useAuthContext();

    console.log("Rendering FirebaseAuthLoader")

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

export default FirebaseAuthLoader;
