import React, {useState, useCallback} from 'react';
import {SketchPicker} from 'react-color';
import {Tooltip} from 'react-tooltip';
import {FlipVertical2} from 'lucide-react';
import styles from './Stroke.module.scss';
import Input from '@/components/Common/Input/Input';
import {Canvas} from 'fabric';
import {canvasObjectActions} from '@/redux/slice/canvasObjectSlice';
import {CustomFabricObject, ObjectProperty} from '@/types/canvas';
import {RootState, useAppDispatch, useAppSelector} from '@/redux/store';
import {TOOLTIP_CONTENT} from '@/constant/common';

interface ThemeProps {
  canvas: Canvas | null;
  selectedObject: CustomFabricObject | null;
}

const Stroke = ({canvas, selectedObject}: ThemeProps) => {
  const dispatch = useAppDispatch();

  const {strokeColor, strokeWidth} = useAppSelector(
    (state: RootState) => state.canvasObject
  );
  const [showStrokeColorPicker, setShowStrokeColorPicker] = useState(false);

  const onStrokeColorChange = useCallback(
    (color: {hex: string}) => {
      dispatch(
        canvasObjectActions.updateObjectProperties({
          strokeColor: color.hex,
        } as ObjectProperty)
      );

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
    const stringValue = value.toString();

    dispatch(
      canvasObjectActions.updateObjectProperties({
        strokeWidth: stringValue,
      } as ObjectProperty)
    );

    selectedObject.set({strokeWidth: value});
    canvas.renderAll();
  };

  const handleOnStrokeColorChange = (color: {hex: string}) => {
    onStrokeColorChange(color);
    setShowStrokeColorPicker(false);
  };

  return (
    <div className={styles['stroke']}>
      <div className={styles['stroke-header']}>
        <span className={styles['stroke-title']}>Stroke</span>
      </div>
      <div className={styles['stroke-body']}>
        <div className={styles['stroke-item']}>
          <div
            data-tooltip-id="stroke-color-tooltip"
            className={styles['stroke-color']}
            onClick={() => setShowStrokeColorPicker(!showStrokeColorPicker)}>
            <div
              className={styles['stroke-color__preview']}
              style={{
                backgroundColor: strokeColor,
              }}></div>
            <span className={styles['stroke-stroke__value']}>
              {strokeColor.toUpperCase()}
            </span>
          </div>

          <div
            className={styles['stroke-width']}
            data-tooltip-id="stroke-width-tooltip">
            <Input
              className={styles['stroke-width__input']}
              value={strokeWidth}
              noBorder
              noPadding
              onChange={handleStrokeWidthChange}
            />
            <span className={styles['stroke-width__icon']}>
              <FlipVertical2 size={15} />
            </span>
          </div>

          {showStrokeColorPicker && (
            <div className={styles['stroke-color__modal']}>
              <SketchPicker
                color={strokeColor}
                onChangeComplete={(color) => handleOnStrokeColorChange(color)}
              />
              <button
                className={styles['stroke-color__button']}
                onClick={() => setShowStrokeColorPicker(false)}>
                Close
              </button>
            </div>
          )}
          <Tooltip
            id={TOOLTIP_CONTENT.stroke_color.id}
            place="top"
            content={TOOLTIP_CONTENT.stroke_color.content}
          />
          <Tooltip
            id={TOOLTIP_CONTENT.stroke_width.id}
            place="top"
            content={TOOLTIP_CONTENT.stroke_width.content}
          />
        </div>
      </div>
    </div>
  );
};

export default Stroke;
