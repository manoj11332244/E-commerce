import axios from "axios";
import { isLoading } from "../product-slice";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");


export const addNewAddress=createAsyncThunk('/addresses/addNewAddress',async(formData)=>{
    const response=await axios.post(`http:localhost:8000/api/shop/address/add`,formData)
    return response.data;
})


export const fetchAllAddress=createAsyncThunk('/addresses/fetchAllAddress',async(userId)=>{
    const response=await axios.get(`http:localhost:8000/api/shop/address/get/${userId}`)
    return response.data;
})


export const editAddress=createAsyncThunk('/addresses/editAddress',async({userId,addressId,formData})=>{
    const response=await axios.put(`http:localhost:8000/api/shop/address/update/${userId}/${addressId}`,formData)
    return response.data;
})


export const deleteAddress=createAsyncThunk('/addresses/deleteAddress',async({userId,addressId})=>{
    const response=await axios.delete(`http:localhost:8000/api/shop/address/delete/${userId}/${addressId}`)
    return response.data;
})

const addressSlice=createSlice({
    name:"address",
    initialState:{
        isLoading:false,
        addressList:[]
    },
    reducers:{

    },
    extraReducers:(builder)=>{
        // builder.addCase(addNewAddress)
    }
})