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
}

const CanvasTools = ({canvas}: CanvasToolsProps) => {
  const {addLine, addRectangle, addCircle, addPolygon, addText} = useCanvas({
    canvas,
  });

  const [refreshKey, setRefreshKey] = useState(0);

  const handleAddLine = () => {
    addLine(canvas);
  };

  const handleAddRectangle = () => {
    addRectangle(canvas);
  };

  const handleAddCircle = () => {
    addCircle(canvas);
  };

  const handleAddPolygon = () => {
    addPolygon(canvas);
  };

  const handleAddText = () => {
    addText(canvas);
  };

  const handleFramesUpdated = () => {
    setRefreshKey((prevKey) => prevKey + 1);
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
          <div className={styles['tools-items__item']}>
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
