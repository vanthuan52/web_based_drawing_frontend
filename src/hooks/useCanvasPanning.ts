import {useEffect} from 'react';
import {Canvas, Point} from 'fabric';

interface UseCanvasPanningProps {
  canvas: Canvas | null;
  isPanning: boolean;
}

const useCanvasPanning = ({canvas, isPanning}: UseCanvasPanningProps) => {
  useEffect(() => {
    if (!canvas || !isPanning) return;

    let isPanningLocal = false;
    let lastPosX: number | null = null;
    let lastPosY: number | null = null;

    const handleMouseDown = (e: any) => {
      const event = e.e as MouseEvent;
      if (event.button === 0 && !event.altKey) {
        isPanningLocal = true;
        lastPosX = event.clientX;
        lastPosY = event.clientY;
        canvas.setCursor('grab');
        canvas.selection = false;
      }
    };

    const handleMouseMove = (e: any) => {
      const event = e.e as MouseEvent;
      if (isPanningLocal && lastPosX !== null && lastPosY !== null) {
        const deltaX = event.clientX - lastPosX;
        const deltaY = event.clientY - lastPosY;
        canvas.relativePan(new Point(deltaX, deltaY));
        lastPosX = event.clientX;
        lastPosY = event.clientY;
      }
    };

    const handleMouseUp = () => {
      isPanningLocal = false;
      lastPosX = null;
      lastPosY = null;
      canvas.setCursor('default');
      canvas.selection = true;
    };

    const handleMouseWheel = (e: any) => {
      const event = e.e as WheelEvent;
      const zoom = canvas.getZoom();
      const delta = event.deltaY > 0 ? -0.1 : 0.1;
      const newZoom = Math.min(Math.max(zoom + delta, 0.5), 5);
      const pointer = canvas.getPointer(event);
      canvas.zoomToPoint(pointer, newZoom);
      canvas.setZoom(newZoom);
      event.preventDefault();
      event.stopPropagation();
    };

    canvas.on('mouse:down', handleMouseDown);
    canvas.on('mouse:move', handleMouseMove);
    canvas.on('mouse:up', handleMouseUp);
    canvas.on('mouse:wheel', handleMouseWheel);

    return () => {
      canvas.off('mouse:down', handleMouseDown);
      canvas.off('mouse:move', handleMouseMove);
      canvas.off('mouse:up', handleMouseUp);
      canvas.off('mouse:wheel', handleMouseWheel);
    };
  }, [canvas, isPanning]);
};

export default useCanvasPanning;
