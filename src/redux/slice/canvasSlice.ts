import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CanvasTool} from '@/types/canvas';
interface CanvasState {
  activeTool: CanvasTool;
}

const initialState: CanvasState = {
  activeTool: 'select',
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
  },
});

export const canvasActions = canvasSlice.actions;
export default canvasSlice.reducer;
