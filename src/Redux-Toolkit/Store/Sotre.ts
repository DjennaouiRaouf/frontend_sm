import { configureStore } from "@reduxjs/toolkit";
import AlertReducer from "../Slices/AlertSlice";
import DataGridModalReducer from "../Slices/DataGridModalSlice";
const store = configureStore({
    reducer: {
        alertReducer: AlertReducer,
        dataGridModal:DataGridModalReducer,
    }
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;