import {useEffect, useRef, useState} from 'react';
import {
  Canvas,
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
import {CustomFabricObject} from '@/types/canvas';

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
  const currentShape = useRef<CustomFabricObject | null>(null);
  const snapThreshold = 10; // Snap threshold for aligning lines

  const allowedActions: ApplicationTool[] = [
    'line',
    'rect',
    'circle',
    'ellipse',
  ];
  useEffect(() => {
    if (!canvas) return;

    const startDrawing = (event: any) => {
      if (!canvas) return;
      if (!allowedActions.includes(activeTool)) return;

      const pointer = canvas.getPointer(event.e);
      setStartPoint({x: pointer.x, y: pointer.y});

      switch (activeTool) {
        case 'line': {
          currentShape.current = new Line(
            [pointer.x, pointer.y, pointer.x, pointer.y],
            {
              stroke: color,
              strokeWidth: thickness,
              selectable: true,
              evented: true,
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
      if (!canvas || !currentShape.current || !startPoint) return;
      if (!allowedActions.includes(activeTool)) return;

      const pointer = canvas.getPointer(event.e);
      let newX = pointer.x;
      let newY = pointer.y;

      switch (activeTool) {
        case 'line': {
          // apply snap-to-grid logic for lines
          if (Math.abs(pointer.x - startPoint.x) < snapThreshold) {
            newX = startPoint.x;
          }
          if (Math.abs(pointer.y - startPoint.y) < snapThreshold) {
            newY = startPoint.y;
          }
          const line = currentShape.current as Line;
          line.set({x2: newX, y2: newY});
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
        default: {
          break;
        }
      }

      canvas.renderAll();
    };

    const stopDrawing = () => {
      if (!canvas) return;
      if (!allowedActions.includes(activeTool)) return;

      if (currentShape.current && activeTool === 'line') {
        currentShape.current.set({selectable: true});
      }

      currentShape.current = null;
      dispatch(toolActions.resetActiveTool());
      setStartPoint(null);
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
