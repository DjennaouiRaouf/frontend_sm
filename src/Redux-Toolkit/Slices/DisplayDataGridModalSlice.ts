import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Obj {
    [key: string]: any;
}
export interface DisplayDataGridModalState {
    show:boolean;
    data:any;
    title:string;
    img:string;
}

const initialState: DisplayDataGridModalState = {
    show:false,
    data:"",
    title:"",
    img:"",
};

export const DisplayDataGridModal = createSlice({
    name: "Alert",
    initialState,
    reducers: {
        showModal: (state,action: PayloadAction<{ data: {};title:string;img:string }>) => {
            state.data=action.payload.data;
            state.img=action.payload.img;
            state.title=action.payload.title;
            state.show=true;




        },
        hideModal: (state) => {
            state.show=false;
        },
    }
});

export const { showModal,hideModal} = DisplayDataGridModal.actions;

export default DisplayDataGridModal.reducer;