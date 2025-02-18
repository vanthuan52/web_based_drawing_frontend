import React, {useEffect, useState} from 'react';
import {Canvas} from 'fabric';

import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  ArrowDownToLine,
  ArrowUpFromLine,
  UnfoldVertical,
} from 'lucide-react';
import clsx from 'clsx';
import useTextEditing from '@/hooks/useTextEditing';
import styles from './TypographyControls.module.scss';
import Input from '../Common/Input/Input';

interface TypographyControlsProps {
  canvas: Canvas | null;
}

type TextAlignType = 'left' | 'center' | 'right';
type VerticalAlignType = 'top' | 'center' | 'bottom';

const Typography = ({canvas}: TypographyControlsProps) => {
  const {updateText} = useTextEditing({canvas});

  const [font, setFont] = useState('Inter');
  const [fontWeight, setFontWeight] = useState('Semi Bold');
  const [fontSize, setFontSize] = useState(18);
  const [textAlign, setTextAlign] = useState<TextAlignType>('left');
  const [originY, setOriginY] = useState<VerticalAlignType>('center');

  const handleFontChange = (event: any) => {
    setFont(event.target.value);
    updateText('fontFamily', event.target.value);
  };

  const handleFontSizeChange = (event: any) => {
    const size = Number(event.target.value);
    setFontSize(size);
    updateText('fontSize', size);
  };

  const handleFontWeightChange = (event: any) => {
    setFontWeight(event.target.value);
    updateText('fontWeight', fontWeight);
  };

  const handleTextAlignChange = (align: TextAlignType) => {
    setTextAlign(align);
    updateText('textAlign', align);
  };

  const handleVerticalAlignChange = (align: VerticalAlignType) => {
    setOriginY(align);
    updateText('originY', align);
  };

  return (
    <div className={styles['typography']}>
      <div className={styles['typography-header']}>
        <span className={styles['typography-title']}>Typograhy</span>
      </div>
      <div className={styles['typography-body']}>
        {/* Font Family */}
        <div className={styles['typography-font']}>
          <select
            value={font}
            onChange={handleFontChange}
            className={styles['typography-font__family']}>
            <option value="Inter">Inter</option>
            <option value="Arial">Arial</option>
            <option value="Times New Roman">Times New Roman</option>
          </select>
        </div>
        {/* Font weight & Font size */}
        <div className={styles['typography-font']}>
          <select
            value={fontWeight}
            onChange={handleFontWeightChange}
            className={styles['typography-font__weight']}>
            <option value="Regular">Regular</option>
            <option value="Semi Bold">Semi Bold</option>
            <option value="Bold">Bold</option>
          </select>
          <Input
            className={styles['typography-font__size']}
            type="text"
            value={fontSize}
            onChange={handleFontSizeChange}
          />
        </div>

        {/* Line Height & Letter Spacing */}
        {/* <div className={styles['typography-spacing']}>
          <TextField
            className={styles['typography-spacing__lineheight']}
            label="A"
            value="Auto"
            size="small"
          />
          <TextField
            className={styles['typography-spacing__letterspacing']}
            label="| A"
            value="0%"
            size="small"
          />
        </div> */}

        {/* Text Alignment */}
        <div className={styles['typography-alignment']}>
          <div className={styles['typography-alignment__text']}>
            <div
              className={clsx(styles['typography-alignment__position'], {
                [styles['active']]: textAlign === 'left',
              })}
              onClick={() => handleTextAlignChange('left')}>
              <AlignLeft />
            </div>
            <div
              className={clsx(styles['typography-alignment__position'], {
                [styles['active']]: textAlign === 'center',
              })}
              onClick={() => handleTextAlignChange('center')}>
              <AlignCenter />
            </div>
            <div
              className={clsx(styles['typography-alignment__position'], {
                [styles['active']]: textAlign === 'right',
              })}
              onClick={() => handleTextAlignChange('right')}>
              <AlignRight />
            </div>
          </div>

          {/* Vertical Alignment */}
          <div className={styles['typography-alignment__vertical']}>
            <div
              className={clsx(styles['typography-alignment__position'], {
                [styles['active']]: originY === 'top',
              })}
              onClick={() => handleVerticalAlignChange('top')}>
              <ArrowUpFromLine />
            </div>
            <div
              className={clsx(styles['typography-alignment__position'], {
                [styles['active']]: originY === 'center',
              })}
              onClick={() => handleVerticalAlignChange('center')}>
              <UnfoldVertical />
            </div>
            <div
              className={clsx(styles['typography-alignment__position'], {
                [styles['active']]: originY === 'bottom',
              })}
              onClick={() => handleVerticalAlignChange('bottom')}>
              <ArrowDownToLine />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Typography;
