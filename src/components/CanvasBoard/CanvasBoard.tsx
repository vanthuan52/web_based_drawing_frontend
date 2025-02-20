import React, {useEffect, useRef, useState} from 'react';
import {useDispatch} from 'react-redux';
import clsx from 'clsx';
import {Canvas} from 'fabric';
import styles from './CanvasBoard.module.scss';
import CanvasTools from '@/components/CanvasTools/CanvasTools';
import {CanvasObjectType, Guideline} from '@/types/canvas';
import Properties from '@/components/Properties/Properties';
import Sidebar from '@/components/Sidebar/Sidebar';
import {RootState, useAppSelector} from '@/redux/store';
import {canvasManagerActions} from '@/redux/slice/canvasManagerSlice';
import useCanvasPanning from '@/hooks/useCanvasPanning';
import useCanvasDrawing from '@/hooks/useCanvasDrawing';
import useCanvasHistory from '@/hooks/useCanvasHistory';
import useCanvasSnapping from '@/hooks/useCanvasSnapping';
import useCanvasResize from '@/hooks/useCanvasResize';
import useCanvasFreeDrawing from '@/hooks/useCanvasFreeDrawing';

const CanvasBoard: React.FC = () => {
  const dispatch = useDispatch();
  const activeCanvas = useAppSelector((state: RootState) =>
    state.canvasManager.canvases.find((canvas) => canvas.active)
  );
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [canvas, setCanvas] = useState<Canvas | null>(null);
  const [isPanning, setIsPanning] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<CanvasObjectType>('line');

  const [guidelines, setGuidelines] = useState<Guideline[]>([]);

  const [dimensions, setDimensions] = useState({
    width: window.innerWidth - 250 - 250 - 3,
    height: window.innerHeight - 3,
  });

  useCanvasResize({canvas, dimensions, setDimensions});
  useCanvasPanning({canvas, isPanning});
  //useCanvasDrawing({canvas, isDrawing, setIsDrawing, tool});
  useCanvasSnapping({canvas, guidelines, setGuidelines});
  useCanvasFreeDrawing({canvas, isDrawing});
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
