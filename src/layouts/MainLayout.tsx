import React, {useEffect} from 'react';
import {Outlet, useLocation} from 'react-router-dom';
import styles from './mainLayout.module.scss';
import clsx from 'clsx';

const MainLayout = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <React.Fragment>
      <div
        className={clsx(styles['main-layout'])}
        style={{overflowX: 'hidden', overflowY: 'hidden'}}>
        <Outlet />
      </div>
    </React.Fragment>
  );
};

export default MainLayout;
