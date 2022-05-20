import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const selectedreducer = (state: RootState) => state.loaderstate;

export const selecloader = createDraftSafeSelector(selectedreducer, (loaderState) => loaderState.loader);
