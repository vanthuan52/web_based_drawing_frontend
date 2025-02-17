import React, {useEffect, useRef, useState} from 'react';
import {useDispatch} from 'react-redux';
import clsx from 'clsx';
import {Canvas, Rect, Point, Line} from 'fabric';
import styles from './CanvasBoard.module.scss';
import CanvasTools from '../CanvasTools/CanvasTools';
import {handleObjectMoving, clearGuidelines} from '@/utils/snappingHelper';
import {Guideline} from '@/types/canvas';
import CanvasProperty from '../CanvasProperty/CanvasProperty';
import Sidebar from '../Sidebar/Sidebar';
import {RootState, useAppSelector} from '@/redux/store';
import {canvasManagerActions} from '@/redux/slice/canvasManagerSlice';
import useCanvasPanning from '@/hooks/useCanvasPanning';

const CanvasBoard: React.FC = () => {
  const dispatch = useDispatch();
  const activeCanvas = useAppSelector((state: RootState) =>
    state.canvasManager.canvases.find((canvas) => canvas.active)
  );
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [canvas, setCanvas] = useState<Canvas | null>(null);
  const [isPanning, setIsPanning] = useState(false);
  const [scale, setScale] = useState('1:1');

  const [guidelines, setGuidelines] = useState<Guideline[]>([]);

  const [dimensions, setDimensions] = useState({
    width: window.innerWidth - 250 - 250 - 3,
    height: window.innerHeight - 3,
  });

  useCanvasPanning({canvas, isPanning, setScale});

  // Firstly, grab the user's screen to set canvas width and height
  useEffect(() => {
    const handleResize = () => {
      setDimensions({width: window.innerWidth, height: window.innerHeight});
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  useEffect(() => {
    if (!activeCanvas) {
      console.log('Canvas starting up failed');
      return;
    }

    if (!canvasRef.current) {
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

    initCanvas.on('object:moving', (event: any) => {
      handleObjectMoving(initCanvas, event.target, guidelines, setGuidelines);
    });

    initCanvas.on('object:modified', () => {
      clearGuidelines(initCanvas);
    });

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
      />
      <CanvasProperty canvas={canvas} />
    </div>
  );
};

export default CanvasBoard;
