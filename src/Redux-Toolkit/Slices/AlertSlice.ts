import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum Variants {


    SUCCESS ='#d1e7dd',
    DANGER = '#f8d7da',
    WARNING = '#fff3cd',
    INFO = '#cff4fc',

}
export interface AlertState {
    variant:Variants;
    show:boolean;
    heading:string;
    text:string;


}

const initialState: AlertState = {
    variant:Variants.INFO,
    show:false,
    heading:"",
    text:"",
};

export const AlertSlice = createSlice({
    name: "Alert",
    initialState,
    reducers: {
        showAlert: (state, action: PayloadAction<{ variant: Variants;heading:string;text:string }>) => {
            state.show=true;
            state.variant=action.payload.variant;
            state.heading=action.payload.heading;
            state.text=action.payload.text;


        },
        hideAlert: (state) => {
            state.show=false;
            },
    }
});

export const { showAlert,hideAlert} = AlertSlice.actions;

export default AlertSlice.reducer;