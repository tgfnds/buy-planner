import {Outlet} from "react-router-dom";
import {Stack} from "@mui/material";
import PositionedSnackbarAlert from "../ui/PositionedSnackbarAlert";
import Header from "../Header";

const MainLayout = () => {
    return <Stack minHeight="100vh" alignItems="center" justifyContent="center">
        <Stack minHeight={["100vh", "auto"]} borderRadius={2} p={[2, 5]}>
            <Header/>
            <Outlet/>
            <PositionedSnackbarAlert origin={{horizontal: "center", vertical: "top"}} autoHideDuration={3000}/>
        </Stack>
    </Stack>
};

export default MainLayout;
