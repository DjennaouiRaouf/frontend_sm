import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Obj {
    [key: string]: any;
}
export interface DisplayDataGridModalState {
    show:boolean;
    data:any;

}

const initialState: DisplayDataGridModalState = {
    show:false,
    data:'',

};

export const DisplayDataGridModal = createSlice({
    name: "DisplayDG",
    initialState,
    reducers: {
        showModal: (state,action: PayloadAction<{ data: {} }>) => {
            state.data=action.payload.data;
            state.show=true;
        },
        hideModal: (state) => {
            state.show=false;
        },
    }
});

export const { showModal,hideModal} = DisplayDataGridModal.actions;

export default DisplayDataGridModal.reducer;