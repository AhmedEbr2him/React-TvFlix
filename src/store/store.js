import { configureStore } from '@reduxjs/toolkit';
import movieSlice from './index';

export const store = configureStore({
  reducer: {
    movieReducer: movieSlice,
  },
});
