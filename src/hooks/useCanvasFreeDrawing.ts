import {useEffect} from 'react';
import {Canvas, PencilBrush} from 'fabric';
import {ApplicationTool} from '@/types/application';

interface UseCanvasFreeDrawingProps {
  canvas: Canvas | null;
  activeTool: ApplicationTool;
}
const useCanvasFreeDrawing = ({
  canvas,
  activeTool,
}: UseCanvasFreeDrawingProps) => {
  useEffect(() => {
    if (!canvas) return;
    if (activeTool === 'pencil') {
      canvas.isDrawingMode = true;
      canvas.freeDrawingBrush = new PencilBrush(canvas);
      canvas.freeDrawingBrush.color = '#000000';
      canvas.freeDrawingBrush.width = 2;
    } else {
      canvas.isDrawingMode = false;
    }

    canvas.renderAll();
  }, [canvas, activeTool]);
};

export default useCanvasFreeDrawing;
