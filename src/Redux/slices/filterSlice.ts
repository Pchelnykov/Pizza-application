import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

type Sort = {
  name: string;
  sortProperty: 'rating' | 'price' | 'title' | '-rating' | '-price' | '-title';
};

export interface FilterSliceState {
  categoryId: number;
  searchValue: string;
  currentPage: number;
  sort: Sort;
}

const initialState: FilterSliceState = {
  categoryId: 0,
  searchValue: '',
  currentPage: 1,
  sort: {
    name: 'попопулярности',
    sortProperty: 'rating',
  },
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setChangeSort(state, action: PayloadAction<Sort>) {
      state.sort = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      state.sort = action.payload.sort;
      state.categoryId = Number(action.payload.categoryId);
      state.currentPage = Number(action.payload.currentPage);
    },
  },
});

export const selectSort = (state: RootState) => state.filterSlice.sort;

export const { setCategoryId, setChangeSort, setFilters, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;
