import React, {useState, useEffect} from 'react';
import {Canvas} from 'fabric';
import clsx from 'clsx';
import {
  ChevronDown,
  ChevronRight,
  ChevronUp,
  CircleX,
  Eye,
  EyeClosed,
  X,
} from 'lucide-react';
import {Tooltip} from 'react-tooltip';
import {RootState, useAppDispatch, useAppSelector} from '@/redux/store';
import {CustomFabricObject, PlainFabricObject} from '@/types/canvas';
import Button from '@/components/Common/Button/Button';
import styles from './CanvasLayer.module.scss';
import {TOOLTIP_CONTENT} from '@/constant/common';
import useCanvasSelection from '@/hooks/useCanvasSelection';
import {canvasActions} from '@/redux/slice/canvasSlice';
import {convertFabricObjectToPlainObject} from '@/utils/canvasUtils';

interface LayerListProps {
  canvas: Canvas | null;
}

interface SelectLayer {
  id: string;
  opacity?: number;
}

const LAYER_DIRECTION_CONTROLS = {
  up: 'up',
  down: 'down',
};

const LayerList = ({canvas}: LayerListProps) => {
  const useDispatch = useAppDispatch();
  const layers = useAppSelector((state: RootState) => state.canvas.layers);
  const [selectedLayer, setSelectedLayer] = useState<string | null>(null);
  const {selectedObject} = useCanvasSelection({canvas});

  useEffect(() => {
    if (!selectedObject) {
      setSelectedLayer(null);
    } else {
      setSelectedLayer(selectedObject.get('id'));
    }
  }, [canvas, selectedObject]);

  const selectLayerInCanvas = (layerId: string) => {
    if (!canvas) return;
    const object = canvas
      .getObjects()
      .find((obj: CustomFabricObject) => obj.get('id') === layerId);
    if (!object) return;

    setSelectedLayer(object.get('id'));
    canvas.setActiveObject(object);
    canvas.renderAll();
  };

  const handleDeleteObject = (layerId: string) => {
    if (!canvas) return;

    const object = canvas
      .getObjects()
      .find((obj: CustomFabricObject) => obj.get('id') === layerId);
    if (!object) return;

    setSelectedLayer(null);
    useDispatch(canvasActions.removeObjectFromLayers(layerId));

    canvas.remove(object);
    canvas.discardActiveObject();
    canvas.renderAll();
  };

  const handleHideShowObject = (layerId: string) => {
    if (!canvas) return;

    const object = canvas
      .getObjects()
      .find((obj: CustomFabricObject) => obj.get('id') === layerId);
    if (!object) return;

    if (object.opacity === 1) {
      object.opacity = 0;
      object.selectable = false;
    } else {
      object.opacity = 1;
      object.selectable = true;
    }

    useDispatch(
      canvasActions.updateObjectOfLayers({
        objectId: layerId,
        objectToUpdate: convertFabricObjectToPlainObject(object),
      })
    );
    canvas.renderAll();
  };

  return (
    <div className={styles['layer-list']}>
      <div className={styles['layer']}>
        {/* <div className={styles['layer-actions']}>
          <Button
            className={styles['layer-actions__button']}
            onClick={() => {}}
            disabled={!selectedLayer}>
            <ChevronUp size={20} />
          </Button>

          <Button
            className={styles['layer-actions__button']}
            onClick={() => {}}
            disabled={!selectedLayer}>
            <ChevronDown size={20} />
          </Button>
        </div> */}
        {layers.map((layer: PlainFabricObject) => (
          <div
            key={layer.id}
            className={clsx(styles['layer-item'], {
              [styles['selected']]: layer.id === selectedLayer,
            })}
            onClick={() => selectLayerInCanvas(layer.id)}>
            <div className={styles['layer-item__info']}>
              <ChevronRight size={12} />
              <span className={clsx(styles['layer-item__label'])}>
                {layer.type}
              </span>
            </div>
            <div className={styles['layer-item__action']}>
              {layer.opacity === 1 ? (
                <Eye
                  size={20}
                  onClick={() => handleHideShowObject(layer.id)}
                  data-tooltip-id={TOOLTIP_CONTENT.hide_show.id}
                />
              ) : (
                <EyeClosed
                  size={20}
                  onClick={() => handleHideShowObject(layer.id)}
                  data-tooltip-id={TOOLTIP_CONTENT.hide_show.id}
                />
              )}

              <X
                size={20}
                onClick={() => handleDeleteObject(layer.id)}
                data-tooltip-id={TOOLTIP_CONTENT.delete_button.id}
              />
            </div>
          </div>
        ))}
      </div>
      <Tooltip
        id={TOOLTIP_CONTENT.delete_button.id}
        place="top"
        content={TOOLTIP_CONTENT.delete_button.content}
      />
      <Tooltip
        id={TOOLTIP_CONTENT.hide_show.id}
        place="top"
        content={TOOLTIP_CONTENT.hide_show.content}
      />
    </div>
  );
};

export default LayerList;
