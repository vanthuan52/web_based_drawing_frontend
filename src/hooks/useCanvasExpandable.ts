import {CustomFabricObject} from '@/types/canvas';
import {Canvas, util} from 'fabric';
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
      const zoom = canvas.getZoom(); // Get current zoom level
      const objects = canvas
        .getObjects()
        .filter((obj: CustomFabricObject) => !obj.isGuideline);

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
      const extraPadding = 100;
      const newWidth = Math.max(
        maxX / zoom + extraPadding,
        container.clientWidth / zoom
      );
      const newHeight = Math.max(
        maxY / zoom + extraPadding,
        container.clientHeight / zoom
      );

      /* if there's a object that is offset to the left or top,
       The entire canvas content needs to be shifted*/
      let offsetX = 0;
      let offsetY = 0;
      if (minX < 0) offsetX = Math.abs(minX) + extraPadding;
      if (minY < 0) offsetY = Math.abs(minY) + extraPadding;

      // move all objects to the right and bottom if needed
      if (offsetX > 0 || offsetY > 0) {
        let animationInProgress = true;

        objects.forEach((obj) => {
          util.animate({
            startValue: obj.left!,
            endValue: obj.left! + offsetX,
            duration: 300, // Adjust for smoothness
            onChange: (value) => {
              obj.set({left: value});
              obj.setCoords(); // Ensure bounding box updates
              canvas.renderAll();
            },
            onComplete: () => {
              animationInProgress = false;
              obj.setCoords(); // Final update for click accuracy
            },
          });

          util.animate({
            startValue: obj.top!,
            endValue: obj.top! + offsetY,
            duration: 300, // Adjust for smoothness
            onChange: (value) => {
              obj.set({top: value});
              obj.setCoords();
              canvas.renderAll();
            },
            onComplete: () => {
              animationInProgress = false;
              obj.setCoords();
            },
          });
        });

        // Smoothly adjust the scroll position
        util.animate({
          startValue: container.scrollLeft,
          endValue: container.scrollLeft + offsetX,
          duration: 300,
          onChange: (value) => (container.scrollLeft = value),
        });

        util.animate({
          startValue: container.scrollTop,
          endValue: container.scrollTop + offsetY,
          duration: 300,
          onChange: (value) => (container.scrollTop = value),
        });

        // Ensure final render to sync bounding box
        setTimeout(() => {
          if (!animationInProgress) canvas.renderAll();
        }, 310);
      }

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
