// frontend/store/store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // Import auth reducer
import canvasReducer from './canvasSlice'; // Import auth reducer
import drawingsReducer from './drawingsSlice'; // Import auth reducer

export const store = configureStore({
  reducer: {
    auth: authReducer,
    canvas: canvasReducer,
    drawings: drawingsReducer
  }
});
