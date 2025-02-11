import React from 'react';
import clsx from 'clsx';
import styles from './board.module.scss';
import Navigation from '@/components/Navigation/Navigation';
import Sidebar from '@/components/Sidebar/Sidebar';
import Board from '@/components/Board/Board';

const BoardPage = () => {
  return (
    <div className={clsx(styles['board'])}>
      <Navigation />
      <div className={clsx(styles['board__content'])}>
        <Sidebar />
        <Board />
      </div>
    </div>
  );
};

export default BoardPage;
