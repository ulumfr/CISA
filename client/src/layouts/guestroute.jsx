import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const GuestRoute = () => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Outlet />;
};

export default GuestRoute;
