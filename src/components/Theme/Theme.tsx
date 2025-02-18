import React, {useState} from 'react';
import {SketchPicker} from 'react-color';
import styles from './Theme.module.scss';
import Input from '../Common/Input/Input';
import {Tooltip} from 'react-tooltip';

interface ThemeProps {
  color: string;
  onColorChange: (color: {hex: string}) => void;
  opacity: string;
  onOpacityChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Theme = ({
  color,
  onColorChange,
  opacity,
  onOpacityChange,
}: ThemeProps) => {
  const [showColorPicker, setShowColorPicker] = useState(false);

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
            data-tooltip-id="bg-color-tooltip"
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
            data-tooltip-id="opacity-tooltip"
            className={styles['theme-opacity']}>
            <Input
              className={styles['theme-opacity__input']}
              value={opacity}
              noBorder
              noPadding
              onChange={onOpacityChange}
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

      <Tooltip id="bg-color-tooltip" place="top" content="Background color" />
      <Tooltip id="opacity-tooltip" place="top" content="Opacity" />
    </div>
  );
};

export default Theme;
