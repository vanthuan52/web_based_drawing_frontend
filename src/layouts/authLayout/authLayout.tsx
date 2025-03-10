import React from 'react';
import {Navigate} from 'react-router-dom';
import {useAppSelector} from '@/redux/store';
import style from './authLayout.module.scss';

const AuthLayout: React.FC<{children: React.ReactNode}> = ({children}) => {
  const {isAuthenticated} = useAppSelector((state) => state.auth);

  return isAuthenticated ? (
    <Navigate to="/" />
  ) : (
    <div className={style['auth-layout']}>{children}</div>
  );
};

export default AuthLayout;
