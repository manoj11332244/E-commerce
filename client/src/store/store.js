import { configureStore } from "@reduxjs/toolkit";
import authReducers from '../store/auth-slice/index.js'
import AdminProductSlice from '../store/admin/product-slice/index.js'
import shoppingProduct from "./shop/product-slice/index.js";
import shoppingCartSlice from './shop/cartSlice/index.js';
import addressSlice from './shop/AddressSlice/index.js'

const store=configureStore({
    reducer:{
        auth: authReducers,
        adminProducts:AdminProductSlice,
        shopProducts:shoppingProduct,
        shopCart:shoppingCartSlice,
        shopAddress:addressSlice
    }
})

export default store;