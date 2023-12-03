import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum Variants {


    SUCCESS ='#d1e7dd',
    DANGER = '#f8d7da',
    WARNING = '#fff3cd',
    INFO = '#cff4fc',

}
export interface DataGridModalState {
    variant:Variants;
    show:boolean;
    heading:string;
    text:string;


}

const initialState: DataGridModalState = {
    variant:Variants.INFO,
    show:false,
    heading:"",
    text:"",
};

export const DataGridModalSlice = createSlice({
    name: "DataGridModal",
    initialState,
    reducers: {
        show: (state, action: PayloadAction<{ variant: Variants;heading:string;text:string }>) => {
            state.show=true;
            state.variant=action.payload.variant;
            state.heading=action.payload.heading;
            state.text=action.payload.text;


        },
        hide: (state) => {
            state.show=false;
        },
    }
});

export const { show,hide} = DataGridModalSlice.actions;

export default DataGridModalSlice.reducer;