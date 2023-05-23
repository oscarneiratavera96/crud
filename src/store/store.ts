import { configureStore } from "@reduxjs/toolkit";
import homeReducer from "./reducer/reducer";

const store = configureStore({
  reducer: {
    homeReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
