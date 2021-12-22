import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const paymenSlice = createSlice({
    name:"paymen",
    initialState:JSON.parse(localStorage.getItem('filterSearch')) || {},
    reducers:{
        addRoom(state,action){
       return state = {...action.payload}
        },
        addFilter(state,action){
            localStorage.setItem('filterSearch',JSON.stringify(action.payload))
            return state = {...action.payload}
        }
    }
})
const {actions,reducer} = paymenSlice;
export const {addRoom,addFilter } = actions
export default reducer