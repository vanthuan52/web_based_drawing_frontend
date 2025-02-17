import React, {useState} from 'react';
import {SketchPicker} from 'react-color';
import styles from './Theme.module.scss';

interface ThemeProps {
  color: string;
  onColorChange: (color: {hex: string}) => void;
}

const Theme = ({color, onColorChange}: ThemeProps) => {
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
    </div>
  );
};

export default Theme;
