import {Canvas} from 'fabric/*';
import {useEffect} from 'react';

interface UseCanvasExpandableProps {
  canvas: Canvas | null;
  canvasContainerRef: any;
  dimensions: {width: number; height: number};
}

const useCanvasExpandable = ({
  canvas,
  canvasContainerRef,
  dimensions,
}: UseCanvasExpandableProps) => {
  useEffect(() => {
    if (!canvas || !canvasContainerRef.current) return;

    const container = canvasContainerRef.current;

    // Set scrollable height & width (simulating infinite space)
    container.style.height = `${dimensions.height}px`;
    container.style.width = `${dimensions.width}px`;

    // Expand canvas dynamically when objects go outside
    const updateCanvasSize = () => {
      const objects = canvas.getObjects();
      if (objects.length === 0) {
        container.style.overflow = 'hidden';
        canvas.setDimensions({
          width: dimensions.width,
          height: dimensions.height,
        });
        return;
      }

      container.style.overflow = 'auto';
      let minX = Infinity;
      let minY = Infinity;
      let maxX = -Infinity;
      let maxY = -Infinity;

      objects.forEach((obj) => {
        const bounds = obj.getBoundingRect();
        minX = Math.min(minX, bounds.left);
        minY = Math.min(minY, bounds.top);
        maxX = Math.max(maxX, bounds.left + bounds.width);
        maxY = Math.max(maxY, bounds.top + bounds.height);
      });

      // Expand canvas dynamically
      const newWidth = Math.max(maxX + 100, container.clientWidth);
      const newHeight = Math.max(maxY + 100, container.clientHeight);

      canvas.setDimensions({width: newWidth, height: newHeight});
    };

    canvas.on('object:added', updateCanvasSize);
    canvas.on('object:modified', updateCanvasSize);
    canvas.on('object:removed', updateCanvasSize);

    return () => {
      canvas.off('object:added', updateCanvasSize);
      canvas.off('object:modified', updateCanvasSize);
      canvas.off('object:removed', updateCanvasSize);
    };
  }, [canvas]);

  return null;
};

export default useCanvasExpandable;
