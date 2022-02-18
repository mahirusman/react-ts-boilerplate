import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import { TypedUseSelectorHook, useSelector } from "react-redux";

const middleware = getDefaultMiddleware({
  serializableCheck: false,
  immutableCheck: false,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
