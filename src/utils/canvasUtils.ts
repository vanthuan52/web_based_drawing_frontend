import {ADDITIONAL_OBJECT_PROPERTIES} from '@/constant/canvas';
import {CustomFabricObject, PlainFabricObject} from '@/types/canvas';
import {Canvas, FabricObject} from 'fabric';

export const exportToDXF = (canvas: Canvas) => {
  return 'DXF-DATA';
};

export const convertFabricObjectToPlainObject = (
  obj: CustomFabricObject | FabricObject
): PlainFabricObject => {
  return obj.toObject(Object.keys(ADDITIONAL_OBJECT_PROPERTIES));
};
