import {useState, useEffect, useCallback} from 'react';
import {FabricObject, Canvas} from 'fabric';
import {DEFAULT_OBJECT_COLOR} from '@/constant/string';

export const useCanvasSelection = (canvas: Canvas | null) => {
  const [selectedObject, setSelectedObject] = useState<FabricObject | null>(
    null
  );
  const [properties, setProperties] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    diameter: 0,
    color: DEFAULT_OBJECT_COLOR,
  });

  const resetProperties = () => {
    setProperties({
      left: 0,
      top: 0,
      width: 0,
      height: 0,
      diameter: 0,
      color: DEFAULT_OBJECT_COLOR,
    });
  };

  const handleObjectSelection = useCallback((object: FabricObject | null) => {
    if (!object) return;

    setProperties({
      left: Math.round(object.left ?? 0),
      top: Math.round(object.top ?? 0),
      width:
        object.type === 'rect'
          ? Math.round((object.width ?? 0) * (object.scaleX ?? 1))
          : 0,
      height:
        object.type === 'rect'
          ? Math.round((object.height ?? 0) * (object.scaleY ?? 1))
          : 0,

      diameter:
        object.type === 'circle'
          ? // @ts-ignore
            Math.round((object.radius ?? 0) * 2 * (object.scaleX ?? 1))
          : 0,
      // @ts-ignore
      color: object.fill ?? DEFAULT_OBJECT_COLOR,
    });
  }, []);

  useEffect(() => {
    if (!canvas) return;

    const handleSelection = (event: any) =>
      handleObjectSelection(event.selected?.[0]);
    const handleCleared = () => {
      setSelectedObject(null);
      resetProperties();
    };

    canvas.on('selection:created', handleSelection);
    canvas.on('selection:updated', handleSelection);
    canvas.on('selection:cleared', handleCleared);
    canvas.on('object:modified', (event: any) =>
      handleObjectSelection(event.target)
    );
    canvas.on('object:scaling', (event: any) =>
      handleObjectSelection(event.target)
    );

    return () => {
      canvas.off('selection:created', handleSelection);
      canvas.off('selection:updated', handleSelection);
      canvas.off('selection:cleared', handleCleared);
      canvas.off('object:modified', handleObjectSelection);
      canvas.off('object:scaling', handleObjectSelection);
    };
  }, [canvas, handleObjectSelection]);
  return {selectedObject, setSelectedObject, properties, setProperties};
};
