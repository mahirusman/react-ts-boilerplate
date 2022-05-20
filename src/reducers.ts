import { combineReducers } from "@reduxjs/toolkit";
import userstate, { logout } from "./container/auth/auth.slice";
import loaderstate from "./container/Loader/loader.slice";

const app_reducer = combineReducers({ userstate, loaderstate });

const rootReducer = (state: ReduceParams[0], action: ReduceParams[1]) => {
  // clearning state
  if (action.type === logout.fulfilled.toString()) {
    localStorage.clear();

    state = undefined;
  }

  return app_reducer(state, action);
};

export default rootReducer;

type ReduceParams = Parameters<typeof app_reducer>;
