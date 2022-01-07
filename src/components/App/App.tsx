import {CssBaseline, ThemeProvider} from "@mui/material";
import {theme} from "../../theme";
import {Routes, Route} from "react-router-dom";
import Home from "../../pages/Home";
import Verify from "../../pages/Verify";
import AuthLayout from "../Layout/AuthLayout";
import RequiresAuth from "../Auth/RequiresAuth";
import SignUpForm from "../Auth/SignUpForm";
import SignInForm from "../Auth/SignInForm";
import MainLayout from "../Layout/MainLayout";
import NoMatch from "../NoMatch/NoMatch";
import {routes} from "../../routes";
import AlertContextProvider from "../../context/AlertContextProvider";
import SignUpContainer from "../Auth/SignUpContainer";
import VerifyEmail from "../Auth/VerifyEmail";
import SignUpComplete from "../Auth/SignUpComplete";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <AlertContextProvider>
                <CssBaseline/>
                <Routes>
                    <Route path={routes.home} element={<RequiresAuth/>}>
                        <Route element={<MainLayout/>}>
                            <Route index element={<Home/>}/>
                        </Route>
                    </Route>
                    <Route element={<AuthLayout/>}>
                        <Route element={<SignUpContainer/>}>
                            <Route path={routes.signUp} element={<SignUpForm/>}/>
                            <Route path={routes.verifyEmail} element={<VerifyEmail/>}/>
                            <Route path={routes.signUpComplete} element={<SignUpComplete/>}/>
                        </Route>
                        <Route path={routes.signIn} element={<SignInForm/>}/>
                        <Route path={"/verify/__/auth/action"} element={<Verify/>}/>
                    </Route>
                    <Route path={routes.nonExisting} element={<NoMatch/>}/>
                </Routes>
            </AlertContextProvider>
        </ThemeProvider>
    );
}

export default App;
