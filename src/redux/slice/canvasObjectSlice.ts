import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {FabricObject} from 'fabric';
import {
  FabricObjectType,
  UpdateObjectPorperty,
  ObjectProperty,
} from '@/types/canvas';
import {DEFAULT_OBJECT_COLOR} from '@/constant/string';

interface CanvasObjectState extends ObjectProperty {
  selectedObject: FabricObject | null;
  isLoading: boolean;
  type: FabricObjectType | null;
}

const initialState: CanvasObjectState = {
  selectedObject: null,
  isLoading: false,
  type: null,
  left: '0',
  top: '0',
  width: '0',
  height: '0',
  diameter: '0',
  color: DEFAULT_OBJECT_COLOR,
  strokeColor: DEFAULT_OBJECT_COLOR,
  strokeWidth: '1',
  opacity: '100',
  scaleX: '1',
  scaleY: '1',
  radius: '1',
  textAlign: 'left',
  fontFamily: 'Inter',
  fontSize: '24',
  fontWeight: 'normal',
  fontStyle: 'normal',
  originX: 'left',
  originY: 'top',
};

const canvasObjectSlice = createSlice({
  name: 'canvasObject',
  initialState,
  reducers: {
    setSelectedObject: (state, action: PayloadAction<FabricObject | null>) => {
      // remove all getter, setter, method of fabric class
      state.selectedObject = JSON.parse(JSON.stringify(action.payload));
    },
    resetSelectedObject: (state) => {
      state.selectedObject = null;
    },
    updateObjectProperty: (
      state,
      action: PayloadAction<UpdateObjectPorperty>
    ) => {
      const property = action.payload;
      return {...state, [property.key]: property.value};
    },
    updateObjectProperties: (state, action: PayloadAction<ObjectProperty>) => {
      const properties = action.payload;
      return {...state, ...properties};
    },
    resetProperty: (state) => {
      return {
        ...state,
        left: '0',
        top: '0',
        width: '0',
        height: '0',
        diameter: '0',
        color: DEFAULT_OBJECT_COLOR,
        strokeColor: DEFAULT_OBJECT_COLOR,
        strokeWidth: '1',
        opacity: '100',
        scaleX: '1',
        scaleY: '1',
        radius: '1',
        textAlign: 'left',
        fontFamily: 'Inter',
        fontSize: '24',
        fontWeight: 'normal',
        fontStyle: 'normal',
        originX: 'left',
        originY: 'top',
      };
    },
  },
});

export const canvasObjectActions = canvasObjectSlice.actions;
export default canvasObjectSlice.reducer;
