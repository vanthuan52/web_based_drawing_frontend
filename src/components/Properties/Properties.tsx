import React from 'react';
import clsx from 'clsx';
import {Canvas} from 'fabric';
import styles from './Properties.module.scss';
import ElementProperty from '../ElementProperty/ElementProperty';

interface CanvasPropertyProps {
  canvas: Canvas | null;
}

const Properties = ({canvas}: CanvasPropertyProps) => {
  return (
    <div className={styles['properties']}>
      <div className={styles['properties-header']}>
        <span className={styles['properties-header__label']}>Settings</span>
      </div>

      <div className={styles['properties-body']}>
        <ElementProperty canvas={canvas} />
      </div>
    </div>
  );
};

export default Properties;
