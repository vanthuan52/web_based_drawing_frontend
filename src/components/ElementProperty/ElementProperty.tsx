import React, {useState, useEffect, useCallback} from 'react';
import {Canvas, FabricObject} from 'fabric';
import clsx from 'clsx';
import {Trash} from 'lucide-react';
import styles from './ElementProperty.module.scss';
import {DEFAULT_OBJECT_COLOR} from '@/constant/string';
import Input from '@/components/Common/Input/Input';
import Button from '@/components/Common/Button/Button';
import CroppingSetting from '@/components/CroppingSetting/CroppingSetting';
import TypographyControls from '@/components/TypographyControls/TypographyControls';
import Theme from '@/components/Theme/Theme';
import CanvasZooming from '@/components/CanvasZooming/CanvasZooming';
import Stroke from '@/components/Stroke/Stroke';
import {Tooltip} from 'react-tooltip';

interface ElementPropertyProps {
  canvas: Canvas | null;
}

const ElementProperty = ({canvas = null}: ElementPropertyProps) => {
  const [selectedObject, setSelectedObject] = useState<FabricObject | null>(
    null
  );
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [diameter, setDiameter] = useState(0);
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

    setLeft(Math.round(object.left ?? 0));
    setTop(Math.round(object.top ?? 0));
    setColor(object.get('fill') ?? DEFAULT_OBJECT_COLOR);
    setOpacity(
      object.opacity !== undefined
        ? `${Math.round(object.opacity * 100)}`
        : '100'
    );
    setStrokeColor(object.get('stroke') ?? DEFAULT_OBJECT_COLOR);
    setStrokeWidth(object.get('strokeWidth') ?? 0);

    if (object.type === 'rect') {
      setWidth(Math.round((object.width ?? 0) * (object.scaleX ?? 1)));
      setHeight(Math.round((object.height ?? 0) * (object.scaleY ?? 1)));
      setDiameter(0);
    } else if (object.type === 'circle') {
      setDiameter(
        Math.round((object.get('radius') ?? 0) * 2 * (object.scaleX ?? 1))
      );
      setWidth(0);
      setHeight(0);
    }
  }, []);

  const resetProperties = () => {
    setLeft(0);
    setTop(0);
    setWidth(0);
    setHeight(0);
    setDiameter(0);
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
      <div className={styles['property']}>
        <div className={styles['property-header']}>
          <span className={styles['property-title']}>Properties</span>
        </div>
        <div className={styles['property-body']}>
          {[
            {
              label: 'X',
              value: left,
              setter: setLeft,
              prop: 'left',
              tooltipId: 'x-position-tooltip',
            },
            {
              label: 'Y',
              value: top,
              setter: setTop,
              prop: 'top',
              tooltipId: 'y-position-tooltip',
            },
            {
              label: 'W',
              value: width,
              setter: setWidth,
              prop: 'width',
              tooltipId: 'width-tooltip',
            },
            {
              label: 'H',
              value: height,
              setter: setHeight,
              prop: 'height',
              tooltipId: 'height-tooltip',
            },
            {
              label: 'D',
              value: diameter,
              setter: setDiameter,
              prop: 'diameter',
              tooltipId: 'diameter-tooltip',
            },
          ].map(({label, value, setter, prop, tooltipId}) => (
            <div key={label} className={styles['property-item']}>
              <div
                className={styles['property-item__value']}
                data-tooltip-id={tooltipId}>
                <div className={styles['property-item__label']}>{label}</div>
                <Input
                  placeholder={prop}
                  className={styles['property-item__input']}
                  value={value}
                  noBorder
                  noPadding
                  onChange={handleChange(setter, prop)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <Theme
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

      <Tooltip id="x-position-tooltip" place="top" content="X-position" />
      <Tooltip id="y-position-tooltip" place="top" content="Y-position" />
      <Tooltip id="width-tooltip" place="top" content="Width" />
      <Tooltip id="height-tooltip" place="top" content="Height" />
      <Tooltip id="diameter-tooltip" place="top" content="Diameter" />
    </div>
  );
};

export default ElementProperty;
