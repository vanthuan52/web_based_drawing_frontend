import React, {useState, useEffect} from 'react';
import {Canvas} from 'fabric';
import styles from './CroppingSetting.module.scss';
import {Button, MenuItem, Select} from '@mui/material';
import {CustomFabricObject} from '@/types/canvas';

interface CroppingSettingProps {
  canvas: Canvas | null;
  refreshKey: any;
}

const CroppingSetting = ({canvas, refreshKey}: CroppingSettingProps) => {
  const [frames, setFrames] = useState<CustomFabricObject[]>([]);
  const [selectedFrame, setSelectedFrame] = useState<CustomFabricObject | null>(
    null
  );

  const updateFrames = () => {
    if (!canvas) return;
    const framesFromCanvas = canvas
      .getObjects('rect')
      .filter((obj: CustomFabricObject) => {
        return obj.get('name') && obj.get('name').startsWith('Frame');
      });

    setFrames(framesFromCanvas);
    if (framesFromCanvas.length > 0) {
      setSelectedFrame(framesFromCanvas[0]);
    }
  };

  useEffect(() => {
    updateFrames();
  }, [canvas, refreshKey]);

  const handleFrameSelect = (value: string) => {
    if (!canvas) return;
    const selected = frames.find(
      (frame: CustomFabricObject) => frame.get('name') === value
    );
    if (!selected) return;
    setSelectedFrame(selected);
    canvas.setActiveObject(selected);
    canvas.renderAll();
  };

  const exportFrameAsPng = () => {
    if (!canvas || !selectedFrame) return;

    frames.forEach((frame: CustomFabricObject) => {
      frame.set('visible', false);
    });

    selectedFrame.set({
      strokeWidth: 0,
      visible: true,
    });

    const dataURL = canvas.toDataURL({
      left: selectedFrame.left,
      top: selectedFrame.top,
      width: selectedFrame.width * selectedFrame.scaleX,
      height: selectedFrame.height * selectedFrame.scaleY,
      format: 'png',
      multiplier: 1,
    });

    selectedFrame.set({
      strokeWidth: 1,
    });

    frames.forEach((frame: CustomFabricObject) => {
      frame.set('visible', true);
    });

    canvas.renderAll();

    const link = document.createElement('a');
    link.href = dataURL;
    link.download = `${selectedFrame.get('name')}.png`;
    link.click();
  };

  return (
    <div className={styles['cropping']}>
      {frames.length > 0 && (
        <>
          <Select label="Frames">
            {frames.map((frame, index) => (
              <MenuItem key={index} value={frame?.get('name')}>
                {frame?.get('name')}
              </MenuItem>
            ))}
          </Select>
          <Button onClick={exportFrameAsPng}>Export as PNG</Button>
        </>
      )}
    </div>
  );
};

export default CroppingSetting;
