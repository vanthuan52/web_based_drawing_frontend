import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ApplicationTool} from '@/types/application';
interface ToolState {
  activeTool: ApplicationTool;
}

const initialState: ToolState = {
  activeTool: 'select',
};

const toolSlice = createSlice({
  name: 'tool',
  initialState,
  reducers: {
    setActiveTool: (state, action: PayloadAction<ApplicationTool>) => {
      state.activeTool = action.payload;
    },
    resetActiveTool: (state) => {
      state.activeTool = 'select';
    },
  },
});

export const toolActions = toolSlice.actions;
export default toolSlice.reducer;
