import React, {useState} from 'react';
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
import styles from './CanvasTools.module.scss';
import useCanvas from '@/hooks/useCanvas';
import Cropping from '../Cropping/Cropping';

interface CanvasToolsProps {
  canvas: Canvas | null;
  isPanning: boolean;
  onSetIsPanning: (value: boolean) => void;
}

const CanvasTools = ({canvas, isPanning, onSetIsPanning}: CanvasToolsProps) => {
  const {addLine, addRectangle, addCircle, addPolygon, addText} = useCanvas({
    canvas,
  });

  const [refreshKey, setRefreshKey] = useState(0);

  const handleAddLine = () => {
    addLine();
  };

  const handleAddRectangle = () => {
    addRectangle();
  };

  const handleAddCircle = () => {
    addCircle();
  };

  const handleAddPolygon = () => {
    addPolygon();
  };

  const handleAddText = () => {
    addText();
  };

  const handleFramesUpdated = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  const handleSetIsPanning = () => {
    onSetIsPanning(!isPanning);
  };

  return (
    <div className={styles['canvas-tools']}>
      <div className={styles['tools']}>
        <div className={styles['tools-items']}>
          <div className={styles['tools-items__item']}>
            <Navigation />
          </div>
          <div className={styles['tools-items__item']} onClick={handleAddLine}>
            <Minus />
          </div>
          <div
            className={styles['tools-items__item']}
            onClick={handleAddRectangle}>
            <Square />
          </div>
          <div
            className={styles['tools-items__item']}
            onClick={handleAddCircle}>
            <Circle />
          </div>
          <div
            className={styles['tools-items__item']}
            onClick={handleAddPolygon}>
            <Hexagon />
          </div>
          <div className={styles['tools-items__item']} onClick={handleAddText}>
            <Type />
          </div>
          <div
            className={clsx(styles['tools-items__item'], {
              [styles['active']]: isPanning,
            })}
            onClick={handleSetIsPanning}>
            <Hand />
          </div>
          <div className={styles['tools-items__item']}>
            <Cropping canvas={canvas} onFramesUpdated={handleFramesUpdated} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CanvasTools;
