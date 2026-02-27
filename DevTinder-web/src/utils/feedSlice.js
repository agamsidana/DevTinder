import { createSlice } from "@reduxjs/toolkit";

const feedSlice=createSlice({
    name:'feed',
    initialState:[],
    reducers:{
        addFeed:(state,action)=>action.payload,
        removeFeedById:(state,action)=>{
            const id=action.payload;
            return state.filter((feed)=>id!=feed._id);
        }
    }

});

 export const {addFeed,removeFeedById}=feedSlice.actions;
export default feedSlice.reducer;