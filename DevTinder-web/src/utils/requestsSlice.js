import { createSlice } from "@reduxjs/toolkit";

const requestsSlice=createSlice({
    name:'requests',
    initialState:[],
    reducers:{
        addRequests:(state,action)=>action.payload,
        removeRequestById:(state,action)=>{
            const id=action.payload;
            return state.filter((request)=>request._id!==id);
        }
    }
});

export const {addRequests,removeRequestById}=requestsSlice.actions;
export default requestsSlice.reducer;