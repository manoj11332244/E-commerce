import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const addToCart=createAsyncThunk('cart/addToCart',async({userId,productId,quantity})=>{
    const response=await axios.post(`http://localhost:8000/api/shop/cart/add`,{userId,productId,quantity})
    return response.data;
})

export const fetchCartItem=createAsyncThunk('cart/fetchCartItems',async({userId})=>{
    const response=await axios.get(`http://localhost:8000/api/shop/cart/get/${userId}`)
    console.log("async thunk",response.data)
    return response.data;
})

export const deleteCartItem=createAsyncThunk('cart/deleteCartItem',async(userId,productId)=>{
    const response=await axios.delete(`http://localhost:8000/api/shop/cart/${userId}/${productId}`)
    return response.data;
})

export const updateCartQuanity=createAsyncThunk('cart/update',async(userId,productId,quantity)=>{
    const response=await axios.put(`http://localhost:8000/api/shop/cart/update-cart`,{userId,productId,quantity})
    return response.data;
})

const shoppingCartSlice=createSlice({
    name: 'shoppingCart',
    initialState:{
        cartitems:[],
        isLoading: false
    },
    reducers:{},
    extraReducers: (builder)=>{
        builder.addCase(addToCart.pending,(state,_)=>{
             state.isLoading=true;
        }).addCase(addToCart.rejected,(state,_)=>{
            state.isLoading=false;
            state.cartitems=[];
        }).addCase(addToCart.fulfilled,(state,action)=>{
            state.isLoading=false,
            state.cartitems=action.payload?.data;
        }).addCase(fetchCartItem.pending,(state,_)=>{
             state.isLoading=true;
        }).addCase(fetchCartItem.rejected,(state,_)=>{
            state.isLoading=false;
            state.cartitems=[];
        }).addCase(fetchCartItem.fulfilled,(state,action)=>{
            state.isLoading=false,
            state.cartitems=action.payload?.data;
        }).addCase(updateCartQuanity.pending,(state,_)=>{
             state.isLoading=true;
        }).addCase(updateCartQuanity.rejected,(state,_)=>{
            state.isLoading=false;
            state.cartitems=[];
        }).addCase(updateCartQuanity.fulfilled,(state,action)=>{
            state.isLoading=false,
            state.cartitems=action.payload?.data;
        }).addCase(deleteCartItem.pending,(state,_)=>{
             state.isLoading=true;
        }).addCase(deleteCartItem.rejected,(state,_)=>{
            state.isLoading=false;
            state.cartitems=[];
        }).addCase(deleteCartItem.fulfilled,(state,action)=>{
            state.isLoading=false,
            state.cartitems=action.payload?.data;
        })
    }
})

export const {cartitems,isLoading}=shoppingCartSlice.actions
export default shoppingCartSlice.reducer;