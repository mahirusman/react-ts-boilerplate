import { createSlice } from '@reduxjs/toolkit';
import { Iloader } from '../../types/loader';

const initialState: Iloader = {
  loader: false,
};
const loaderSlice = createSlice({
  name: 'loaderSlice',
  initialState,
  reducers: {
    setloader: (state, action) => {
      state.loader = action.payload;
    },
  },

  extraReducers: {},
});

export const { setloader } = loaderSlice.actions;

export default loaderSlice.reducer;
