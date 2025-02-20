import {useState, useEffect} from 'react';
import {Canvas, PencilBrush} from 'fabric';

interface UseCanvasFreeDrawingProps {
  canvas: Canvas | null;
  isDrawing: boolean;
}
const useCanvasFreeDrawing = ({
  canvas,
  isDrawing,
}: UseCanvasFreeDrawingProps) => {
  useEffect(() => {
    if (!canvas) return;
    if (isDrawing) {
      canvas.isDrawingMode = true;
      canvas.freeDrawingBrush = new PencilBrush(canvas);
      canvas.freeDrawingBrush.color = '#000000';
      canvas.freeDrawingBrush.width = 2;
    } else {
      canvas.isDrawingMode = false;
    }

    canvas.renderAll();
  }, [canvas, isDrawing]);
};

export default useCanvasFreeDrawing;
