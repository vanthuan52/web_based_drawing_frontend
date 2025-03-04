import React, {useEffect} from 'react';
import {Outlet, useLocation} from 'react-router-dom';
import clsx from 'clsx';
import styles from './mainLayout.module.scss';
import CatLoader from '@/components/LoadingOverlay/CatLoader';

const MainLayout = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <React.Fragment>
      <CatLoader />
      <div
        className={clsx(styles['main-layout'])}
        style={{overflowX: 'hidden', overflowY: 'hidden'}}>
        <Outlet />
      </div>
    </React.Fragment>
  );
};

export default MainLayout;
