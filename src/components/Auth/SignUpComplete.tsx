import {Button, Stack, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {routes} from "../../routes";

const SignUpComplete = () => {
    const navigate = useNavigate();

    return (
        <Stack gap={3} alignItems="center">
            <Typography fontSize={32}>Email verified!</Typography>
            <Button variant="outlined" color="primary" onClick={() => navigate(routes.home)}>Continue to website</Button>
        </Stack>
    );
};

export default SignUpComplete;