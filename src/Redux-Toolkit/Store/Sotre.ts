import { configureStore } from "@reduxjs/toolkit";
import AlertReducer from "../Slices/AlertSlice";
import DisplayDataGridModalReducer from "../Slices/DisplayDataGridModalSlice";
import AddDataGridModalReducer from "../Slices/AddDataGridModalSlice";
const store = configureStore({
    reducer: {
        alertReducer: AlertReducer,
        displayDataGridModal:DisplayDataGridModalReducer,
        addDataGridModal:AddDataGridModalReducer,
    }
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;