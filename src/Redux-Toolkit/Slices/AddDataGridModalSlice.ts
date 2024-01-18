import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Obj {
    [key: string]: any;
}
export interface AddDataGridModalState {
    showAddForm:boolean;
    pk:any;
    showAddForm2:boolean;
    pk2:any;

}

const initialState: AddDataGridModalState = {
    showAddForm:false,
    pk:'',
    showAddForm2:false,
    pk2:'',


};

export const AddDataGridModal = createSlice({
    name: "AddDG",
    initialState,
    reducers: {
        showModal: (state,action) => {

            state.showAddForm=true;
            state.pk=action.payload;
        },
        hideModal: (state) => {
            state.showAddForm=false;
            state.pk=''
        },
        showModal2: (state,action) => {

            state.showAddForm2=true;
            state.pk2=action.payload;
        },
        hideModal2: (state) => {
            state.showAddForm2=false;
            state.pk2=''
        },

    }
});

export const { showModal,hideModal,showModal2,hideModal2} = AddDataGridModal.actions;

export default AddDataGridModal.reducer;