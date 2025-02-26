import {useEffect, useState, useCallback} from 'react';
import {Canvas, FabricObject} from 'fabric';
import {DEFAULT_OBJECT_COLOR} from '@/constant/string';
import {DEFAULT_OBJECT_PROPERTIES} from '@/constant/common';
import {FabricObjectType, ObjectProperty} from '@/types/canvas';

interface UseCanvasProperties {
  canvas: Canvas | null;
}

const useCanvasProperties = ({canvas = null}: UseCanvasProperties) => {
  const [selectedObject, setSelectedObject] = useState<FabricObject | null>(
    null
  );
  const [properties, setProperties] = useState<ObjectProperty>(
    DEFAULT_OBJECT_PROPERTIES
  );

  const resetProperties = () => {
    setProperties(DEFAULT_OBJECT_PROPERTIES);
  };

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
  }, [canvas]);

  const handleObjectSelection = useCallback((object: FabricObject | null) => {
    if (!object) return;

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

    const type = object.type as FabricObjectType;

    if (type === 'rect') {
      properties.width = Math.round(
        (object.width ?? 0) * (object.scaleX ?? 1)
      ).toString();
      properties.height = Math.round(
        (object.height ?? 0) * (object.scaleY ?? 1)
      ).toString();
    } else if (type === 'circle') {
      properties.diameter = Math.round(
        (object.get('radius') ?? 0) * 2 * (object.scaleX ?? 1)
      ).toString();
    } else if (type === 'ellipse') {
      // do something
    }
    setProperties(properties);
  }, []);

  const updateObjectProperty = (
    property: FabricObjectType,
    value: string | number
  ) => {
    if (!selectedObject || !canvas) return;
    selectedObject.set({[property]: value});
    selectedObject.setCoords();
    canvas.renderAll();
  };

  const updateObjectProperties = (properties: ObjectProperty) => {
    if (!selectedObject || !canvas) return;
    console.log('update');
    selectedObject.set(properties);
    selectedObject.setCoords();
    canvas.renderAll();
  };

  const handleDeleteObject = () => {
    if (!selectedObject || !canvas) return;
    canvas.remove(selectedObject);
    canvas.discardActiveObject();
    canvas.renderAll();
    setSelectedObject(null);
    resetProperties();
  };

  return {
    selectedObject,
    properties,
    setProperties,
    updateObjectProperty,
    updateObjectProperties,
    handleDeleteObject,
  };
};

export default useCanvasProperties;
