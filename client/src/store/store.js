import { configureStore } from "@reduxjs/toolkit";
import authReducers from '../store/auth-slice/index.js'
import AdminProductSlice from '../store/admin/product-slice/index.js'
import shoppingProduct from "./shop/product-slice/index.js";

const store=configureStore({
    reducer:{
        auth: authReducers,
        adminProducts:AdminProductSlice,
        shopProducts:shoppingProduct,
    }
})

export default store;