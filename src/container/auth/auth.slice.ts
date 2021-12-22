import { createSlice } from '@reduxjs/toolkit';
import { IAuthstate } from '../../types/auth';

const initialState: IAuthstate = {
  user: {
    role: '',
    _id: '',
    name: '',
    email: '',
    avator: '',
    token: '',
  },
};
const authslice = createSlice({
  name: 'authslice',
  initialState,
  reducers: {
    settokenAndUser: (state, action) => {},
    logout: (state, action) => {},
  },

  extraReducers: {},
});

// export const {} = authslice.actions;

export default authslice.reducer;
