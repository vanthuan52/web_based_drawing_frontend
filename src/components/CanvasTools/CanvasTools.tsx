import React, {useState} from 'react';
import clsx from 'clsx';
import {Canvas, Line} from 'fabric';
import {
  ChevronDown,
  Circle,
  Component,
  Ellipsis,
  Hand,
  Hexagon,
  Minus,
  MousePointer2,
  Navigation,
  Pencil,
  Plus,
  Redo2,
  Square,
  Type,
  Undo2,
} from 'lucide-react';
import styles from './CanvasTools.module.scss';
import useCanvas from '@/hooks/useCanvas';
import Cropping from '@/components/Cropping/Cropping';
import useTextEditing from '@/hooks/useTextEditing';
import Button from '@/components/Common/Button/Button';
import CustomPopover from '@/components/Common/CustomPopover/CustomPopoper';
import {Popover} from '@mui/material';

interface CanvasToolsProps {
  canvas: Canvas | null;
  isPanning: boolean;
  onSetIsPanning: (value: boolean) => void;
  isDrawing: boolean;
  onSetIsDrawing: (value: boolean) => void;
  undo?: any;
  canUndo?: boolean;
  redo?: any;
  canRedo?: boolean;
}

const CanvasTools = ({
  canvas,
  isPanning,
  onSetIsPanning,
  isDrawing,
  onSetIsDrawing,
  undo,
  canUndo,
  redo,
  canRedo,
}: CanvasToolsProps) => {
  const {addLine, addRectangle, addCircle, addPolygon} = useCanvas({
    canvas,
  });

  const {addText} = useTextEditing({canvas});

  const [refreshKey, setRefreshKey] = useState(0);

  const handleAddLine = () => {
    addLine();
  };

  const handleAddRectangle = () => {
    addRectangle();
  };

  const handleAddCircle = () => {
    addCircle();
  };

  const handleAddPolygon = () => {
    addPolygon();
  };

  const handleAddText = () => {
    addText();
  };

  const handleFramesUpdated = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  const handleSetIsPanning = () => {
    onSetIsPanning(!isPanning);
  };

  const handleSetIsDrawing = () => {
    onSetIsDrawing(!isDrawing);
  };

  const handleResetDefaultCursor = () => {
    onSetIsDrawing(false);
    onSetIsPanning(false);
  };

  return (
    <div className={styles['canvas-tools']}>
      <div className={styles['tools']}>
        <div className={styles['tools-item']}>
          <div
            className={clsx(styles['tools-item__main'], {
              [styles['active']]: !isPanning,
            })}
            onClick={handleResetDefaultCursor}>
            <MousePointer2 />
          </div>
          <div className={styles['tools-item__dropdown']}>
            <CustomPopover trigger={<ChevronDown size={14} />}>
              <div className={styles['menu']}>
                <div
                  className={clsx(styles['menu-item'], {
                    [styles['active']]: !isPanning,
                  })}
                  onClick={handleResetDefaultCursor}>
                  <div className={styles['menu-item__icon']}>
                    <MousePointer2 size={18} />
                  </div>
                  <div className={styles['menu-item__label']}>Move</div>
                </div>
                <div
                  className={clsx(styles['menu-item'], {
                    [styles['active']]: isPanning,
                  })}
                  onClick={handleSetIsPanning}>
                  <div className={styles['menu-item__icon']}>
                    <Hand size={18} />
                  </div>
                  <div className={styles['menu-item__label']}>Hand tool</div>
                </div>
              </div>
            </CustomPopover>
          </div>
        </div>

        <div className={styles['tools-item']}>
          <div
            className={clsx(styles['tools-item__main'], {})}
            onClick={handleAddRectangle}>
            <Square />
          </div>
          <div className={styles['tools-item__dropdown']}>
            <CustomPopover trigger={<ChevronDown size={14} />}>
              <div className={styles['menu']}>
                <div className={styles['menu-item']} onClick={handleAddCircle}>
                  <div className={styles['menu-item__icon']}>
                    <Square size={18} />
                  </div>
                  <div className={styles['menu-item__label']}>Rectangle</div>
                </div>
                <div className={styles['menu-item']} onClick={handleAddCircle}>
                  <div className={styles['menu-item__icon']}>
                    <Circle size={18} />
                  </div>
                  <div className={styles['menu-item__label']}>Circle</div>
                </div>
                <div className={styles['menu-item']} onClick={handleAddPolygon}>
                  <div className={styles['menu-item__icon']}>
                    <Hexagon size={18} />
                  </div>
                  <div className={styles['menu-item__label']}>Polygon</div>
                </div>
                <div className={styles['menu-item']} onClick={handleAddLine}>
                  <div className={styles['menu-item__icon']}>
                    <Minus size={18} />
                  </div>
                  <div className={styles['menu-item__label']}>Line</div>
                </div>
              </div>
            </CustomPopover>
          </div>
        </div>
        <div className={styles['tools-item']}>
          <div
            className={clsx(styles['tools-item__main'], {})}
            onClick={handleAddText}>
            <Type />
          </div>
        </div>

        <div className={styles['tools-item']}>
          <div
            className={clsx(styles['tools-item__main'], {
              [styles['active']]: isDrawing,
            })}>
            <Pencil onClick={handleSetIsDrawing} />
          </div>
          <div className={styles['tools-item__dropdown']}>
            <CustomPopover trigger={<ChevronDown size={14} />}>
              <div className={styles['menu']}>
                <div
                  className={clsx(styles['menu-item'], {
                    [styles['active']]: !isPanning,
                  })}
                  onClick={handleResetDefaultCursor}>
                  <div className={styles['menu-item__icon']}>
                    <MousePointer2 size={18} />
                  </div>
                  <div className={styles['menu-item__label']}>Move</div>
                </div>
              </div>
            </CustomPopover>
          </div>
        </div>

        <div className={styles['tools-item']}>
          <div className={clsx(styles['tools-item__main'])}>
            <Component />
          </div>
          <div className={styles['tools-item__dropdown']}>
            <CustomPopover trigger={<ChevronDown size={14} />}>
              <div className={styles['menu']}>
                <div
                  className={clsx(styles['menu-item'], {
                    [styles['active']]: !isPanning,
                  })}
                  onClick={handleResetDefaultCursor}>
                  <div className={styles['menu-item__icon']}>
                    <button
                      disabled={!canUndo}
                      onClick={undo}
                      className={styles['tools-items__button']}>
                      <Undo2 />
                    </button>
                  </div>
                  <div className={styles['menu-item__label']}>Move</div>
                </div>
              </div>

              <div className={styles['menu']}>
                <div
                  className={clsx(styles['menu-item'], {
                    [styles['active']]: !isPanning,
                  })}
                  onClick={handleResetDefaultCursor}>
                  <div className={styles['menu-item__icon']}>
                    <button
                      disabled={!canRedo}
                      onClick={redo}
                      className={styles['tools-items__button']}>
                      <Redo2 />
                    </button>
                  </div>
                  <div className={styles['menu-item__label']}>Move</div>
                </div>
              </div>
            </CustomPopover>
          </div>
        </div>

        {/* <div className={styles['tools-item']}>
            <Cropping canvas={canvas} onFramesUpdated={handleFramesUpdated} />
          </div> */}
      </div>
    </div>
  );
};

export default CanvasTools;
