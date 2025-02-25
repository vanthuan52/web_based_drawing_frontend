import React, {useEffect, useRef, useState} from 'react';
import clsx from 'clsx';
import {Canvas} from 'fabric';
import styles from './CanvasBoard.module.scss';
import CanvasTools from '@/components/CanvasTools/CanvasTools';
import {Guideline} from '@/types/canvas';
import Properties from '@/components/Properties/Properties';
import Sidebar from '@/components/Sidebar/Sidebar';
import {RootState, useAppDispatch, useAppSelector} from '@/redux/store';
import {canvasManagerActions} from '@/redux/slice/canvasManagerSlice';
import useCanvasPanning from '@/hooks/useCanvasPanning';
import useCanvasDrawing from '@/hooks/useCanvasDrawing';
import useCanvasHistory from '@/hooks/useCanvasHistory';
import useCanvasResize from '@/hooks/useCanvasResize';
import useCanvasFreeDrawing from '@/hooks/useCanvasFreeDrawing';
import useCanvasPolygon from '@/hooks/useCanvasPolygon';
import useSnapping from '@/hooks/useSnapping';
import useObjectSnapping from '@/hooks/useObjectSnapping';
import useCanvasCopyPaste from '@/hooks/useCanvasCopyPaste';
import useObjectDeletion from '@/hooks/useObjectDeletion';

const CanvasBoard: React.FC = () => {
  const dispatch = useAppDispatch();
  const activeCanvas = useAppSelector((state: RootState) =>
    state.canvasManager.canvases.find((canvas) => canvas.active)
  );
  const activeTool = useAppSelector(
    (state: RootState) => state.canvas.activeTool
  );

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [canvas, setCanvas] = useState<Canvas | null>(null);
  const [isPanning, setIsPanning] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);

  const [guidelines, setGuidelines] = useState<Guideline[]>([]);

  const [dimensions, setDimensions] = useState({
    width: window.innerWidth - 250 - 250 - 3,
    height: window.innerHeight - 2,
  });

  useCanvasResize({canvas, dimensions, setDimensions});
  useCanvasPanning({canvas, isPanning});
  useCanvasDrawing({canvas, activeTool});
  useCanvasFreeDrawing({canvas, isDrawing});
  useCanvasPolygon({canvas, activeTool});
  useCanvasCopyPaste({canvas});
  useObjectDeletion({canvas});
  useObjectSnapping({canvas, guidelines, setGuidelines});
  useSnapping({canvas});

  //const {undo, redo, canUndo, canRedo} = useCanvasHistory({canvas});

  useEffect(() => {
    if (!activeCanvas || !canvasRef.current) {
      console.log('Canvas starting up failed');
      return;
    }

    const initCanvas = new Canvas(canvasRef.current, {
      width: dimensions.width,
      height: dimensions.height,
      backgroundColor: '#fff',
    });

    initCanvas.clear();

    if (activeCanvas.json) {
      initCanvas.loadFromJSON(activeCanvas.json, () => {
        initCanvas.renderAll();
        // Make sure the entire canvas is updated
        setTimeout(() => initCanvas.requestRenderAll(), 50);
      });
    } else {
      initCanvas.renderAll();
    }

    setCanvas(initCanvas);

    return () => {
      dispatch(
        canvasManagerActions.saveCanvasState({
          id: activeCanvas.id,
          json: initCanvas.toJSON(),
        })
      );
      initCanvas.dispose();
    };
  }, [activeCanvas?.id, dimensions]);

  return (
    <div className={clsx(styles['canvas-board'])}>
      <Sidebar canvas={canvas} />
      <canvas id="canvas" ref={canvasRef} className={styles['canvas']} />
      <CanvasTools
        canvas={canvas}
        isPanning={isPanning}
        onSetIsPanning={setIsPanning}
        isDrawing={isDrawing}
        onSetIsDrawing={setIsDrawing}
      />
      <Properties canvas={canvas} />
    </div>
  );
};

export default CanvasBoard;
