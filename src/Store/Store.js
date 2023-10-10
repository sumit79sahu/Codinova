import {configureStore} from "@reduxjs/toolkit"
import productReducer from './Product/productSlice'

const Store=configureStore(
    {
        reducer:{
            product:productReducer
        },
        devTools: process.env.NODE_ENV !== 'production',
        middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
          serializableCheck: false,
        })
    }
)
export default Store