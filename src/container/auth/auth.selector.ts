import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const selectedreducer = (state: RootState) => state.userstate;

export const selectUser = createDraftSafeSelector(selectedreducer, (userState) => userState.user);
