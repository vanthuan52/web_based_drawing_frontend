import {useEffect} from 'react';
import {Canvas} from 'fabric';

interface UseObjectDeletion {
  canvas: Canvas | null;
}
const useObjectDeletion = ({canvas}: UseObjectDeletion) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Delete') {
        if (!canvas) return;

        const activeObjects = canvas.getActiveObjects();
        if (activeObjects.length > 0) {
          for (let i = 0; i < activeObjects.length; i++) {
            canvas.remove(activeObjects[i]);
          }
          canvas.discardActiveObject();
          canvas.renderAll();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [canvas]);

  return null;
};

export default useObjectDeletion;
