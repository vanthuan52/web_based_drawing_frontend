import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Canvas} from 'fabric';
import {FabricObjectProperty} from '@/types/canvas';
import {CanvasTool} from '@/types/canvas';

export const DRAWING_ACTION = {
  DRAW_RECTANGLE: 'DRAW_RECTANGLE',
  DRAW_CIRCLE: 'DRAW_CIRCLE',
  CLEAR: 'CLEAR',
};

export type DrawingAction = 'DRAW_RECTANGLE' | 'DRAW_CIRCLE' | 'CLEAR' | null;

export const defaultObjectProperty = {
  type: '',
  left: 0, // x coordinate
  top: 0, // x coordinate
  width: 0,
  height: 0,
  diameter: 0,
  color: '',
};

interface CanvasStoredInstance {
  // key is canvasId, value is canvas json data
  [id: string]: string | null;
}

interface CanvasState {
  action: DrawingAction;
  activeTool: CanvasTool;
  objectProperty: FabricObjectProperty;
}

const initialState: CanvasState = {
  action: null,
  activeTool: 'select',
  objectProperty: defaultObjectProperty,
};

const canvasSlice = createSlice({
  name: 'canvas',
  initialState,
  reducers: {
    setActiveTool: (state, action: PayloadAction<CanvasTool>) => {
      state.activeTool = action.payload;
    },
    resetActiveTool: (state) => {
      state.activeTool = 'select';
    },
    drawRectangle: (state) => {
      state.action = 'DRAW_RECTANGLE';
    },
    drawCircle: (state) => {
      state.action = 'DRAW_CIRCLE';
    },
    resetAction: (state) => {
      state.action = null;
    },
    setObjectProperty: (state, action: PayloadAction<FabricObjectProperty>) => {
      state.objectProperty = action.payload;
    },
    resetObjectProperty: (state) => {
      state.objectProperty = defaultObjectProperty;
    },
  },
});

export const canvasActions = canvasSlice.actions;
export default canvasSlice.reducer;
