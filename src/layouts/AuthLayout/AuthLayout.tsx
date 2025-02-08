import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "~/redux/store";
import AuthLayoutStyle from "./AuthLayout.module.scss";

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return isAuthenticated ? (
    <Navigate to="/" />
  ) : (
    <div className={AuthLayoutStyle["authLayout"]}>{children}</div>
  );
};

export default AuthLayout;
