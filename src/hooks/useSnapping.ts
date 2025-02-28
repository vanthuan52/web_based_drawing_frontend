import {useEffect} from 'react';
import {Canvas} from 'fabric';
import {CANVAS_GRID_SIZE, CANVAS_SNAP_THRESHOLD} from '@/constant/canvas';
import {CustomFabricObject} from '@/types/canvas';

interface UseSnappingProps {
  canvas: Canvas | null;
  gridSize?: number;
  snapThreshold?: number;
}

const useSnapping = ({
  canvas,
  gridSize = CANVAS_GRID_SIZE,
  snapThreshold = CANVAS_SNAP_THRESHOLD,
}: UseSnappingProps) => {
  useEffect(() => {
    if (!canvas) return;

    const snapToGrid = (value: number) => {
      return Math.round(value / gridSize) * gridSize;
    };

    const snapToNearestPoint = (obj: CustomFabricObject) => {
      const objects = canvas.getObjects();

      let nearestX = obj.left;
      let nearestY = obj.top;

      objects.forEach((other) => {
        if (other === obj) return;
        if (Math.abs(obj.left - other.left) < snapThreshold) {
          nearestX = other.left;
        }
        if (Math.abs(obj.top - other.top) < snapThreshold) {
          nearestY = other.top;
        }
      });

      obj.set({left: nearestX, top: nearestY});
      obj.setCoords();
    };

    const handleObjectMoving = (event: any) => {
      const obj = event.target;
      if (!obj) return;

      obj.set({
        left: snapToGrid(obj.left),
        top: snapToGrid(obj.top),
      });

      snapToNearestPoint(obj);
    };

    canvas.on('object:moving', handleObjectMoving);

    return () => {
      canvas.off('object:moving', handleObjectMoving);
    };
  }, [canvas, gridSize, snapThreshold]);
};

export default useSnapping;
