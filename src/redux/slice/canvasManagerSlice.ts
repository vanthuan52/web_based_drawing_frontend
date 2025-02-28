import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {DEFAULT_INITIAL_CANVAS} from '@/constant/common';
import {MAX_CANVASES} from '@/constant/canvas';

interface CanvasState {
  id: string;
  name: string;
  json: any;
  active: boolean;
}

interface CanvasManagerState {
  canvases: CanvasState[];
}

const initialState: CanvasManagerState = {
  canvases: [DEFAULT_INITIAL_CANVAS],
};

const canvasManagerSlice = createSlice({
  name: 'canvasManager',
  initialState,
  reducers: {
    addCanvas(state) {
      if (state.canvases.length < MAX_CANVASES) {
        const newCanvas: CanvasState = {
          id: `canvas-${state.canvases.length + 1}`,
          name: `Untitled-${state.canvases.length + 1}`,
          json: null,
          active: true,
        };

        state.canvases.forEach((canvas) => (canvas.active = false)); // Disabled previous canvas
        state.canvases.push(newCanvas);
      }
    },
    removeCanvas(state, action: PayloadAction<string>) {
      state.canvases = state.canvases.filter(
        (canvas) => canvas.id !== action.payload
      );
      if (state.canvases.length > 0) {
        state.canvases[state.canvases.length - 1].active = true;
      }
    },
    setActiveCanvas(state, action: PayloadAction<string>) {
      state.canvases.forEach(
        (canvas) => (canvas.active = canvas.id === action.payload)
      );
    },
    saveCanvasState(state, action: PayloadAction<{id: string; json: any}>) {
      const canvas = state.canvases.find((c) => c.id === action.payload.id);
      if (canvas) {
        canvas.json = action.payload.json;
      }
    },
  },
});

export const canvasManagerActions = canvasManagerSlice.actions;
export default canvasManagerSlice.reducer;
