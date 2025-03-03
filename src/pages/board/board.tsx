import React, {useState} from 'react';
import clsx from 'clsx';
import styles from './board.module.scss';
import Navigation from '@/components/Navigation/Navigation';
import FabricBoard from '@/components/FabricBoard/FabricBoard';

const BoardPage = () => {
  return (
    <div className={styles['board']}>
      <FabricBoard />
    </div>
  );
};

export default BoardPage;
