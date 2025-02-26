import {useState, useEffect, useCallback} from 'react';
import {FabricObject, Canvas} from 'fabric';
import {DEFAULT_OBJECT_COLOR} from '@/constant/string';
import {ObjectProperty, FabricObjectType} from '@/types/canvas';
import {useAppDispatch} from '@/redux/store';
import {canvasObjectActions} from '@/redux/slice/canvasObjectSlice';

interface UseCanvasSelectionProps {
  canvas: Canvas | null;
}

const useCanvasSelection = ({canvas = null}: UseCanvasSelectionProps) => {
  const [selectedObject, setSelectedObject] = useState<FabricObject | null>(
    null
  );

  const dispatch = useAppDispatch();

  const handleObjectSelection = useCallback((object: FabricObject | null) => {
    if (!object) return;

    setSelectedObject(object);

    // basic properties of an object
    const properties = {} as ObjectProperty;
    properties.left = Math.round(object.left ?? 0).toString();
    properties.top = Math.round(object.top ?? 0).toString();
    properties.color = object.get('fill') ?? DEFAULT_OBJECT_COLOR;
    properties.strokeColor = object.get('stroke') ?? DEFAULT_OBJECT_COLOR;
    properties.strokeWidth = object.get('strokeWidth') ?? 0;
    properties.opacity =
      object.opacity !== undefined
        ? `${Math.round(object.opacity * 100)}`
        : '100';

    properties.diameter = '0';
    properties.width = '0';
    properties.height = '0';

    properties.width = Math.round(
      (object.width ?? 0) * (object.scaleX ?? 1)
    ).toString();
    properties.height = Math.round(
      (object.height ?? 0) * (object.scaleY ?? 1)
    ).toString();

    const type = object.type as FabricObjectType;

    if (type === 'circle') {
      properties.diameter = Math.round(
        (object.get('radius') ?? 0) * 2 * (object.scaleX ?? 1)
      ).toString();
    } else if (type === 'ellipse') {
      // do something
    } else if (type === 'textbox') {
      properties.fontFamily = object.get('fontFamily');
      properties.fontWeight = object.get('fontWeight');
      properties.fontSize = object.get('fontSize');
      properties.textAlign = object.get('textAlign');
      properties.originX = object.get('originX');
      properties.originX = object.get('originY');
    }

    dispatch(canvasObjectActions.setSelectedObject(object));
    dispatch(canvasObjectActions.updateObjectProperties(properties));
  }, []);

  useEffect(() => {
    if (!canvas) return;

    const handleSelection = (event: any) =>
      handleObjectSelection(event.selected?.[0]);

    const handleCleared = () => {
      dispatch(canvasObjectActions.resetSelectedObject());
      dispatch(canvasObjectActions.resetProperty());
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
  }, [canvas]);

  return {selectedObject};
};

export default useCanvasSelection;
