import { configureStore } from "@reduxjs/toolkit";
import { cameraRollSlice } from "./slices/cameraRoll";

export const store = configureStore({
  reducer: {
    cameraRoll: cameraRollSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
