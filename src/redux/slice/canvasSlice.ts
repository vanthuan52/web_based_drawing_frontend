import {FabricObjectProperty} from '@/types/canvas';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Canvas} from 'fabric';

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
  canvases: CanvasStoredInstance;
  activeCanvasId: String | null;
  canvasInstance: Canvas | null;
  action: DrawingAction;
  objectProperty: FabricObjectProperty;
}

const initialState: CanvasState = {
  canvases: {},
  activeCanvasId: null,
  canvasInstance: null,
  action: null,
  objectProperty: defaultObjectProperty,
};

const canvasSlice = createSlice({
  name: 'canvas',
  initialState,
  reducers: {
    createCanvas: (state, action) => {
      const {id, data} = action.payload;
      state.canvases[id] = data;
      state.activeCanvasId = id;
    },
    switchCanvas: (state, action) => {
      state.activeCanvasId = action.payload;
    },
    updateCanvas: (state, action) => {
      const {id, data} = action.payload;
      if (state.canvases[id]) {
        state.canvases[id] = data;
      }
    },
    clearCanvas: (state, action) => {
      const {id} = action.payload;
      state.canvases[id] = null;
    },
    saveCanvas: (state, action) => {
      const {id, data} = action.payload;
      state.canvases[id] = data;
    },
    deleteCanvas: (state, action) => {
      delete state.canvases[action.payload];
      if (state.activeCanvasId === action.payload) {
        state.activeCanvasId = Object.keys(state.canvases)[0] || null;
      }
    },
    setCanvasInstance: (state, action: PayloadAction<Canvas>) => {
      Object.assign(state, {canvasInstance: action.payload});
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
