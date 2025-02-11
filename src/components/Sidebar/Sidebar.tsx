import React from 'react';
import styles from './Sidebar.module.scss';
import clsx from 'clsx';

const Sidebar = () => {
  return <aside className={clsx(styles['sidebar'])}>Sidebar</aside>;
};

export default Sidebar;
