import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzasStatus = createAsyncThunk('pizza/fetchPizzasStatus', async (params) => {
  const { currentPage, changeSort, categoryId } = params;
  const { data } = await axios.get(
    `https://639886ca044fa481d6a0dbc0.mockapi.io/pizza?page=${currentPage}&limit=4&${
      categoryId > 0 ? `category=${categoryId}` : ''
    }&sortBy=${changeSort.sortProperty.replace('-', '')}&order=${
      changeSort.sortProperty.includes('-') ? 'ask' : 'desc'
    }`,
  );
  return data;
});

const initialState = {
  items: [],
  status: 'loading',
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzasStatus.pending]: (state) => {
      state.status = 'loading';
      state.items = [];
    },
    [fetchPizzasStatus.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    },
    [fetchPizzasStatus.rejected]: (state, action) => {
      state.status = 'error';
      state.items = [];
    },
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
