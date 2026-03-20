import { createSlice } from "@reduxjs/toolkit";

const verifyPaymentSlice=createSlice({
    name:'verify-payment',
    initialState:null,
    reducers:{

        isPremium:(state,action)=>{
            return action.payload;
        }

    }
})

export const {isPremium}=verifyPaymentSlice.actions;
export default verifyPaymentSlice.reducer;