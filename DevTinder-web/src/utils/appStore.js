import {configureStore} from '@reduxjs/toolkit';
import userReducer from './userSlice';
import feedReducer from '../utils/feedSlice'
import connectionReducer from '../utils/connectionsSlice';
import requestReducer from '../utils/requestsSlice'
import verifyPaymentReducer from '../utils/verify-paymentSlice'


const appStore=configureStore({
    reducer:{
        user:userReducer,
        feed:feedReducer,
        connections:connectionReducer,
        request:requestReducer,
        payment:verifyPaymentReducer
    }
});

export default appStore;