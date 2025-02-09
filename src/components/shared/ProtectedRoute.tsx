import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "~/redux/store";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return isAuthenticated ? <>{children}</> : <Navigate to="/log-in" />;
};

export default ProtectedRoute;
