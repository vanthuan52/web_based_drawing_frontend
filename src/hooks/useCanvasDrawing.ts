import {useEffect, useRef, useState} from 'react';
import {
  Canvas,
  FabricObject,
  Rect,
  Line,
  Point,
  Polyline,
  Path,
  Ellipse,
  Circle,
  Polygon,
} from 'fabric';
import {ApplicationTool} from '@/types/application';
import {useDispatch} from 'react-redux';
import {toolActions} from '@/redux/slice/toolSlice';

interface UseCanvasDrawingProps {
  canvas: Canvas | null;
  activeTool: ApplicationTool;
  color?: string;
  thickness?: number;
}

type CursorPosition = {
  x: number;
  y: number;
};

const useCanvasDrawing = ({
  canvas,
  activeTool,
  color = '#000000',
  thickness = 2,
}: UseCanvasDrawingProps) => {
  const dispatch = useDispatch();
  const [startPoint, setStartPoint] = useState<CursorPosition | null>(null);
  const currentShape = useRef<FabricObject | null>(null);

  useEffect(() => {
    if (!canvas) return;
    const startDrawing = (event: any) => {
      if (!canvas) return;
      if (
        activeTool !== 'line' &&
        activeTool !== 'rect' &&
        activeTool !== 'circle' &&
        activeTool !== 'ellipse'
      ) {
        return;
      }

      const pointer = canvas.getPointer(event.e);

      switch (activeTool) {
        case 'line': {
          currentShape.current = new Line(
            [pointer.x, pointer.y, pointer.x, pointer.y],
            {
              stroke: color,
              strokeWidth: thickness,
            }
          );
          canvas.add(currentShape.current);
          break;
        }
        case 'rect': {
          currentShape.current = new Rect({
            left: pointer.x,
            top: pointer.y,
            width: 0,
            height: 0,
            fill: '#ddd',
            stroke: color,
            strokeWidth: thickness,
          });
          canvas.add(currentShape.current);
          break;
        }

        case 'ellipse': {
          currentShape.current = new Ellipse({
            left: pointer.x,
            top: pointer.y,
            rx: 0,
            ry: 0,
            fill: '#ddd',
            stroke: color,
            strokeWidth: thickness,
          });
          canvas.add(currentShape.current);
          break;
        }

        case 'circle': {
          setStartPoint({x: pointer.x, y: pointer.y});
          currentShape.current = new Circle({
            left: pointer.x,
            top: pointer.y,
            radius: 0,
            fill: '#ddd',
            stroke: color,
            strokeWidth: thickness,
          });
          canvas.add(currentShape.current);
          break;
        }
        default: {
          break;
        }
      }
    };

    const drawing = (event: any) => {
      if (!canvas || !currentShape.current) return;

      const pointer = canvas.getPointer(event.e);
      switch (activeTool) {
        case 'line': {
          const line = currentShape.current as Line;
          line.set({x2: pointer.x, y2: pointer.y});
          break;
        }
        case 'rect': {
          const rect = currentShape.current as Rect;
          rect.set({
            width: pointer.x - rect.left!,
            height: pointer.y - rect.top!,
          });
          break;
        }

        case 'circle': {
          if (!startPoint || !currentShape.current) return;

          if (pointer) {
            const radius = Math.sqrt(
              Math.pow(pointer.x - startPoint.x, 2) +
                Math.pow(pointer.y - startPoint.y, 2)
            );
            currentShape.current.set({radius});
          }
          break;
        }

        case 'ellipse': {
          const ellipse = currentShape.current as Ellipse;
          ellipse.set({
            rx: Math.abs(pointer.x - ellipse.left!) / 2,
            ry: Math.abs(pointer.y - ellipse.top!) / 2,
          });
          break;
        }
      }

      canvas.renderAll();
    };

    const stopDrawing = () => {
      if (!canvas) return;

      if (currentShape.current && activeTool === 'line') {
        //currentShape.current.set({selectable: true});
        currentShape.current = null;
        dispatch(toolActions.resetActiveTool());
      }
      if (activeTool !== 'pencil') {
        canvas.isDrawingMode = false;
      }

      if (activeTool === 'circle') {
        currentShape.current = null;
        dispatch(toolActions.resetActiveTool());
        setStartPoint(null);
      }

      if (activeTool === 'ellipse') {
        currentShape.current = null;
        dispatch(toolActions.resetActiveTool());
      }
      if (activeTool === 'rect') {
        currentShape.current = null;
        dispatch(toolActions.resetActiveTool());
      }
    };

    canvas.on('mouse:down', startDrawing);
    canvas.on('mouse:move', drawing);
    canvas.on('mouse:up', stopDrawing);

    return () => {
      canvas.off('mouse:down', startDrawing);
      canvas.off('mouse:move', drawing);
      canvas.off('mouse:up', stopDrawing);
    };
  }, [canvas, activeTool, startPoint]);
};

export default useCanvasDrawing;
