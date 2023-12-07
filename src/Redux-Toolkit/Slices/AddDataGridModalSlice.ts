import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Obj {
    [key: string]: any;
}
export interface AddDataGridModalState {
    show:boolean;
    data:any;
    title:string;
    img:string;
    pk:string;
    pkValue:any;
}

const initialState: AddDataGridModalState = {
    show:false,
    data:"",
    title:"",
    img:"",
    pk:"",
    pkValue:null,
};

export const AddDataGridModal = createSlice({
    name: "AddDG",
    initialState,
    reducers: {
        showModal: (state,action: PayloadAction<{ data: {};title:string;img:string,pk:string;pkValue:any}>) => {
            state.data=action.payload.data;
            state.img=action.payload.img;
            state.title=action.payload.title;
            state.pk=action.payload.pk;
            state.pkValue=action.payload.pkValue;
            state.show=true;




        },
        hideModal: (state) => {
            state.show=false;
        },
    }
});

export const { showModal,hideModal} = AddDataGridModal.actions;

export default AddDataGridModal.reducer;