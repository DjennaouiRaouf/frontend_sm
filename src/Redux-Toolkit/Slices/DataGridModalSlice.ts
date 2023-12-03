import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {stat} from "fs";


export interface DataGridModalState {
    show:boolean;
    jsx:any;




}

const initialState: DataGridModalState = {
   show:false,
   jsx:null,

};

export const DataGridModalSlice = createSlice({
    name: "DataGridModal",
    initialState,
    reducers: {
        show: (state, action: PayloadAction) => {
            state.jsx=action.payload
            state.show=true;




        },
        hide: (state) => {
            state.show=false;
        },
    }
});

export const { show,hide} = DataGridModalSlice.actions;

export default DataGridModalSlice.reducer;