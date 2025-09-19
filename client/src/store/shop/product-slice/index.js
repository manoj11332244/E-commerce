import reducer from "@/store/auth-slice";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchAllFilteredProduct = createAsyncThunk('/products/filteredproducts', async ({filterParams,sortParams}) => {
    const query=new URLSearchParams({...filterParams,sortBy:sortParams})
    const result = await axios.get(`http://localhost:8000/api/shop/products/get?${query}`)
    // console.log('resutl',result?.data)
    return result?.data;
})

const shoppingProductSlice = createSlice({
    name: 'shoppingProduct',
    initialState: {
        isLoading: false,
        productList: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllFilteredProduct.pending, (state) => {
            state.isLoading = true;
        }).addCase(fetchAllFilteredProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.productList = action.payload?.data
            // console.log(action.payload.data)
        }).addCase(fetchAllFilteredProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.productList = [];
        })
    }

})

export const { productList, isLoading } = shoppingProductSlice.actions;
export default shoppingProductSlice.reducer;