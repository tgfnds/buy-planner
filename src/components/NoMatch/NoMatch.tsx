import { Navigate } from "react-router-dom";
import { routes } from "../../routes";

const NoMatch = () => {
  return <Navigate to={routes.home} />;
};

export default NoMatch;
