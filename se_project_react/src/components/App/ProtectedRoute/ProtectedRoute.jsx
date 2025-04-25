import { Navigate, useLocation } from "react-router-dom";
import { useIsLoggedIn } from "../LoggedInWrapper/LoggedInWrapper";

const ProtectedRoute = ({ children, anonymous = false }) => {
  const { isLoggedIn } = useIsLoggedIn();
  const location = useLocation();
  const from = location.state?.from || "items";

  if (!isLoggedIn && !anonymous) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  if (isLoggedIn && anonymous) {
    return <Navigate to={from} />;
  }

  return children;
};

export default ProtectedRoute;
