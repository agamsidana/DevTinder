import {configureStore} from '@reduxjs/toolkit';
import userReducer from './userSlice';
import feedReducer from '../utils/feedSlice'


const appStore=configureStore({
    reducer:{
        user:userReducer,
        feed:feedReducer
    }
});

export default appStore;