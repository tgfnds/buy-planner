import {Outlet, useLocation} from "react-router-dom";
import {Stack, Step, StepLabel, Stepper} from "@mui/material";
import {routes} from "../../routes";

const steps = [
    "Account Information",
    "Email Verification",
    "Complete"
]

const getStep = (pathname: string) => {
    switch (pathname) {
        case routes.signUp:
            return 0;
        case routes.verifyEmail:
            return 1;
        case routes.signUpComplete:
            return 2;
        default:
            console.log("Stepper -> Invalid location path.")
    }
}

const SignUpContainer = () => {
    const location = useLocation();

    return (
        <Stack p={1} gap={10}>
            <Stepper alternativeLabel activeStep={getStep(location.pathname)}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <Outlet/>
        </Stack>
    );
};

export default SignUpContainer;