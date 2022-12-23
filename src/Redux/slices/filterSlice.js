import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 0,
  sort: {
    name: 'попопулярности',
    sortProperty: 'rating',
  },
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setChangeSort(state, action) {
      state.sort = action.payload;
    },
  },
});

export const { setCategoryId, setChangeSort } = filterSlice.actions;

export default filterSlice.reducer;
