import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, anonymous = false, isLoggedIn }) => {
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
