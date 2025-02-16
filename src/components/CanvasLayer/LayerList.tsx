import React, {useState, useEffect} from 'react';
import {Canvas, FabricObject} from 'fabric';
import clsx from 'clsx';
import {v4 as uuidv4} from 'uuid';
import {ChevronDown, ChevronRight, ChevronUp, Eye} from 'lucide-react';
import Button from '../Common/Button/Button';
import styles from './CanvasLayer.module.scss';

interface LayerListProps {
  canvas: Canvas | null;
}

interface SelectLayer {
  id: string;
  opacity?: number;
}

const LAYER_DIRECTION_CONTROLS = {
  UP: 'up',
  DOWN: 'down',
};

const LayerList = ({canvas}: LayerListProps) => {
  const [layers, setLayers] = useState<any>([]);
  const [selectedLayer, setSelectedLayer] = useState<string | null>(null);

  const hideSelectedLayer = () => {
    if (!canvas || !selectedLayer) return;

    const object = canvas
      .getObjects()
      .find((obj) => obj.get('id') === selectedLayer);
    if (!object) return;

    if (object.opacity === 0) {
      object.opacity = object.get('prevOpacity') ?? 1;
      object.set({prevOpacity: undefined});
    } else {
      object.set({prevOpacity: object.opacity ?? 1});
      object.opacity = 0;
    }

    canvas.renderAll();
    updateLayers();
  };
  const moveSelectedLayer = (direction: string) => {
    if (!canvas || !selectedLayer) return;

    const objects = canvas.getObjects();
    const object = objects.find((obj) => obj.get('id') === selectedLayer);
    const objectIdx = objects.findIndex(
      (obj) => obj.get('id') === selectedLayer
    );
    if (!object) return;

    if (
      direction === LAYER_DIRECTION_CONTROLS.UP &&
      objectIdx < objects.length - 1
    ) {
      const temp = objects[objectIdx];
      objects[objectIdx] = objects[objectIdx + 1];
      objects[objectIdx + 1] = temp;
    } else if (direction === LAYER_DIRECTION_CONTROLS.DOWN && objectIdx > 0) {
      const temp = objects[objectIdx];
      objects[objectIdx] = objects[objectIdx - 1];
      objects[objectIdx - 1] = temp;
    }

    const backgroundColor = canvas.backgroundColor;
    canvas.clear();

    objects.forEach((obj: FabricObject) => canvas.add(obj));

    canvas.backgroundColor = backgroundColor;
    canvas.renderAll();

    objects.forEach((obj, index) => {
      obj.set({zIndex: index});
    });

    canvas.setActiveObject(object);

    canvas.renderAll();
    updateLayers();
  };

  const addIdToObject = (object: FabricObject) => {
    if (canvas && !object.get('id')) {
      object.set({id: `${object.type}_${uuidv4()}`});
    }
  };

  // @ts-ignore
  Canvas.prototype.updateZIndices = function () {
    const object = this.getObjects();
    object.forEach((obj, index) => {
      addIdToObject(obj);
      obj.set({zIndex: index});
    });
  };

  const updateLayers = () => {
    if (!canvas) return;
    // @ts-ignore
    canvas.updateZIndices();
    const objects = canvas
      .getObjects()
      .filter(
        (obj: FabricObject) =>
          !(
            obj.get('id').startsWith('vertical-') ||
            obj.get('id').startsWith('horizontal-')
          )
      )
      .map((obj: any) => ({
        id: obj.get('id'),
        zIndex: obj.get('zIndex'),
        type: obj.type,
        opacity: obj.opacity,
      }));

    setLayers([...objects].reverse());
  };

  const handleObjectSelected = (e: any) => {
    const selectedObject = e.selected ? e.selected[0] : null;
    if (selectedObject) {
      setSelectedLayer(selectedObject.id);
    } else {
      setSelectedLayer(null);
    }
  };

  const selectLayerInCanvas = (layerId: string) => {
    if (!canvas) return;
    const object = canvas
      .getObjects()
      .find((obj: FabricObject) => obj.get('id') === layerId);
    if (!object) return;
    canvas.setActiveObject(object);
    canvas.renderAll();
  };

  useEffect(() => {
    if (!canvas) {
      // setLayers([]);
      return;
    }
    // const updateAndResetLayers = () => {
    //   setTimeout(() => {
    //     updateLayers();
    //   }, 0);
    // };

    canvas.on('object:added', updateLayers);
    canvas.on('object:removed', updateLayers);
    canvas.on('object:modified', updateLayers);

    canvas.on('selection:created', handleObjectSelected);
    canvas.on('selection:updated', handleObjectSelected);
    canvas.on('selection:cleared', () => setSelectedLayer(null));

    updateLayers();

    return () => {
      canvas.off('object:added', updateLayers);
      canvas.off('object:removed', updateLayers);
      canvas.off('object:modified', updateLayers);

      canvas.off('selection:created', handleObjectSelected);
      canvas.off('selection:updated', handleObjectSelected);
      canvas.off('selection:cleared', () => setSelectedLayer(null));
    };
  }, [canvas]);

  return (
    <div className={styles['layer-list']}>
      <div className={styles['layer']}>
        <div className={styles['layer-actions']}>
          <Button
            className={styles['layer-actions__button']}
            onClick={() => moveSelectedLayer(LAYER_DIRECTION_CONTROLS.UP)}
            disabled={!selectedLayer || layers[0]?.id === selectedLayer}>
            <ChevronUp size={20} />
          </Button>

          <Button
            className={styles['layer-actions__button']}
            onClick={() => moveSelectedLayer(LAYER_DIRECTION_CONTROLS.DOWN)}
            disabled={
              !selectedLayer || layers[layers.length - 1]?.id === selectedLayer
            }>
            <ChevronDown size={20} />
          </Button>

          <Button
            className={styles['layer-actions__button']}
            onClick={() => hideSelectedLayer()}
            disabled={!selectedLayer}>
            <Eye size={20} />
          </Button>
        </div>
        {layers.map((layer: any) => (
          <div
            key={layer.id}
            className={clsx(styles['layer-item'], {
              [styles['selected']]: layer.id === selectedLayer,
            })}
            onClick={() => selectLayerInCanvas(layer.id)}>
            <div className={styles['layer-item__icon']}>
              <ChevronRight size={12} />
            </div>
            <span className={clsx(styles['layer-item__label'])}>
              {layer.zIndex} - {layer.type}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LayerList;
