import { configureStore } from "@reduxjs/toolkit";
import authReducers from '../store/auth-slice/index.js'

const store=configureStore({
    reducer:{
        auth: authReducers,
    }
})

export default store;