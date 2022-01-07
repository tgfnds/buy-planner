import {useAuthContext} from "../context/AuthContextProvider";
import {Button, Stack, Typography} from "@mui/material";
import {MouseEvent} from "react";
import {routes} from "../routes";
import {useNavigate} from "react-router-dom";

const Header = () => {
    const {user, signOut} = useAuthContext();
    const navigate = useNavigate();

    async function onSignOut(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        await signOut();
        navigate(routes.signIn);
    }

    return <Stack width="100%" direction={["column", "row"]} justifyContent="space-between" mb={3}>
        <Typography alignSelf="center" variant="h3">BuyPlanner</Typography>
        <Stack mt={[2, 0]} direction={["row", "column"]} alignItems={["end"]} justifyContent={"space-between"}>
            <Typography mb={1}>
                Logged as {user?.displayName ?? user?.email}
            </Typography>
            <Button color="secondary" variant="outlined" size="small" onClick={onSignOut}>
                Sign Out
            </Button>
        </Stack>
    </Stack>
}

export default Header;