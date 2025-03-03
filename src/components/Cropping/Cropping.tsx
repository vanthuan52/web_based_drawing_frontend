import React from 'react';
import {Canvas, Rect} from 'fabric';
import {CropIcon} from 'lucide-react';
import styles from './Cropping.module.scss';
import Button from '@/components/Common/Button';
import {CustomFabricObject} from '@/types/canvas';
interface CroppingProps {
  canvas: Canvas | null;
  onFramesUpdated: any;
}
const Cropping = ({canvas, onFramesUpdated}: CroppingProps) => {
  const addFrameToCanvas = () => {
    if (!canvas) return;
    const frameName = `Frame ${canvas.getObjects('rect').length + 1}`;

    const frame = new Rect({
      left: 100,
      top: 100,
      width: 200,
      height: 200,
      fill: 'transparent',
      stroke: '#07FE3D',
      strokeWidth: 1,
      selectable: true,
      evented: true,
      name: frameName,
    });

    canvas.add(frame);
    canvas.renderAll();

    frame.on('scaling', () => {
      maintainStrokeWidth(frame);
      canvas.renderAll();
    });

    frame.on('modified', () => {
      maintainStrokeWidth(frame);
      canvas.renderAll();
    });

    onFramesUpdated();
  };

  const maintainStrokeWidth = (object: CustomFabricObject) => {
    const scaleX = object.scaleX || 1;
    const scaleY = object.scaleY || 1;

    object.set({
      width: object.width * scaleX,
      height: object.height * scaleY,
      scaleX: 1,
      scaleY: 1,
      strokeWidth: 1,
    });

    object.setCoords();
  };

  return (
    <div className={styles['cropping']}>
      <div
        className={styles['cropping-item__button']}
        onClick={addFrameToCanvas}>
        <CropIcon />
      </div>
    </div>
  );
};

export default Cropping;
