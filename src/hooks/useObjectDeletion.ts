import {useEffect} from 'react';
import {Canvas} from 'fabric';
import {CustomFabricObject} from '@/types/canvas';
import {useAppDispatch} from '@/redux/store';
import {canvasActions} from '@/redux/slice/canvasSlice';

interface UseObjectDeletion {
  canvas: Canvas | null;
}
const useObjectDeletion = ({canvas}: UseObjectDeletion) => {
  const useDispatch = useAppDispatch();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Delete') {
        if (!canvas) return;

        const activeObjects: CustomFabricObject[] = canvas.getActiveObjects();
        const objectIds: string[] = [];
        if (activeObjects.length > 0) {
          for (let i = 0; i < activeObjects.length; i++) {
            objectIds.push(activeObjects[i].get('id'));
            canvas.remove(activeObjects[i]);
          }
          useDispatch(canvasActions.removeObjectsFromLayers(objectIds));
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
