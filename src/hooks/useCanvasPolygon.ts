import {useEffect, useRef, useState} from 'react';
import {Canvas, Line, Polygon} from 'fabric';
import {ApplicationTool} from '@/types/application';
import {useDispatch} from 'react-redux';
import {toolActions} from '@/redux/slice/toolSlice';
import {CustomFabricObject} from '@/types/canvas';

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

      let newX = pointer.x;
      let newY = pointer.y;

      if (polygonPoints.current.length > 0) {
        const lastPoint =
          polygonPoints.current[polygonPoints.current.length - 1];
        const snapThreshold = 10; // Threshold for detecting alignment

        // adjust the click position according to the assigned direction
        if (Math.abs(pointer.x - lastPoint.x) < snapThreshold) {
          newX = lastPoint.x; // Keep X unchanged if close to the vertical axis
        }
        if (Math.abs(pointer.y - lastPoint.y) < snapThreshold) {
          newY = lastPoint.y; // Kep Y unchanged if close to the horizontal axis
        }
      }

      // Add the adjusted point
      polygonPoints.current.push({x: newX, y: newY});

      if (polygonPoints.current.length > 1) {
        const lastPoint =
          polygonPoints.current[polygonPoints.current.length - 2];
        const newLine = new Line([lastPoint.x, lastPoint.y, newX, newY], {
          stroke: color,
          strokeWidth: thickness,
          selectable: false,
          evented: false,
        });
        (newLine as CustomFabricObject).isGuideline = true;
        canvas.add(newLine);
        tempLines.current.push(newLine);
      }

      // Initialize previewLine if it doesn't exist
      if (!previewLine.current) {
        previewLine.current = new Line([newX, newY, newX, newY], {
          stroke: color,
          strokeWidth: thickness,
          selectable: false,
          evented: false,
        });
        (previewLine.current as CustomFabricObject).isGuideline = true;
        canvas.add(previewLine.current);
      }
    };

    const updatePreviewLine = (event: any) => {
      if (!canvas || activeTool !== 'polygon' || !previewLine.current) return;
      const pointer = canvas.getPointer(event.e);

      if (polygonPoints.current.length > 0) {
        const lastPoint =
          polygonPoints.current[polygonPoints.current.length - 1];

        // Threshold for detecting alignment (if moving along an axis)
        const snapThreshold = 10;

        let newX = pointer.x;
        let newY = pointer.y;

        // Check if close to the horizontal (x) or vertical (y) axis
        if (Math.abs(pointer.x - lastPoint.x) < snapThreshold) {
          newX = lastPoint.x;
        }
        if (Math.abs(pointer.y - lastPoint.y) < snapThreshold) {
          newY = lastPoint.y;
        }

        previewLine.current.set({
          x1: lastPoint.x,
          y1: lastPoint.y,
          x2: newX,
          y2: newY,
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
