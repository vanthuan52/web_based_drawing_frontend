import React, {useState} from 'react';
import clsx from 'clsx';
import styles from './board.module.scss';
import Navigation from '@/components/Navigation/Navigation';
import Sidebar from '@/components/Sidebar/Sidebar';
import CanvasBoard from '@/components/CanvasBoard/CanvasBoard';
import CanvasTools from '@/components/CanvasTools/CanvasTools';

const BoardPage = () => {
  return (
    <div className={styles['board']}>
      <CanvasBoard />
    </div>
  );
};

export default BoardPage;
