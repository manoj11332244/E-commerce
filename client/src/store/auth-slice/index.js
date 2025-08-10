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

export const logoutUser=createAsyncThunk('/auth/logout',
    async()=>{
        const response=await axios.post('http://localhost:8000/api/auth/logout',{},{withCredentials:true})
        return response.data
    }
)

export const checkAuth=createAsyncThunk('/auth/check-auth',
    async()=>{
         const response=await axios.get('http://localhost:8000/api/auth/check-auth',{withCredentials:true,headers:{"Cache-Control":"no-store,no-cache,must-revalidate,proxy-revalidate"}})
        return response.data
    }
)

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isAuthenicated: false,
        isLoading: true,
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
            state.user=action.payload.success ? action.payload.user : null
        }).addCase(loginUser.pending,(state)=>{
            state.isLoading=true
        }).addCase(loginUser.rejected,(state)=>{
            state.isAuthenicated=false,
            state.user=null,
            state.isLoading=false
        }).addCase(logoutUser.fulfilled,(state)=>{
            state.isAuthenicated=false,
            state.user=null,
            state.isLoading=false
        }).addCase(logoutUser.pending,(state)=>{
            state.isLoading=true;
        }).addCase(checkAuth.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isAuthenicated=action.payload.success
            state.user=action.payload.success ? action.payload.user : null
        }).addCase(checkAuth.pending,(state)=>{
            state.isLoading=true;
        }).addCase(checkAuth.rejected,(state,action)=>{
            state.isLoading=false,
            state.user=null,
            state.isAuthenicated=false;
        })
    }
})


export const { setUser } = authSlice.actions;
export default authSlice.reducer;
