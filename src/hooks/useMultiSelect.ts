import {useEffect} from 'react';
import {Canvas, Rect, ActiveSelection} from 'fabric';

/**
 * @param canvas - Fabric canvas instance.
 * @param drawingMode - Current drawing mode.
 */
const useMultiSelect = (canvas: Canvas | null, drawingMode: string) => {
  useEffect(() => {
    if (!canvas) return;
    let selectionRect: Rect | null = null;
    let origin: {x: number; y: number} | null = null;

    const handleMouseDownMultiSelect = (e: any) => {
      if (!(e.e as MouseEvent).altKey || drawingMode !== 'none') return;
      const pointer = canvas.getPointer(e.e);
      origin = {x: pointer.x, y: pointer.y};
      selectionRect = new Rect({
        left: origin.x,
        top: origin.y,
        width: 0,
        height: 0,
        fill: 'rgba(0, 0, 255, 0.3)',
        selectable: false,
        evented: false,
      });
      canvas.add(selectionRect);
    };

    const handleMouseMoveMultiSelect = (e: any) => {
      if (!selectionRect || !origin) return;
      const pointer = canvas.getPointer(e.e);
      const rectLeft = Math.min(origin.x, pointer.x);
      const rectTop = Math.min(origin.y, pointer.y);
      const rectWidth = Math.abs(pointer.x - origin.x);
      const rectHeight = Math.abs(pointer.y - origin.y);
      selectionRect.set({
        left: rectLeft,
        top: rectTop,
        width: rectWidth,
        height: rectHeight,
      });
      canvas.renderAll();
    };

    const handleMouseUpMultiSelect = (_e: any) => {
      if (!selectionRect || !origin) return;
      const rect = selectionRect.getBoundingRect();
      const selectedObjects = canvas.getObjects().filter((obj) => {
        if (obj === selectionRect) return false;
        const objRect = obj.getBoundingRect();
        return !(
          rect.left > objRect.left + objRect.width ||
          rect.left + rect.width < objRect.left ||
          rect.top > objRect.top + objRect.height ||
          rect.top + rect.height < objRect.top
        );
      });
      if (selectedObjects.length > 0) {
        const activeSelection = new ActiveSelection(selectedObjects, {
          canvas,
        });
        canvas.setActiveObject(activeSelection);
        activeSelection.setCoords();
      }
      canvas.remove(selectionRect);
      selectionRect = null;
      origin = null;
      canvas.renderAll();
    };

    canvas.on('mouse:down', handleMouseDownMultiSelect);
    canvas.on('mouse:move', handleMouseMoveMultiSelect);
    canvas.on('mouse:up', handleMouseUpMultiSelect);

    return () => {
      canvas.off('mouse:down', handleMouseDownMultiSelect);
      canvas.off('mouse:move', handleMouseMoveMultiSelect);
      canvas.off('mouse:up', handleMouseUpMultiSelect);
    };
  }, [canvas, drawingMode]);
};

export default useMultiSelect;
