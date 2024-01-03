import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Obj {
    [key: string]: any;
}
export interface AddDataGridModalState {
    showAddForm:boolean;
    pk:any;

}

const initialState: AddDataGridModalState = {
    showAddForm:false,
    pk:'',

};

export const AddDataGridModal = createSlice({
    name: "AddDG",
    initialState,
    reducers: {
        showModal: (state,action) => {
            state.pk=action.payload;
            state.showAddForm=true;
        },
        hideModal: (state) => {
            state.showAddForm=false;
            state.pk=''
        },
    }
});

export const { showModal,hideModal} = AddDataGridModal.actions;

export default AddDataGridModal.reducer;