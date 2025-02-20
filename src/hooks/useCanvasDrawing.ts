import {useEffect, useRef, useState} from 'react';
import {
  Canvas,
  FabricObject,
  Rect,
  Line,
  Point,
  Ellipse,
  Polygon,
  PencilBrush,
} from 'fabric';
import {CanvasObjectType} from '@/types/canvas';

interface UseCanvasDrawingProps {
  canvas: Canvas | null;
  tool: CanvasObjectType;
  isDrawing: boolean;
  setIsDrawing: any;
  color?: string;
  thickness?: number;
}

const useCanvasDrawing = ({
  canvas,
  tool,
  isDrawing,
  setIsDrawing,
  color = '#000000',
  thickness = 2,
}: UseCanvasDrawingProps) => {
  const polygonPoints = useRef<Point[]>([]);
  const currentShape = useRef<FabricObject | PencilBrush | null>(null);

  useEffect(() => {
    if (!canvas || !isDrawing) return;

    const startDrawing = (event: any) => {
      if (!canvas) return;
      console.log('start drawing');
      const pointer = canvas.getPointer(event.e);
      switch (tool) {
        case 'pencil':
          canvas.isDrawingMode = true;
          currentShape.current = new PencilBrush(canvas);
          canvas.freeDrawingBrush = currentShape.current;

          // @ts-ignore
          canvas.freeDrawingBrush.color = color;
          // @ts-ignore
          canvas.freeDrawingBrush.width = thickness;
          break;

        case 'rect':
          currentShape.current = new Rect({
            left: pointer.x,
            top: pointer.y,
            width: 0,
            height: 0,
            fill: 'transparent',
            stroke: color,
            strokeWidth: thickness,
          });
          canvas.add(currentShape.current);
          break;

        case 'line':
          currentShape.current = new Line(
            [pointer.x, pointer.y, pointer.x, pointer.y],
            {
              stroke: color,
              strokeWidth: thickness,
              selectable: false,
            }
          );
          canvas.add(currentShape.current);
          break;

        case 'ellipse':
          currentShape.current = new Ellipse({
            left: pointer.x,
            top: pointer.y,
            rx: 0,
            ry: 0,
            fill: 'transparent',
            stroke: color,
            strokeWidth: thickness,
          });
          canvas.add(currentShape.current);
          break;

        case 'polygon':
          if (!isDrawing) {
            polygonPoints.current = [new Point(pointer.x, pointer.y)];
          } else {
            polygonPoints.current.push(new Point(pointer.x, pointer.y));
            if (polygonPoints.current.length > 2) {
              const polygon = new Polygon(polygonPoints.current, {
                fill: 'transparent',
                stroke: color,
                strokeWidth: thickness,
              });
              canvas.add(polygon);
              polygonPoints.current = [];
              setIsDrawing(false);
            }
          }
          break;
        default:
          break;
      }
    };

    const drawing = (event: any) => {
      if (!isDrawing || !canvas || !currentShape.current) return;

      console.log('drawing...');
      const pointer = canvas.getPointer(event.e);
      switch (tool) {
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
      console.log('stop drawing');
      if (tool !== 'polygon') {
        currentShape.current = null;
      }
      if (tool !== 'pencil') {
        canvas.isDrawingMode = false;
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
  }, [canvas, tool, isDrawing, color, thickness]);
};

export default useCanvasDrawing;
