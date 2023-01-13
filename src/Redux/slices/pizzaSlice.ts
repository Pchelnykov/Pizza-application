import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import axios from 'axios';

type PizzaItem = {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  sizes: number[];
  types: number[];
  rating: number;
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface PizzaSliceState {
  items: PizzaItem[];
  status: Status;
}

type fetchPizzaArgs = {
  categoryId: number;
  sortProperty: string;
  currentPage: number;
  order: string;
  sortBy: string;
};

export const fetchPizzasStatus = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async (params: fetchPizzaArgs) => {
    const { currentPage, order, categoryId, sortBy } = params;
    const { data } = await axios.get<PizzaItem[]>(
      `https://639886ca044fa481d6a0dbc0.mockapi.io/pizza?page=${currentPage}&limit=4&${
        categoryId > 0 ? `category=${categoryId}` : ''
      }&sortBy=${sortBy}&order=${order}`,
    );
    return data as PizzaItem[];
  },
);

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING,
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<PizzaItem[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzasStatus.pending, (state, action) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchPizzasStatus.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.items = action.payload;
    });
    builder.addCase(fetchPizzasStatus.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },

  // extraReducers: {
  // [fetchPizzasStatus.pending]: (state) => {
  //   state.status = 'loading';
  //   state.items = [];
  // },
  // [fetchPizzasStatus.fulfilled]: (state, action) => {
  //   state.items = action.payload;
  //   state.status = 'success';
  // },
  // [fetchPizzasStatus.rejected]: (state, action) => {
  //   state.status = 'error';
  //   state.items = [];
  // },
  // },
});

export const selectPizzaData = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
