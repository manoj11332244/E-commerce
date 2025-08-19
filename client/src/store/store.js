import { configureStore } from "@reduxjs/toolkit";
import authReducers from '../store/auth-slice/index.js'
import AdminProductSlice from '../store/admin/product-slice/index.js'

const store=configureStore({
    reducer:{
        auth: authReducers,
        adminProducts:AdminProductSlice,
    }
})

export default store;