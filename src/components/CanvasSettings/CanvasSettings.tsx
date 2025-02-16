import React, {useState, useEffect} from 'react';
import {Canvas} from 'fabric';
import clsx from 'clsx';
import styles from './CanvasSettings.module.scss';
import Input from '../Common/Input/Input';

interface CanvasSettingsProps {
  canvas: Canvas | null;
  dimensions: {width: number; height: number};
}
const CanvasSettings = ({canvas, dimensions}: CanvasSettingsProps) => {
  const [canvasWidth, setCanvasWidth] = useState<number>(dimensions.width);
  const [canvasHeight, setCanvasHeight] = useState<number>(dimensions.height);

  useEffect(() => {
    if (canvas) {
      canvas.setWidth(canvasWidth);
      canvas.setHeight(canvasHeight);
      canvas.renderAll();
    }
  }, [canvasHeight, canvasWidth, canvas]);

  const handleWidthChange = (e: any) => {
    const value = e.target.value.replace(/,/g, '');
    const intValue = parseInt(value, 10);
    if (intValue >= 0) {
      setCanvasWidth(intValue);
    }
  };

  const handleHeightChange = (e: any) => {
    const value = e.target.value.replace(/,/g, '');
    const intValue = parseInt(value, 10);

    if (intValue >= 0) {
      setCanvasHeight(intValue);
    }
  };

  return (
    <div className={clsx(styles['canvas-settings'], styles['darkmode'])}>
      <label>Width</label>
      <Input value={canvasWidth} onChange={handleWidthChange} />

      <label>Height</label>
      <Input value={canvasHeight} onChange={handleHeightChange} />
    </div>
  );
};

export default CanvasSettings;
