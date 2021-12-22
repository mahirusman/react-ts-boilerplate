import { combineReducers } from '@reduxjs/toolkit';
import userstate from './container/auth/auth.slice';
import loaderstate from './container/Loader/loader.slice';

export const rootReducer = combineReducers({ userstate, loaderstate });
