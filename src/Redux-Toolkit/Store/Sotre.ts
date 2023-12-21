import { configureStore } from "@reduxjs/toolkit";
import AlertReducer from "../Slices/AlertSlice";
import DisplayDataGridModalReducer from "../Slices/DisplayDataGridModalSlice";
import EditDataGridModalReducer from "../Slices/EditDataGridModalSlice";
const store = configureStore({
    reducer: {
        alertReducer: AlertReducer,
        displayDataGridModal:DisplayDataGridModalReducer,
        editDataGridModal:EditDataGridModalReducer,
    }
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;