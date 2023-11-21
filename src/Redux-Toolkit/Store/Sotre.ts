import { configureStore } from "@reduxjs/toolkit";
import AlertReducer from "../Slices/AlertSlice";
const store = configureStore({
    reducer: {
        alertReducer: AlertReducer,
    }
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;