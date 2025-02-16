import React, {useEffect} from 'react';
import clsx from 'clsx';
import {
  Circle,
  LineChartIcon,
  Pen,
  RectangleHorizontal,
  Trash,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import {Canvas} from 'fabric';
import {useDispatch} from 'react-redux';
import styles from './CanvasLayer.module.scss';
import {canvasActions} from '@/redux/slice/canvasSlice';
import {useAppSelector} from '@/redux/store';
import LayerList from './LayerList';

interface CanvasLayerProps {
  canvas: Canvas | null;
}

const CanvasLayer = ({canvas}: CanvasLayerProps) => {
  return (
    <div className={clsx(styles['canvas-layers'])}>
      <div className={styles['layers']}>
        <div className={styles['layers-header']}>
          <span className={styles['layers-title']}>Layers</span>
        </div>
        <div className={styles['layers-body']}>
          <LayerList canvas={canvas} />
        </div>
      </div>
    </div>
  );
};

export default CanvasLayer;
