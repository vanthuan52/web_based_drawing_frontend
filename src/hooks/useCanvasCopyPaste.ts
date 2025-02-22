import {useEffect, useState} from 'react';
import {ActiveSelection, Canvas, FabricObject, Group} from 'fabric';

interface UseCanvasCopyPaste {
  canvas: Canvas | null;
}
const useCanvasCopyPaste = ({canvas}: UseCanvasCopyPaste) => {
  const [clipboard, setClipboard] = useState<FabricObject | null>(null);

  /**
   * Copies the selected object(s) from the canvas
   */
  const copy = async () => {
    if (!canvas) return;
    const activeObject = canvas.getActiveObject();
    if (!activeObject) return;

    // Clone object hoặc selection
    const cloned = await activeObject.clone();
    setClipboard(cloned);
  };

  /**
   * Pastes the copied object(s) onto the canvas with an offset
   */
  const paste = async () => {
    if (!canvas || !clipboard) return;

    const clonedObj = await clipboard.clone();

    canvas.discardActiveObject();
    clonedObj.set({
      left: (clonedObj.left ?? 0) + 10,
      top: (clonedObj.top ?? 0) + 10,
      evented: true,
    });

    if (clonedObj instanceof ActiveSelection) {
      clonedObj.canvas = canvas;
      clonedObj.forEachObject((obj) => canvas.add(obj));
      clonedObj.setCoords();
    } else {
      canvas.add(clonedObj);
    }

    setClipboard(clonedObj);
    canvas.setActiveObject(clonedObj);
    canvas.requestRenderAll();
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey) {
        if (event.key === 'c') {
          event.preventDefault();
          copy();
        }
        if (event.key === 'v') {
          event.preventDefault();
          paste();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [canvas, clipboard]);

  return {copy, paste};
};

export default useCanvasCopyPaste;
