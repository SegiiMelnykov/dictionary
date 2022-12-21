import { configureStore } from "@reduxjs/toolkit";
import {sheetApi} from 'store/googleSheet/googleSheet.api'
import { setupListeners } from '@reduxjs/toolkit/query'


export const store = configureStore( {
    reducer: {
        [sheetApi.reducerPath]: sheetApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sheetApi.middleware),
})

setupListeners(store.dispatch)