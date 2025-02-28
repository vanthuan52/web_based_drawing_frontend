import {useEffect, useRef, useState} from 'react';
import {Canvas} from 'fabric';
import {CustomFabricObject} from '@/types/canvas';

interface UseCanvasHistoryProps {
  canvas: Canvas | null;
}

const useCanvasHistory = ({canvas}: UseCanvasHistoryProps) => {
  const history = useRef<string[]>([]);
  const future = useRef<string[]>([]);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  useEffect(() => {
    if (!canvas) return;

    const saveState = () => {
      history.current.push(JSON.stringify(canvas.toJSON()));

      future.current = [];
      updateButtons();
    };

    canvas.on('object:added', saveState);
    canvas.on('object:modified', saveState);
    canvas.on('object:removed', saveState);

    return () => {
      canvas.off('object:added', saveState);
      canvas.off('object:modified', saveState);
      canvas.off('object:removed', saveState);
    };
  }, [canvas]);

  const updateButtons = () => {
    setCanUndo(history.current.length > 1);
    setCanRedo(future.current.length > 0);
  };

  const undo = () => {
    if (!canvas || history.current.length <= 1) return;

    // push current state to future
    future.current.push(history.current.pop()!);
    const previousState = history.current[history.current.length - 1];

    if (previousState) {
      canvas.clear();
      canvas.loadFromJSON(previousState, () => {
        canvas.renderAll();
      });
    }
    updateButtons();
  };

  const redo = () => {
    if (!canvas || future.current.length === 0) return;

    history.current.push(future.current.pop()!);
    const nextState = history.current[history.current.length - 1];

    if (nextState) {
      canvas.clear();
      canvas.loadFromJSON(nextState, () => {
        canvas.renderAll();
      });
    }

    updateButtons();
  };

  return {undo, redo, canUndo, canRedo};
};

export default useCanvasHistory;
