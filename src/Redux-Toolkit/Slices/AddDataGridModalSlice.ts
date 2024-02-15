import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Obj {
    [key: string]: any;
}
export interface AddDataGridModalState {
    showAddForm:boolean;
    pk:any;
    showAddForm2:boolean;
    pk2:any;
    showAddForm3:boolean;
    pk3:any;
    showAddForm4:boolean;
    pk4:any;
}

const initialState: AddDataGridModalState = {
    showAddForm:false,
    pk:'',
    showAddForm2:false,
    pk2:'',
    showAddForm3:false,
    pk3:'',
    showAddForm4:false,
    pk4:'',

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
        showModal3: (state,action) => {

            state.showAddForm3=true;
            state.pk3=action.payload;
        },
        hideModal3: (state) => {
            state.showAddForm3=false;
            state.pk3=''
        },
        showModal4: (state,action) => {

            state.showAddForm4=true;
            state.pk4=action.payload;

        },
        hideModal4: (state) => {
            state.showAddForm4=false;
            state.pk4=''
        },


    }
});

export const { showModal,hideModal,showModal2,hideModal2,
showModal3,hideModal3,
showModal4,hideModal4} = AddDataGridModal.actions;

export default AddDataGridModal.reducer;