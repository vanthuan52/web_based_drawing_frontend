import {useEffect, useRef, useState} from 'react';
import {Canvas, Line, Polygon} from 'fabric';
import {ApplicationTool} from '@/types/application';
import {useDispatch} from 'react-redux';
import {toolActions} from '@/redux/slice/toolSlice';

interface UseCanvasPolygonProps {
  canvas: Canvas | null;
  activeTool: ApplicationTool;
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
}: UseCanvasPolygonProps) => {
  const dispatch = useDispatch();
  const polygonPoints = useRef<CursorPosition[]>([]);
  const tempLines = useRef<Line[]>([]);
  const previewLine = useRef<Line | null>(null);
  const currentShape = useRef<Polygon | null>(null);

  useEffect(() => {
    if (!canvas) return;

    const startDrawing = (event: any) => {
      if (!canvas || activeTool !== 'polygon') return;
      const pointer = canvas.getPointer(event.e);
      polygonPoints.current.push({x: pointer.x, y: pointer.y});

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

      if (!previewLine.current) {
        previewLine.current = new Line(
          [pointer.x, pointer.y, pointer.x, pointer.y],
          {
            stroke: color,
            strokeWidth: thickness,
            selectable: false,
            evented: false,
          }
        );
        canvas.add(previewLine.current);
      }
    };

    const updatePreviewLine = (event: any) => {
      if (!canvas || activeTool !== 'polygon' || !previewLine.current) return;
      const pointer = canvas.getPointer(event.e);

      if (polygonPoints.current.length > 0) {
        const lastPoint =
          polygonPoints.current[polygonPoints.current.length - 1];
        previewLine.current.set({
          x1: lastPoint.x,
          y1: lastPoint.y,
          x2: pointer.x,
          y2: pointer.y,
        });
        canvas.renderAll();
      }
    };

    const handleDoubleClick = () => {
      if (activeTool !== 'polygon' || polygonPoints.current.length < 3) return;

      tempLines.current.forEach((line) => canvas.remove(line));
      tempLines.current = [];

      if (previewLine.current) {
        canvas.remove(previewLine.current);
        previewLine.current = null;
      }

      const polygon = new Polygon(polygonPoints.current, {
        fill: 'transparent',
        stroke: color,
        strokeWidth: thickness,
        selectable: true,
        evented: true,
      });

      canvas.add(polygon);
      canvas.renderAll();

      polygonPoints.current = [];
      currentShape.current = polygon;
      dispatch(toolActions.resetActiveTool());
    };

    canvas.on('mouse:down', startDrawing);
    canvas.on('mouse:move', updatePreviewLine);
    canvas.on('mouse:dblclick', handleDoubleClick);

    return () => {
      canvas.off('mouse:down', startDrawing);
      canvas.off('mouse:move', updatePreviewLine);
      canvas.off('mouse:dblclick', handleDoubleClick);
    };
  }, [canvas, activeTool, color, thickness]);

  return null;
};

export default useCanvasPolygon;
