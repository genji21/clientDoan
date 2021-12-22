import  useReducer  from '../slice/userSlice'
import paymenReducer from '../slice/paymenSlice'
const  { configureStore, getDefaultMiddleware } = require('@reduxjs/toolkit')


const rootReducer = {
    user: useReducer,
    payment:paymenReducer
}



const store = configureStore({
    reducer : rootReducer,
})
export default store