import React, {useState, useEffect, useCallback} from 'react';
import {Canvas, FabricObject} from 'fabric';
import clsx from 'clsx';
import {Trash} from 'lucide-react';
import {Tooltip} from 'react-tooltip';
import styles from './ElementProperty.module.scss';
import {DEFAULT_OBJECT_COLOR} from '@/constant/string';
import Button from '@/components/Common/Button/Button';
import CroppingSetting from '@/components/CroppingSetting/CroppingSetting';
import TypographyControls from '@/components/TypographyControls/TypographyControls';
import Appearance from '@/components/Appearance/Appearance';
import CanvasZooming from '@/components/CanvasZooming/CanvasZooming';
import Stroke from '@/components/Stroke/Stroke';
import ShapeProperties from '@/components/ShapeProperties/ShapeProperties';
import {FABRIC_OBJECT_PROPERTIES} from '@/constant/common';

interface ElementPropertyProps {
  canvas: Canvas | null;
}

const ElementProperty = ({canvas = null}: ElementPropertyProps) => {
  const [selectedObject, setSelectedObject] = useState<FabricObject | null>(
    null
  );
  const [left, setLeft] = useState('0');
  const [top, setTop] = useState('0');
  const [width, setWidth] = useState('0');
  const [height, setHeight] = useState('0');
  const [diameter, setDiameter] = useState('0');
  const [color, setColor] = useState(DEFAULT_OBJECT_COLOR);
  const [strokeColor, setStrokeColor] = useState(DEFAULT_OBJECT_COLOR);
  const [strokeWidth, setStrokeWidth] = useState(1);
  const [opacity, setOpacity] = useState<string>('0');
  const [refreshKey, setRefreshKey] = useState(0);

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

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Delete') {
        if (!canvas) return;

        const activeObjects = canvas.getActiveObjects();
        if (activeObjects.length > 0) {
          for (let i = 0; i < activeObjects.length; i++) {
            canvas.remove(activeObjects[i]);
          }
          canvas.discardActiveObject();
          canvas.renderAll();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [canvas]);

  const handleObjectSelection = useCallback((object: FabricObject | null) => {
    if (!object) return;
    setSelectedObject(object);

    setLeft(Math.round(object.left ?? 0).toString());
    setTop(Math.round(object.top ?? 0).toString());
    setColor(object.get('fill') ?? DEFAULT_OBJECT_COLOR);
    setOpacity(
      object.opacity !== undefined
        ? `${Math.round(object.opacity * 100)}`
        : '100'
    );
    setStrokeColor(object.get('stroke') ?? DEFAULT_OBJECT_COLOR);
    setStrokeWidth(object.get('strokeWidth') ?? 0);

    if (object.type === 'rect') {
      setWidth(
        Math.round((object.width ?? 0) * (object.scaleX ?? 1)).toString()
      );
      setHeight(
        Math.round((object.height ?? 0) * (object.scaleY ?? 1)).toString()
      );
      setDiameter('0');
    } else if (object.type === 'circle') {
      setDiameter(
        Math.round(
          (object.get('radius') ?? 0) * 2 * (object.scaleX ?? 1)
        ).toString()
      );
      setWidth('0');
      setHeight('0');
    }
  }, []);

  const resetProperties = () => {
    setLeft('0');
    setTop('0');
    setWidth('0');
    setHeight('0');
    setDiameter('0');
    setColor(DEFAULT_OBJECT_COLOR);
    setStrokeColor(DEFAULT_OBJECT_COLOR);
    setStrokeWidth(0);
    setOpacity('0');
  };

  const handleChange =
    (setter: React.Dispatch<React.SetStateAction<number>>, property: string) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const intValue = parseInt(e.target.value.replace(/,/g, ''), 10) || 0;
      setter(intValue);

      if (!selectedObject || !canvas) return;

      if (property === 'width' || property === 'height') {
        const originalWidth = selectedObject.width || 1;
        const originalHeight = selectedObject.height || 1;
        const newScaleX =
          property === 'width'
            ? intValue / originalWidth
            : selectedObject.scaleX;
        const newScaleY =
          property === 'height'
            ? intValue / originalHeight
            : selectedObject.scaleY;
        selectedObject.set({
          scaleX: newScaleX,
          scaleY: newScaleY,
        });
      } else if (property === 'diameter' && selectedObject.type === 'circle') {
        selectedObject.set({
          radius: intValue / 2, // half of diameter
          scaleX: 1,
          scaleY: 1,
        });
      } else {
        selectedObject.set({[property]: intValue});
      }

      selectedObject.setCoords();
      canvas.renderAll();
    };

  const handleLeftChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const intValue = parseInt(e.target.value.replace(/,/g, ''), 10) || 0;
    setLeft(intValue.toString());

    if (!selectedObject || !canvas) return;
    selectedObject.set({[FABRIC_OBJECT_PROPERTIES.LEFT]: intValue});
    selectedObject.setCoords();
    canvas.renderAll();
  };

  const handleTopChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const intValue = parseInt(e.target.value.replace(/,/g, ''), 10) || 0;
    setTop(intValue.toString());

    if (!selectedObject || !canvas) return;
    selectedObject.set({[FABRIC_OBJECT_PROPERTIES.TOP]: intValue});
    selectedObject.setCoords();
    canvas.renderAll();
  };

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const intValue = parseInt(e.target.value.replace(/,/g, ''), 10) || 0;
    setWidth(intValue.toString());

    if (!selectedObject || !canvas) return;

    const originalWidth = selectedObject.width || 1;

    const newScaleX = intValue / originalWidth;
    const newScaleY = selectedObject.scaleY;

    selectedObject.set({
      scaleX: newScaleX,
      scaleY: newScaleY,
    });

    selectedObject.setCoords();
    canvas.renderAll();
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const intValue = parseInt(e.target.value.replace(/,/g, ''), 10) || 0;
    setHeight(intValue.toString());

    if (!selectedObject || !canvas) return;

    const originalHeight = selectedObject.height || 1;

    const newScaleX = selectedObject.scaleX;
    const newScaleY = intValue / originalHeight;

    selectedObject.set({
      scaleX: newScaleX,
      scaleY: newScaleY,
    });

    selectedObject.setCoords();
    canvas.renderAll();
  };

  const handleDiameterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const intValue = parseInt(e.target.value.replace(/,/g, ''), 10) || 0;
    setDiameter(intValue.toString());

    if (!selectedObject || !canvas || selectedObject.type !== 'circle') return;

    selectedObject.set({
      radius: intValue / 2, // half of diameter
      scaleX: 1,
      scaleY: 1,
    });

    selectedObject.setCoords();
    canvas.renderAll();
  };

  const handleColorChange = useCallback(
    (color: {hex: string}) => {
      setColor(color.hex);
      if (selectedObject && canvas) {
        selectedObject.set({fill: color.hex});
        canvas.renderAll();
      }
    },
    [selectedObject, canvas]
  );

  const handleStrokeColorChange = useCallback(
    (color: {hex: string}) => {
      setStrokeColor(color.hex);
      if (selectedObject && canvas) {
        selectedObject.set({stroke: color.hex});
        canvas.renderAll();
      }
    },
    [selectedObject, canvas]
  );

  const handleStrokeWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!canvas || !selectedObject) return;
    let value = parseFloat(e.target.value) || 0;
    value = Math.min(20, Math.max(0, value)); // limit 0 to 20
    setStrokeWidth(value);

    selectedObject.set({strokeWidth: value});
    canvas.renderAll();
  };

  const handleOpacityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!canvas || !selectedObject) return;
    let value = parseInt(e.target.value, 10) || 0;
    value = Math.min(100, Math.max(0, value)); // limit 0 to 100%
    setOpacity(value.toString());

    selectedObject.set({opacity: value / 100});
    canvas.renderAll();
  };

  const handleDeleteObject = () => {
    if (selectedObject && canvas) {
      canvas.remove(selectedObject);
      canvas.discardActiveObject();
      canvas.renderAll();
      setSelectedObject(null);
      resetProperties();
    }
  };

  return (
    <div className={clsx(styles['element'])}>
      <CanvasZooming canvas={canvas} />

      <ShapeProperties
        canvas={canvas}
        left={left}
        onLeftChange={handleLeftChange}
        top={top}
        onTopChange={handleTopChange}
        width={width}
        onWidthChange={handleWidthChange}
        height={height}
        onHeightChange={handleHeightChange}
        diameter={diameter}
        onDiameterChange={handleDiameterChange}
      />

      <Appearance
        color={color}
        onColorChange={handleColorChange}
        opacity={opacity}
        onOpacityChange={handleOpacityChange}
      />

      <TypographyControls canvas={canvas} />

      <Stroke
        strokeColor={strokeColor}
        onStrokeColorChange={handleStrokeColorChange}
        strokeWidth={strokeWidth}
        onStrokeWidthChange={handleStrokeWidthChange}
      />

      <div className={styles['actions']}>
        <div className={styles['actions-header']}>
          <span className={styles['actions-title']}>Actions</span>
        </div>
        <div className={styles['actions-body']}>
          <div className={styles['actions-item']}>
            <Button
              className={styles['actions-item__button']}
              color={'danger'}
              disabled={!selectedObject}
              onClick={handleDeleteObject}>
              <Trash size={18} className={styles['actions-item__icon']} />
            </Button>
          </div>
        </div>
      </div>

      <div className={styles['frames']}>
        <div className={styles['frames-header']}>
          <span className={styles['frames-title']}>Frames</span>
        </div>
        <div className={styles['frames-body']}>
          <div className={styles['frames-item']}>
            <div className={styles['frames-item__setting']}>
              <CroppingSetting canvas={canvas} refreshKey={refreshKey} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElementProperty;
