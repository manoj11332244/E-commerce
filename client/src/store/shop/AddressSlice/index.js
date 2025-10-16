import axios from "axios";
import { isLoading } from "../product-slice";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");


export const addNewAddress=createAsyncThunk('/addresses/addNewAddress',async(formData)=>{
    const response=await axios.post(`http:localhost:8000/api/shop/address/add`,formData)
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
        builder.addbu
    }
})