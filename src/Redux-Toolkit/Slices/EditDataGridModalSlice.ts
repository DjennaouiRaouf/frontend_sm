import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";


export interface EditDataGridModalState {
    dataState: any;
    dataField:any[];
    show:boolean;
    loadingState: 'idle' | 'pending' | 'fulfilled' | 'rejected';
    errorState: string | null;
    loadingField: 'idle' | 'pending' | 'fulfilled' | 'rejected';
    errorField: string | null;
    pk:any;
    pkValue:any;

}
export  interface  UrlParamsState{
    endpoint_state:any;
    pk:any;
    pkValue:any;
}
export  interface  UrlParamsFields{
    endpoint_fields:any;
}
const initialState: EditDataGridModalState = {
    dataState: {},
    dataField:[],
    show:false,
    loadingField: 'idle',
    errorField: null,
    loadingState: 'idle',
    errorState: null,
    pk:null,
    pkValue:null,

};

export const fetchStateFields:any = createAsyncThunk('stateFields', async (params:  UrlParamsState) => {

    try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}${params.endpoint_state}?${params.pk}=${params.pkValue}`);
        return response.data.state;
    } catch (error:any) {
        throw error.response ? error.response.data : error.message;
    }
});
export const fetchFields:any = createAsyncThunk('fields', async (params:  UrlParamsFields) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}${params.endpoint_fields}`);
        return response.data.fields;
    } catch (error:any) {
        throw error.response ? error.response.data : error.message;
    }
});
export const EditDataGridModal = createSlice({
    name: "EditDG",
    initialState,
    reducers: {
        setPk:(state, action:PayloadAction<{pk:any;pkValue:any}>)=>{
          state.pk=action.payload.pk;
          state.pkValue=action.payload.pkValue;
        },
        showModal: (state) => {
            state.show=true;
        },
        hideModal: (state) => {
            state.show=false;
            state.dataState={};
            state.dataField=[];
            state.loadingState= 'idle';
            state.errorState= null;
            state.loadingField= 'idle';
            state.errorField= null;

        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchStateFields.pending, (state) => {
                state.loadingState = 'pending';
            })

            .addCase(fetchFields.pending, (state) => {
                state.loadingField = 'pending';
            })
            .addCase(fetchStateFields.fulfilled, (state, action) => {
                state.loadingState = 'fulfilled';
                state.dataState = action.payload;

            })
            .addCase(fetchFields.fulfilled, (state, action) => {
                state.loadingField = 'fulfilled';
                state.dataField = action.payload;

            })

            .addCase(fetchFields.rejected, (state, action) => {
                state.loadingField = 'rejected';
                state.errorField = action.error.message || 'An error occurred';
            })
            .addCase(fetchStateFields.rejected, (state, action) => {
                state.loadingState = 'rejected';
                state.errorState = action.error.message || 'An error occurred';
            });
    },
});

export const { showModal,hideModal,setPk} = EditDataGridModal.actions;

export default EditDataGridModal.reducer;