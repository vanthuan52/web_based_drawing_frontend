import React, {useEffect} from 'react';
import {Outlet, useLocation} from 'react-router-dom';
import styles from './boardLayout.module.scss';
import clsx from 'clsx';
import Navigation from '@/components/Navigation/Navigation';

const BoardLayout = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <React.Fragment>
      <div className={clsx(styles['board-layout'])}>
        <Outlet />
      </div>
    </React.Fragment>
  );
};

export default BoardLayout;
