import { configureStore, createSlice } from '@reduxjs/toolkit';

const canvasSlice = createSlice({
    name: 'canvas',
    initialState: {
      shapes: []
    },
    reducers: {
      addShape: (state, action) => {
        state.shapes.push(action.payload);
      },
      updateShape: (state, action) => {
        const { id, newAttrs } = action.payload;
        const shape = state.shapes.find(shape => shape.id === id);
        if (shape) Object.assign(shape, newAttrs);
      },
      setShapes: (state, action) => {
        state.shapes = action.payload;
      }
    }
});
  
export const { addShape, updateShape, setShapes } = canvasSlice.actions;
export default canvasSlice.reducer;