import React from "react";
import { createBrowserRouter } from "react-router-dom";

import ProtectedRoute from "~/components/shared/ProtectedRoute";

import { ROUTER_PATH } from "~/constant/common";

import AuthLayout from "~/layouts/AuthLayout/AuthLayout";
import MainLayout from "~/layouts/MainLayout";

import LoginPage from "~/pages/Login/Login";
import SignUpPage from "~/pages/Signup/Signup";
import DXFEditor from "~/components/viewer";

export const router = createBrowserRouter([
  {
    path: ROUTER_PATH.login,
    element: (
      <AuthLayout>
        <LoginPage />
      </AuthLayout>
    ),
  },
  {
    path: ROUTER_PATH.signup,
    element: (
      <AuthLayout>
        <SignUpPage />
      </AuthLayout>
    ),
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: ROUTER_PATH.home,
        element: (
          <ProtectedRoute>
            <DXFEditor />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
