import { configureStore } from "@reduxjs/toolkit";

// Temporary empty reducer to avoid Redux warning
const dummyReducer = (state = {}) => state;

export const store = configureStore({
  reducer: {
    app: dummyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
