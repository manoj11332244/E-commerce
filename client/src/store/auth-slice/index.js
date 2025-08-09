import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const SignupUser = createAsyncThunk('/auth/signup',
    async (formData) => {
        const response = await axios.post('http://localhost:8000/api/auth/signup', formData, { withCredentials: true })
        return response.data
    }
)

export const loginUser=createAsyncThunk('/auth/login',
    async(formData)=>{
        const response=await axios.post('http://localhost:8000/api/auth/login',formData,{withCredentials:true})
        return response.data
    }
)

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isAuthenicated: false,
        isLoading: false,
        user: null
    },
    reducers: {
        setUser: (state, action) => {

        }
    },
    extraReducers: (builder) => {
        builder.addCase(SignupUser.pending, (state) => {
            state.isLoading = true;
        }).addCase(SignupUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
            state.isAuthenicated = false
        }).addCase(SignupUser.rejected, (state) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenicated = false;
        }).addCase(loginUser.fulfilled,(state,action)=>{
            state.isLoading=false,
            state.isAuthenicated=action.payload.success ? true : false,
            state.user=action.payload.sucess ? action.payload.user : null
            // console.log(action)
        }).addCase(loginUser.pending,(state)=>{
            state.isLoading=true
        }).addCase(loginUser.rejected,(state)=>{
            state.isAuthenicated=action.payload.success ? true : false,
            state.user=null,
            state.isLoading=false
        })
    }
})


export const { setUser } = authSlice.actions;
export default authSlice.reducer;
