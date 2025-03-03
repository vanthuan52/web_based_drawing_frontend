import {useEffect} from 'react';
import {v4 as uuidv4} from 'uuid';
import {Canvas} from 'fabric';
import {canvasActions} from '@/redux/slice/canvasSlice';
import {useAppDispatch} from '@/redux/store';
import {CustomFabricObject} from '@/types/canvas';
import {convertFabricObjectToPlainObject} from '@/utils/canvasUtils';

interface UseRegisterFabricObjectsProps {
  canvas: Canvas | null;
}
/**
 * automatically assigns default properties (id, name, and status) to newly added objects on a Fabric.js canvas
 */
const useRegisterFabricObjects = ({canvas}: UseRegisterFabricObjectsProps) => {
  const useDispatch = useAppDispatch();
  useEffect(() => {
    if (!canvas) return;

    const handleObjectAdded = (event: any) => {
      const obj = event.target as CustomFabricObject;
      if (!obj || obj.isGuideline) return;

      if (!obj.get('id')) obj.set({id: `${uuidv4()}`});
      if (!obj.get('name')) obj.set({name: obj.type});
      if (!obj.get('status')) obj.set({status: true});

      useDispatch(
        canvasActions.addObjectToLayers(convertFabricObjectToPlainObject(obj))
      );
    };

    canvas.on('object:added', handleObjectAdded);

    return () => {
      canvas.off('object:added', handleObjectAdded);
    };
  }, [canvas]);
};

export default useRegisterFabricObjects;
