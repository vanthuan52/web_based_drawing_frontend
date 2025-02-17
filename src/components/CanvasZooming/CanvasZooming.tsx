import React, {useEffect, useState} from 'react';
import {ChevronDown} from 'lucide-react';
import {Canvas, Point} from 'fabric';
import Input from '../Common/Input/Input';
import styles from './CanvasZooming.module.scss';
import useCanvasZooming from '@/hooks/useCanvasZooming';

interface CanvasZoomingProps {
  canvas: Canvas | null;
}

const CanvasZooming = ({canvas}: CanvasZoomingProps) => {
  const [zoomingRatio, setZoomingRatio] = useState<string>('100');
  const [isZooming, setIsZooming] = useState<boolean>(true);
  useCanvasZooming({canvas, isZooming, setZoomingRatio});

  useEffect(() => {
    if (!canvas) return;
    setZoomingRatio(`${Math.round(canvas.getZoom() * 100)}`);
  }, [canvas]);

  const handleZoomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setZoomingRatio(e.target.value);
  };

  const handleZoomSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && canvas) {
      let zoomValue = parseInt(zoomingRatio, 10);
      if (isNaN(zoomValue)) return;

      // limit zoom from 5% to 500%
      zoomValue = Math.max(5, Math.min(zoomValue, 500));
      setZoomingRatio(`${zoomValue}`);

      const center = canvas.getCenter();
      const centerPoint = new Point(center.left, center.top);

      canvas.zoomToPoint(centerPoint, zoomValue / 100);
      canvas.renderAll();
    }
  };

  return (
    <div className={styles['canvas-zooming']}>
      <div className={styles['zooming']}>
        <div className={styles['zooming-box']}>
          <span className="zooming-ratio">%</span>
          <Input
            className={styles['zooming-input']}
            noBorder
            noPadding
            value={zoomingRatio}
            onChange={handleZoomChange}
            onKeyDown={handleZoomSubmit}
          />

          <ChevronDown className={styles['zooming-dropdown']} size={12} />
        </div>
      </div>
    </div>
  );
};

export default CanvasZooming;
