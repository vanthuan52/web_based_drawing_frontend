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
import {Tooltip} from 'react-tooltip';
import clsx from 'clsx';
import useTextEditing from '@/hooks/useTextEditing';
import styles from './TypographyControls.module.scss';
import Input from '../Common/Input/Input';
import {TOOLTIP_CONTENT} from '@/constant/common';
import {RootState, useAppDispatch, useAppSelector} from '@/redux/store';
import {canvasObjectActions} from '@/redux/slice/canvasObjectSlice';
import {ObjectProperty} from '@/types/canvas';

interface TypographyControlsProps {
  canvas: Canvas | null;
}

type TextAlignType = 'left' | 'center' | 'right';
type VerticalAlignType = 'top' | 'middle' | 'bottom';

const Typography = ({canvas}: TypographyControlsProps) => {
  const dispatch = useAppDispatch();
  const {updateText} = useTextEditing({canvas});

  const {fontFamily, fontSize, fontWeight, textAlign, originY} = useAppSelector(
    (state: RootState) => state.canvasObject
  );

  const handleFontChange = (event: any) => {
    updateText('fontFamily', event.target.value);
    dispatch(
      canvasObjectActions.updateObjectProperties({
        fontFamily: event.target.value,
      } as ObjectProperty)
    );
  };

  const handleFontSizeChange = (event: any) => {
    const size = Number(event.target.value);
    updateText('fontSize', size);
    dispatch(
      canvasObjectActions.updateObjectProperties({
        fontSize: event.target.value,
      } as ObjectProperty)
    );
  };

  const handleFontWeightChange = (event: any) => {
    updateText('fontWeight', fontWeight);
    dispatch(
      canvasObjectActions.updateObjectProperties({
        fontWeight: event.target.value,
      } as ObjectProperty)
    );
  };

  const handleTextAlignChange = (align: TextAlignType) => {
    updateText('textAlign', align);
    dispatch(
      canvasObjectActions.updateObjectProperties({
        textAlign: align,
      } as ObjectProperty)
    );
  };

  const handleVerticalAlignChange = (align: VerticalAlignType) => {
    updateText('originY', align);
    dispatch(
      canvasObjectActions.updateObjectProperties({
        originY: align,
      } as ObjectProperty)
    );
  };

  return (
    <div className={styles['typography']}>
      <div className={styles['typography-header']}>
        <span className={styles['typography-title']}>Typograhy</span>
      </div>
      <div className={styles['typography-body']}>
        {/* Font Family */}
        <div
          className={styles['typography-font']}
          data-tooltip-id={TOOLTIP_CONTENT.font_family.id}>
          <select
            value={fontFamily}
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
            data-tooltip-id={TOOLTIP_CONTENT.font_weight.id}
            value={fontWeight}
            onChange={handleFontWeightChange}
            className={styles['typography-font__weight']}>
            <option value="normal">Normal</option>
            <option value="Bold">Bold</option>
          </select>
          <Input
            data-tooltip-id={TOOLTIP_CONTENT.font_size.id}
            className={styles['typography-font__size']}
            type="text"
            value={fontSize}
            onChange={handleFontSizeChange}
          />
        </div>

        {/* Text Alignment */}
        <div className={styles['typography-alignment']}>
          <div className={styles['typography-alignment__text']}>
            <div
              data-tooltip-id={TOOLTIP_CONTENT.align_left.id}
              className={clsx(styles['typography-alignment__position'], {
                [styles['active']]: textAlign === 'left',
              })}
              onClick={() => handleTextAlignChange('left')}>
              <AlignLeft />
            </div>
            <div
              data-tooltip-id={TOOLTIP_CONTENT.align_center.id}
              className={clsx(styles['typography-alignment__position'], {
                [styles['active']]: textAlign === 'center',
              })}
              onClick={() => handleTextAlignChange('center')}>
              <AlignCenter />
            </div>
            <div
              data-tooltip-id={TOOLTIP_CONTENT.align_right.id}
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
              data-tooltip-id={TOOLTIP_CONTENT.align_top.id}
              className={clsx(styles['typography-alignment__position'], {
                [styles['active']]: originY === 'top',
              })}
              onClick={() => handleVerticalAlignChange('top')}>
              <ArrowUpFromLine />
            </div>
            <div
              data-tooltip-id={TOOLTIP_CONTENT.align_middle.id}
              className={clsx(styles['typography-alignment__position'], {
                [styles['active']]: originY === 'middle',
              })}
              onClick={() => handleVerticalAlignChange('middle')}>
              <UnfoldVertical />
            </div>
            <div
              data-tooltip-id={TOOLTIP_CONTENT.align_bottom.id}
              className={clsx(styles['typography-alignment__position'], {
                [styles['active']]: originY === 'bottom',
              })}
              onClick={() => handleVerticalAlignChange('bottom')}>
              <ArrowDownToLine />
            </div>
          </div>
        </div>
      </div>

      <Tooltip
        id={TOOLTIP_CONTENT.font_family.id}
        place="top"
        content={TOOLTIP_CONTENT.font_family.content}
      />
      <Tooltip
        id={TOOLTIP_CONTENT.font_weight.id}
        place="top"
        content={TOOLTIP_CONTENT.font_weight.content}
      />
      <Tooltip
        id={TOOLTIP_CONTENT.font_size.id}
        place="top"
        content={TOOLTIP_CONTENT.font_size.content}
      />
      <Tooltip
        id={TOOLTIP_CONTENT.align_left.id}
        place="top"
        content={TOOLTIP_CONTENT.align_left.content}
      />
      <Tooltip
        id={TOOLTIP_CONTENT.align_center.id}
        place="top"
        content={TOOLTIP_CONTENT.align_center.content}
      />
      <Tooltip
        id={TOOLTIP_CONTENT.align_right.id}
        place="top"
        content={TOOLTIP_CONTENT.align_right.content}
      />
      <Tooltip
        id={TOOLTIP_CONTENT.align_top.id}
        place="top"
        content={TOOLTIP_CONTENT.align_top.content}
      />
      <Tooltip
        id={TOOLTIP_CONTENT.align_middle.id}
        place="top"
        content={TOOLTIP_CONTENT.align_middle.content}
      />
      <Tooltip
        id={TOOLTIP_CONTENT.align_bottom.id}
        place="top"
        content={TOOLTIP_CONTENT.align_bottom.content}
      />
    </div>
  );
};

export default Typography;
