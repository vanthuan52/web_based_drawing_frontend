import React from 'react';
import {Navigate} from 'react-router-dom';
import {useAppSelector} from '@/redux/store';
import style from './AuthLayout.module.scss';

const AuthLayout: React.FC<{children: React.ReactNode}> = ({children}) => {
  const {isAuthenticated} = useAppSelector((state) => state.auth);

  return isAuthenticated ? (
    <Navigate to="/" />
  ) : (
    <div className={style['authLayout']}>{children}</div>
  );
};

export default AuthLayout;
