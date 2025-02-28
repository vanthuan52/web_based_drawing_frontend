import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {CircleX, Plus} from 'lucide-react';
import clsx from 'clsx';
import {RootState} from '@/redux/store';
import styles from './CanvasManager.module.scss';
import {canvasManagerActions} from '@/redux/slice/canvasManagerSlice';

const CanvasManager: React.FC = () => {
  const dispatch = useDispatch();
  const canvases = useSelector(
    (state: RootState) => state.canvasManager.canvases
  );

  const handleNewCanvas = () => {
    dispatch(canvasManagerActions.addCanvas());
  };

  const handleSetActiveCanvas = (canvasId: string) => {
    dispatch(canvasManagerActions.setActiveCanvas(canvasId));
  };

  const handleRemoveCanvas = (canvasId: string) => {
    dispatch(canvasManagerActions.removeCanvas(canvasId));
  };

  return (
    <div className={styles['canvas-management']}>
      <div className={styles['canvases']}>
        <div className={styles['canvases-header']}>
          <span className={styles['canvases-title']}>Canvas Management</span>
          <button
            onClick={handleNewCanvas}
            disabled={canvases.length >= 5}
            className={styles['canvases-header__button']}>
            <Plus size={20} />
          </button>
        </div>
        <div className={styles['canvases-body']}>
          {canvases.map((canvas) => (
            <div
              key={canvas.id}
              className={clsx(styles['canvases-item'], {
                [styles['canvas-active']]: canvas.active,
              })}>
              <div
                className={styles['canvases-item__label']}
                onClick={() => handleSetActiveCanvas(canvas.id)}>
                {canvas.name}
              </div>
              <button
                className={styles['canvases-item__button']}
                onClick={() => handleRemoveCanvas(canvas.id)}
                disabled={canvases.length === 1}>
                <CircleX size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CanvasManager;
