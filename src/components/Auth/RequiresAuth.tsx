import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContextProvider";
import { routes } from "../../routes";

const RequiresAuth = () => {
  const { user } = useAuthContext();
  const location = useLocation();

  if (!user) return <Navigate to={routes.signIn} state={{ from: location }} />;

  return <Outlet />;
};

export default RequiresAuth;
