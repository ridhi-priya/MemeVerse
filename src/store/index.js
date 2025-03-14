import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import themeReducer from './themeSlice';
import memesReducer from './memesSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    memes: memesReducer,
  },
});

setupListeners(store.dispatch);
