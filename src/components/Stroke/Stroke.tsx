import React, {useState} from 'react';
import {SketchPicker} from 'react-color';
import {Tooltip} from 'react-tooltip';
import {FlipVertical2} from 'lucide-react';
import styles from './Stroke.module.scss';
import Input from '../Common/Input/Input';

interface ThemeProps {
  strokeColor: string;
  onStrokeColorChange: (color: {hex: string}) => void;
  strokeWidth: number;
  onStrokeWidthChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Stroke = ({
  strokeColor,
  onStrokeColorChange,
  strokeWidth,
  onStrokeWidthChange,
}: ThemeProps) => {
  const [showStrokeColorPicker, setShowStrokeColorPicker] = useState(false);

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
              onChange={onStrokeWidthChange}
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
            id="stroke-color-tooltip"
            place="top"
            content="Stroke Color"
          />
          <Tooltip
            id="stroke-width-tooltip"
            place="top"
            content="Stroke Width"
          />
        </div>
      </div>
    </div>
  );
};

export default Stroke;
