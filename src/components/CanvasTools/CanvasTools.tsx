import React, {useState} from 'react';
import clsx from 'clsx';
import {useDispatch} from 'react-redux';
import {Canvas} from 'fabric';
import {
  ChevronDown,
  Circle,
  Component,
  Hand,
  Hexagon,
  Minus,
  MousePointer2,
  Pencil,
  PenTool,
  Redo2,
  Square,
  Trash2,
  Type,
  Undo2,
} from 'lucide-react';
import styles from './CanvasTools.module.scss';
import useCanvas from '@/hooks/useCanvas';
import Cropping from '@/components/Cropping/Cropping';
import useTextEditing from '@/hooks/useTextEditing';
import CustomPopover from '@/components/Common/CustomPopover/CustomPopoper';
import {RootState, useAppSelector} from '@/redux/store';
import {canvasActions} from '@/redux/slice/canvasSlice';

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
  const dispatch = useDispatch();
  const activeTool = useAppSelector(
    (state: RootState) => state.canvas.activeTool
  );

  const {addLine, addRectangle, addCircle, addPolygon} = useCanvas({
    canvas,
  });

  const {addText} = useTextEditing({canvas});

  const [refreshKey, setRefreshKey] = useState(0);

  const resetTool = () => {
    onSetIsPanning(false);
    onSetIsDrawing(false);
  };

  const toggleDrawLine = () => {
    dispatch(canvasActions.setActiveTool('line'));
    resetTool();
  };

  const toggleDrawRect = () => {
    dispatch(canvasActions.setActiveTool('rect'));
    resetTool();
  };

  const toggleDrawCircle = () => {
    dispatch(canvasActions.setActiveTool('circle'));
    resetTool();
  };

  const toggleDrawEllipse = () => {
    dispatch(canvasActions.setActiveTool('ellipse'));
    resetTool();
  };

  const toggleDrawPolygon = () => {
    dispatch(canvasActions.setActiveTool('polygon'));
    resetTool();
  };

  const toggleAddText = () => {
    dispatch(canvasActions.setActiveTool('text'));
    resetTool();
    addText();
  };

  const handleFramesUpdated = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  const handleSetIsPanning = () => {
    dispatch(canvasActions.setActiveTool('panning'));
    onSetIsPanning(true);
    onSetIsDrawing(false);
  };

  const handleSetIsDrawing = () => {
    dispatch(canvasActions.setActiveTool('pencil'));
    onSetIsPanning(false);
    onSetIsDrawing(true);
  };

  const togglePenAction = () => {
    dispatch(canvasActions.setActiveTool('pen'));
    onSetIsPanning(false);
    onSetIsDrawing(false);
  };

  const handleResetDefaultCursor = () => {
    dispatch(canvasActions.setActiveTool('select'));
    onSetIsDrawing(false);
    onSetIsPanning(false);
  };

  const handleClearAllCanvas = () => {
    canvas?.clear();
    canvas?.renderAll();
  };

  return (
    <div className={styles['canvas-tools']}>
      <div className={styles['tools']}>
        <div className={styles['tools-item']}>
          <div
            className={clsx(styles['tools-item__main'], {
              [styles['active']]: activeTool === 'select',
            })}
            onClick={handleResetDefaultCursor}>
            <MousePointer2 />
          </div>
          <div className={styles['tools-item__dropdown']}>
            <CustomPopover trigger={<ChevronDown size={14} />}>
              <div className={styles['menu']}>
                <div
                  className={clsx(styles['menu-item'], {
                    [styles['active']]: activeTool === 'select',
                  })}
                  onClick={handleResetDefaultCursor}>
                  <div className={styles['menu-item__icon']}>
                    <MousePointer2 size={18} />
                  </div>
                  <div className={styles['menu-item__label']}>Move</div>
                </div>
                <div
                  className={clsx(styles['menu-item'], {
                    [styles['active']]: activeTool === 'panning',
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
            className={clsx(styles['tools-item__main'], {
              [styles['active']]: activeTool === 'rect',
            })}
            onClick={toggleDrawRect}>
            <Square />
          </div>
          <div className={styles['tools-item__dropdown']}>
            <CustomPopover trigger={<ChevronDown size={14} />}>
              <div className={styles['menu']}>
                <div
                  className={clsx(styles['menu-item'], {
                    [styles['active']]: activeTool === 'rect',
                  })}
                  onClick={toggleDrawRect}>
                  <div className={styles['menu-item__icon']}>
                    <Square size={18} />
                  </div>
                  <div className={styles['menu-item__label']}>Rectangle</div>
                </div>
                <div
                  className={clsx(styles['menu-item'], {
                    [styles['active']]: activeTool === 'circle',
                  })}
                  onClick={toggleDrawCircle}>
                  <div className={styles['menu-item__icon']}>
                    <Circle size={18} />
                  </div>
                  <div className={styles['menu-item__label']}>Circle</div>
                </div>
                <div
                  className={clsx(styles['menu-item'], {
                    [styles['active']]: activeTool === 'ellipse',
                  })}
                  onClick={toggleDrawEllipse}>
                  <div className={styles['menu-item__icon']}>
                    <Circle size={18} />
                  </div>
                  <div className={styles['menu-item__label']}>Ellipse</div>
                </div>
                <div
                  className={clsx(styles['menu-item'], {
                    [styles['active']]: activeTool === 'polygon',
                  })}
                  onClick={toggleDrawPolygon}>
                  <div className={styles['menu-item__icon']}>
                    <Hexagon size={18} />
                  </div>
                  <div className={styles['menu-item__label']}>Polygon</div>
                </div>
                <div
                  className={clsx(styles['menu-item'], {
                    [styles['active']]: activeTool === 'line',
                  })}
                  onClick={toggleDrawLine}>
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
            onClick={toggleAddText}>
            <Type />
          </div>
        </div>

        <div className={styles['tools-item']}>
          <div
            className={clsx(styles['tools-item__main'], {
              [styles['active']]: isDrawing,
            })}
            onClick={handleSetIsDrawing}>
            <Pencil />
          </div>
          <div className={styles['tools-item__dropdown']}>
            <CustomPopover trigger={<ChevronDown size={14} />}>
              <div className={styles['menu']}>
                <div
                  className={clsx(styles['menu-item'], {
                    [styles['active']]: activeTool === 'pen',
                  })}
                  onClick={togglePenAction}>
                  <div className={styles['menu-item__icon']}>
                    <PenTool size={18} />
                  </div>
                  <div className={styles['menu-item__label']}>Pen</div>
                </div>
                <div
                  className={clsx(styles['menu-item'], {
                    [styles['active']]: activeTool === 'pencil',
                  })}
                  onClick={handleSetIsDrawing}>
                  <div className={styles['menu-item__icon']}>
                    <Pencil size={18} />
                  </div>
                  <div className={styles['menu-item__label']}>Pencil</div>
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
                  <div className={styles['menu-item__label']}>Undo</div>
                </div>
                <div
                  className={clsx(styles['menu-item'], {})}
                  onClick={handleResetDefaultCursor}>
                  <div className={styles['menu-item__icon']}>
                    <button
                      disabled={!canRedo}
                      onClick={redo}
                      className={styles['tools-items__button']}>
                      <Redo2 />
                    </button>
                  </div>
                  <div className={styles['menu-item__label']}>Redo</div>
                </div>

                <div
                  className={clsx(styles['menu-item'], {})}
                  onClick={handleClearAllCanvas}>
                  <div className={styles['menu-item__icon']}>
                    <button
                      disabled={!canRedo}
                      onClick={redo}
                      className={styles['tools-items__button']}>
                      <Trash2 />
                    </button>
                  </div>
                  <div className={styles['menu-item__label']}>Clean</div>
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
