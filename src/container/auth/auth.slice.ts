import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createReducerBuilder } from "@/utils/actions";
import { userloginAction } from "./auth.actions";
import User from "@/models/user";
import { UserstoreState } from "@/types";

const initialState: UserstoreState = {
  user: new User(),
};

const reducerBuilder = createReducerBuilder<UserstoreState>();

export const logout = createAsyncThunk("logoutaction", (state, actionType) => {
  // make any api call for server if need to logout from user
  // rightnow we are not doing this
});

const loginReducer = reducerBuilder(userloginAction, {
  fulfilled: (state, { payload }) => {
    if (payload) {
      console.log("payload ", payload);
    }
  },
});

const authslice = createSlice({
  name: "authslice",
  initialState,
  reducers: {
    settokenAndUser: (state, action) => {},
    logout: (state, action) => {},
  },

  extraReducers: (builder) => {
    loginReducer(builder);
  },
});

// export const {} = authslice.actions;

export default authslice.reducer;
