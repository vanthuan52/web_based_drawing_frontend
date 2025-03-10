import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {PlainFabricObject} from '@/types/canvas';

interface CanvasState {
  zoomingRatio: string;
  layers: PlainFabricObject[];
}

const initialState: CanvasState = {
  zoomingRatio: '100',
  layers: [],
};

const canvasSlice = createSlice({
  name: 'canvas',
  initialState,
  reducers: {
    setZoomingRatio: (state, action: PayloadAction<string>) => {
      state.zoomingRatio = action.payload;
    },
    resetZoomingRatio: (state) => {
      state.zoomingRatio = '100';
    },
    addObjectToLayers: (state, action: PayloadAction<PlainFabricObject>) => {
      state.layers.push(action.payload);
    },
    updateObjectOfLayers: (
      state,
      action: PayloadAction<{
        objectId: string;
        objectToUpdate: Partial<PlainFabricObject>;
      }>
    ) => {
      const {objectId, objectToUpdate} = action.payload;
      const index = state.layers.findIndex(
        (obj: PlainFabricObject) => obj.id === objectId
      );

      if (index !== -1) {
        state.layers[index] = {...state.layers[index], ...objectToUpdate};
      }
    },
    removeObjectsFromLayers: (state, action: PayloadAction<string[]>) => {
      const objectIds = action.payload;
      state.layers = state.layers.filter(
        (obj: PlainFabricObject) => !objectIds.includes(obj.id ?? '')
      );
    },
    removeObjectFromLayers: (state, action: PayloadAction<string>) => {
      const objectId = action.payload;
      state.layers = state.layers.filter(
        (obj: PlainFabricObject) => (obj.id ?? '') !== objectId
      );
    },
    resetLayers: (state) => {
      state.layers = [];
    },
  },
});

export const canvasActions = canvasSlice.actions;
export default canvasSlice.reducer;
