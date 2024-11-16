// drawingsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const drawingsSlice = createSlice({
  name: 'drawings',
  initialState: {
    drawings: [], // Array of drawing objects
    loading: false,
    error: null,
  },
  reducers: {
    addDrawing: (state, action) => {
      state.drawings.push(action.payload);
    },
    setDrawings: (state, action) => {
        state.drawings=action.payload;
    },
    updateDrawing: (state, action) => {
      const { id, updatedDrawing } = action.payload;
      const drawingIndex = state.drawings.findIndex(drawing => drawing.id === id);
      if (drawingIndex !== -1) {
        state.drawings[drawingIndex] = { ...state.drawings[drawingIndex], ...updatedDrawing };
      }
    },
    deleteDrawing: (state, action) => {
      state.drawings = state.drawings.filter(drawing => drawing.id !== action.payload.id);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

// Export actions and reducer
export const { addDrawing, setDrawings, updateDrawing, deleteDrawing, setLoading, setError } = drawingsSlice.actions;
export default drawingsSlice.reducer;
