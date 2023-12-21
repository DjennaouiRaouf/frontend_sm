import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Obj {
    [key: string]: any;
}
export interface EditDataGridModalState {
    show:boolean;
    pk:any;
    pkValue:any;
}

const initialState: EditDataGridModalState = {
    show:false,
    pk:'',
    pkValue:'',
};

export const EditDataGridModal = createSlice({
    name: "EditDG",
    initialState,
    reducers: {
        showModal: (state) => {

            state.show=true;




        },
        hideModal: (state) => {
            state.show=false;
        },
    }
});

export const { showModal,hideModal} = EditDataGridModal.actions;

export default EditDataGridModal.reducer;