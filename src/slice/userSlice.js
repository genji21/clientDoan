import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from '../api/userApi';

export const register = createAsyncThunk(
'user/register',
async (payload) =>{
//call Api to register 
const data = await userApi.register(payload)
return data
}
)
export const login = createAsyncThunk(
'user/login',
async (payload) =>{
//call Api to register 
const data = await userApi.login(payload)
return data
}
)
export const getinforUser = createAsyncThunk('/user/getInfo',async (payload)=>{
const data = await userApi.getInfor(payload)
return data
})
const userSlice = createSlice({
    name:'user',
    initialState:{
        current:{},
        loading:false,
        isLog:true,
    
    }
    ,reducers: {
        addUser(state,action){
            state.user = action.payload
        }

    },
    extraReducers :{
        [register.pending] : (state,action) =>{
            state.loading = true
        },
     [register.fulfilled] : (state,action)=>{
        state.current = action.payload;
        state.loading = false
     },
     [login.pending] : (state,action)=>{
        state.loading = true
     },
     [login.rejected] : (state,action ) =>{
         state.loading = false
     },
     [login.fulfilled] : (state,action) =>{
         state.current = action.payload;
         state.loading=false
         localStorage.setItem('accessToken',action.payload.acessToken)
         state.isLog = true
     },
     [getinforUser.pending] : (state,action) =>{
         state.loading = true
     },
     [getinforUser.rejected] : (state,action )=>{
         state.loading = false
         state.isLog = false

     }, 
     [getinforUser.fulfilled] : (state,action)=>{
         state.current = action.payload
         state.isLog = true
         state.loading = false
     }
    }
})
const {reducer,actions} = userSlice;
export default reducer;
export const {addUser} = actions