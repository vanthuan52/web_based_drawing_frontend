import React, {useState} from 'react';
import {Canvas} from 'fabric';
import styles from './CanvasHistory.module.scss';

interface CanvasHistoryProps {
  canvas: Canvas | null;
}

const CanvasHistory = () => {
  return <div className={styles['canvas-history']}></div>;
};

export default CanvasHistory;
