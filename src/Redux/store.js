import { configureStore } from '@reduxjs/toolkit';
import filterSlice from './slices/filterSlice';
import cart from './slices/cartSlice';

export const store = configureStore({
  reducer: { filterSlice, cart },
});
