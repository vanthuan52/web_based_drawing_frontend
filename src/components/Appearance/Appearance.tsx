import React, {useEffect, useState, useCallback} from 'react';
import {SketchPicker} from 'react-color';
import {Tooltip} from 'react-tooltip';
import {Canvas, FabricObject} from 'fabric';
import styles from './Appearance.module.scss';
import Input from '../Common/Input/Input';
import {TOOLTIP_CONTENT} from '@/constant/common';
import {RootState, useAppDispatch, useAppSelector} from '@/redux/store';
import {canvasObjectActions} from '@/redux/slice/canvasObjectSlice';
import {FabricObjectProperty} from '@/types/canvas';

interface AppearanceProps {
  canvas: Canvas | null;
  selectedObject: FabricObject | null;
}

const Appearance = ({canvas, selectedObject}: AppearanceProps) => {
  const dispatch = useAppDispatch();

  const {color, opacity} = useAppSelector(
    (state: RootState) => state.canvasObject
  );
  const [showColorPicker, setShowColorPicker] = useState(false);

  const handleOpacityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!canvas || !selectedObject) return;
    let value = parseInt(e.target.value, 10) || 0;
    value = Math.min(100, Math.max(0, value)); // limit 0 to 100%

    dispatch(
      canvasObjectActions.updateObjectProperties({
        opacity: value.toString(),
      } as FabricObjectProperty)
    );

    selectedObject.set({opacity: value / 100});
    canvas.renderAll();
  };

  const onColorChange = useCallback(
    (color: {hex: string}) => {
      dispatch(
        canvasObjectActions.updateObjectProperties({
          color: color.hex,
        } as FabricObjectProperty)
      );
      if (selectedObject && canvas) {
        selectedObject.set({fill: color.hex});
        canvas.renderAll();
      }
    },
    [selectedObject, canvas]
  );

  const handleOnColorChange = (color: {hex: string}) => {
    onColorChange(color);
    setShowColorPicker(false);
  };

  return (
    <div className={styles['theme']}>
      <div className={styles['theme-header']}>
        <span className={styles['theme-title']}>Fill</span>
      </div>
      <div className={styles['theme-body']}>
        <div className={styles['theme-item']}>
          <div
            data-tooltip-id={TOOLTIP_CONTENT.fill.id}
            className={styles['theme-color']}
            onClick={() => setShowColorPicker(!showColorPicker)}>
            <div
              className={styles['theme-color__preview']}
              style={{
                backgroundColor: color,
              }}></div>
            <span className={styles['theme-color__value']}>
              {color.toUpperCase()}
            </span>
          </div>

          <div
            data-tooltip-id={TOOLTIP_CONTENT.opacity.id}
            className={styles['theme-opacity']}>
            <Input
              className={styles['theme-opacity__input']}
              value={opacity}
              noBorder
              noPadding
              onChange={handleOpacityChange}
            />
            <span className={styles['theme-opacity__unit']}>%</span>
          </div>

          {showColorPicker && (
            <div className={styles['theme-color__modal']}>
              <SketchPicker
                color={color}
                onChangeComplete={(color) => handleOnColorChange(color)}
              />
              <button
                className={styles['theme-color__button']}
                onClick={() => setShowColorPicker(false)}>
                Close
              </button>
            </div>
          )}
        </div>
      </div>

      <Tooltip
        id={TOOLTIP_CONTENT.fill.id}
        place="top"
        content={TOOLTIP_CONTENT.fill.content}
      />
      <Tooltip
        id={TOOLTIP_CONTENT.opacity.id}
        place="top"
        content={TOOLTIP_CONTENT.opacity.content}
      />
    </div>
  );
};

export default Appearance;
