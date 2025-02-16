import React from 'react';
import clsx from 'clsx';
import {Canvas} from 'fabric';
import {
  Circle,
  Hand,
  Hexagon,
  Minus,
  Navigation,
  Square,
  Type,
} from 'lucide-react';
import styles from './CanvasProperty.module.scss';
import ElementProperty from '../ElementProperty/ElementProperty';

interface CanvasPropertyProps {
  canvas: Canvas | null;
}

const CanvasProperty = ({canvas}: CanvasPropertyProps) => {
  return (
    <div className={styles['canvas-property']}>
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

export default CanvasProperty;
