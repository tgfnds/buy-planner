import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "../../theme";
import { Routes, Route } from "react-router-dom";
import Home from "../../pages/Home";
import AuthLayout from "../Layout/AuthLayout";
import RequiresAuth from "../Auth/RequiresAuth";
import SignupForm from "../Auth/SignupForm";
import SigninForm from "../Auth/SigninForm";
import MainLayout from "../Layout/MainLayout";
import NoMatch from "../NoMatch/NoMatch";
import { routes } from "../../routes";

function App() {
  console.log("testing git");
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path={routes.home} element={<RequiresAuth />}>
          <Route element={<MainLayout />}>
            <Route index element={<Home />} />
          </Route>
        </Route>
        <Route element={<AuthLayout />}>
          <Route path={routes.signIn} element={<SigninForm />} />
          <Route path={routes.signUp} element={<SignupForm />} />
        </Route>
        <Route path={routes.nonExisting} element={<NoMatch />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
