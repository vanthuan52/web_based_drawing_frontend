import React, {useState, useEffect} from 'react';
import {Canvas} from 'fabric';
import clsx from 'clsx';
import {ChevronDown, ChevronRight, ChevronUp, Eye} from 'lucide-react';
import {RootState, useAppDispatch, useAppSelector} from '@/redux/store';
import {CustomFabricObject} from '@/types/canvas';
import Button from '@/components/Common/Button/Button';
import styles from './CanvasLayer.module.scss';

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

  useEffect(() => {
    console.log('layers: ', layers);
  }, [layers]);

  const selectLayerInCanvas = (layerId: string) => {
    if (!canvas) return;
    const object = canvas
      .getObjects()
      .find((obj: CustomFabricObject) => obj.get('id') === layerId);
    if (!object) return;
    canvas.setActiveObject(object);
    canvas.renderAll();
  };

  return (
    <div className={styles['layer-list']}>
      <div className={styles['layer']}>
        <div className={styles['layer-actions']}>
          <Button
            className={styles['layer-actions__button']}
            onClick={() => {}}
            disabled={!selectedLayer || layers[0].get('id') === selectedLayer}>
            <ChevronUp size={20} />
          </Button>

          <Button
            className={styles['layer-actions__button']}
            onClick={() => {}}
            disabled={
              !selectedLayer ||
              layers[layers.length - 1].get('id') === selectedLayer
            }>
            <ChevronDown size={20} />
          </Button>

          <Button
            className={styles['layer-actions__button']}
            onClick={() => {}}
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
