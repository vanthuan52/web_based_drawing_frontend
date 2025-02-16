import React, {useEffect} from 'react';
import clsx from 'clsx';
import {Canvas} from 'fabric';
import styles from './Sidebar.module.scss';
import CanvasLayer from '../CanvasLayer/CanvasLayer';
import CanvasManager from '../CanvasManager/CanvasManager';

interface SidebarProps {
  canvas: Canvas | null;
}

const Sidebar = ({canvas}: SidebarProps) => {
  return (
    <aside className={clsx(styles['sidebar'])}>
      <div className={styles['sidebar-header']}>
        <span className={styles['sidebar-header__label']}>Sidebar</span>
      </div>
      <div className={styles['sidebar-body']}>
        <CanvasLayer canvas={canvas} />
        <CanvasManager />
      </div>
    </aside>
  );
};

export default Sidebar;
