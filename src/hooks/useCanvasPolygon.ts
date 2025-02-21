import {useEffect, useRef, useState} from 'react';
import {Canvas, Line, Polygon} from 'fabric';
import {CanvasTool} from '@/types/canvas';
import {useDispatch} from 'react-redux';
import {canvasActions} from '@/redux/slice/canvasSlice';

interface UseCanvasDrawingProps {
  canvas: Canvas | null;
  activeTool: CanvasTool;
  color?: string;
  thickness?: number;
}

type CursorPosition = {
  x: number;
  y: number;
};

const useCanvasPolygon = ({
  canvas,
  activeTool,
  color = '#000000',
  thickness = 2,
}: UseCanvasDrawingProps) => {
  const dispatch = useDispatch();
  const polygonPoints = useRef<CursorPosition[]>([]);
  const tempLines = useRef<Line[]>([]);
  const currentShape = useRef<Polygon | null>(null);

  useEffect(() => {
    if (!canvas) return;

    const startDrawing = (event: any) => {
      if (!canvas || activeTool !== 'polygon') return;

      const pointer = canvas.getPointer(event.e);
      polygonPoints.current.push({x: pointer.x, y: pointer.y});

      // If there are at least two points, make a line between them
      if (polygonPoints.current.length > 1) {
        const lastPoint =
          polygonPoints.current[polygonPoints.current.length - 2];
        const newLine = new Line(
          [lastPoint.x, lastPoint.y, pointer.x, pointer.y],
          {
            stroke: color,
            strokeWidth: thickness,
            selectable: false,
            evented: false,
          }
        );

        canvas.add(newLine);
        tempLines.current.push(newLine);
      }
    };

    const handleDoubleClick = () => {
      if (activeTool !== 'polygon' || polygonPoints.current.length < 3) return;

      tempLines.current.forEach((line) => canvas.remove(line));
      tempLines.current = [];

      const polygon = new Polygon(polygonPoints.current, {
        fill: '#dddddd',
        stroke: color,
        strokeWidth: thickness,
        selectable: true,
        evented: true,
      });

      canvas.add(polygon);
      canvas.renderAll();

      polygonPoints.current = [];
      currentShape.current = polygon;

      dispatch(canvasActions.resetActiveTool());
    };

    canvas.on('mouse:down', startDrawing);
    canvas.on('mouse:dblclick', handleDoubleClick);

    return () => {
      canvas.off('mouse:down', startDrawing);
      canvas.off('mouse:dblclick', handleDoubleClick);
    };
  }, [canvas, activeTool, color, thickness]);

  return null;
};

export default useCanvasPolygon;
