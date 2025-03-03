import React, {useEffect, useState} from 'react';
import {ChevronDown} from 'lucide-react';
import {Canvas, Point} from 'fabric';
import {Tooltip} from 'react-tooltip';
import Input from '@/components/Common/Input';
import styles from './CanvasZooming.module.scss';
import useCanvasZooming from '@/hooks/useCanvasZooming';
import {TOOLTIP_CONTENT} from '@/constant/common';

interface CanvasZoomingProps {
  canvas: Canvas | null;
}

const CanvasZooming = ({canvas}: CanvasZoomingProps) => {
  const [zoomingRatio, setZoomingRatio] = useState<string>('100');
  useCanvasZooming({canvas, setZoomingRatio});

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

      zoomValue = Math.max(1, Math.min(zoomValue, 2000));
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
        <div
          className={styles['zooming-box']}
          data-tooltip-id={TOOLTIP_CONTENT.zooming_ratio.id}>
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
        <Tooltip
          id={TOOLTIP_CONTENT.zooming_ratio.id}
          place="top"
          content={TOOLTIP_CONTENT.zooming_ratio.content}
        />
      </div>
    </div>
  );
};

export default CanvasZooming;
