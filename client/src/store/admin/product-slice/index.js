import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";


export const addnewProduct = createAsyncThunk('/products/addnewproduct', async (formData) => {
    const result = await axios.post('http://localhost:8000/api/admin/products/add', formData, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return result?.data;
})

export const fetchAllProduct = createAsyncThunk('/products/fetchAllProducts', async () => {
    const result = await axios.get('http://localhost:8000/api/admin/products/get')
    return result?.data;
})

export const editProduct = createAsyncThunk('/products/editProduct', async ({id,formData}) => {
    const result = await axios.put(`http://localhost:8000/api/admin/products/edit/${id}`, formData, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return result?.data;
})

export const deleteProduct = createAsyncThunk('/products/deleteProduct', async (id) => {
    const result = await axios.post(`http://localhost:8000/api/admin/products/delete/${id}`)
    return result?.data;
})

const AdminProductSlice = createSlice({
    name: 'adminProductSlice',
    initialState: {
        isLoading: false,
        productList: []
    },
    reducers: {},
    extraReducers:(builder)=>{
        builder.addCase(fetchAllProduct.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(fetchAllProduct.fulfilled,(state,action)=>{
            state.isLoading=false,
            state.productList =action.payload.data
            console.log(action.payload)
        })
        .addCase(fetchAllProduct.rejected,(state)=>{
            state.isLoading=false,
            state.productList=[]
        })
    }
})

export default AdminProductSlice.reducer;