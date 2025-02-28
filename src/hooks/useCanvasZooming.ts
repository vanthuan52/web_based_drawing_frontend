import {useEffect} from 'react';
import {Canvas, Point} from 'fabric';

interface UseCanvasZoomingProps {
  canvas: Canvas | null;
  setZoomingRatio: (scale: string) => void;
}

const useCanvasZooming = ({canvas, setZoomingRatio}: UseCanvasZoomingProps) => {
  useEffect(() => {
    if (!canvas) return;

    const handleMouseWheel = (e: any) => {
      const event = e.e as WheelEvent;

      if (!event.ctrlKey) return;

      const zoom = canvas.getZoom();
      const delta = event.deltaY > 0 ? -0.05 : 0.05;
      const newZoom = Math.min(Math.max(zoom + delta, 0.01), 20);

      // point to the pointer wheng zooming
      const pointer = canvas.getPointer(event);
      canvas.zoomToPoint(new Point(pointer.x, pointer.y), newZoom);

      const scaleRatio = Math.round(newZoom * 100);
      setZoomingRatio(`${scaleRatio}`);

      event.preventDefault();
      event.stopPropagation();
    };

    canvas.on('mouse:wheel', handleMouseWheel);

    return () => {
      canvas.off('mouse:wheel', handleMouseWheel);
    };
  }, [canvas]);
};

export default useCanvasZooming;
