import {useEffect} from 'react';
import {Canvas, FabricObject} from 'fabric';

interface UseSnappingProps {
  canvas: Canvas | null;
  gridSize?: number;
  snapThreshold?: number;
}

const useSnapping = ({
  canvas,
  gridSize = 2,
  snapThreshold = 5,
}: UseSnappingProps) => {
  useEffect(() => {
    if (!canvas) return;

    const snapToGrid = (value: number) => {
      return Math.round(value / gridSize) * gridSize;
    };

    const snapToNearestPoint = (obj: FabricObject) => {
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
