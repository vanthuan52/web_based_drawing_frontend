import React from 'react';
import {createBrowserRouter} from 'react-router-dom';

import ProtectedRoute from '@/router/protectedRoute';

import {ROUTER_PATH} from '@/constant/common';

import AuthLayout from '@/layouts/authLayout/authLayout';
import MainLayout from '@/layouts/mainLayout';
import BoardLayout from '@/layouts/boardLayout/boardLayout';
import LoginPage from '@/pages/login/login';
import RegisterPage from '@/pages/register/register';
import HomePage from '@/pages/home/home';
import BoardPage from '@/pages/board/board';

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
        <RegisterPage />
      </AuthLayout>
    ),
  },
  {
    element: <BoardLayout />,
    children: [
      {
        path: ROUTER_PATH.board,
        element: <BoardPage />,
      },
    ],
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: ROUTER_PATH.home,
        element: (
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
