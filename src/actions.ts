import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import type { AppDispatch } from "./store";
import * as authActions from "./container/auth/auth.actions";

export const useActions = () => {
  const dispatch = useDispatch<AppDispatch>();

  return bindActionCreators(authActions, dispatch);
};
