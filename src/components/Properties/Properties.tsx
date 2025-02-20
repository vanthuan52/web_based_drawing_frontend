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
      <div className={styles['property']}>
        <div className={styles['property-header']}>
          <span className={styles['property-header__label']}>Settings</span>
        </div>

        <div className={styles['property-body']}>
          <ElementProperty canvas={canvas} />
        </div>
      </div>
    </div>
  );
};

export default Properties;
