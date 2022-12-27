import { configureStore } from "@reduxjs/toolkit";
import {sheetApi} from 'store/googleSheet/googleSheet.api'
import { setupListeners } from '@reduxjs/toolkit/query'
import { googleSheetReducer } from "store/googleSheet/googleSheet.slice";
import { type } from "os";


export const store = configureStore( {
    reducer: {
        [sheetApi.reducerPath]: sheetApi.reducer,
        googleSheet: googleSheetReducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sheetApi.middleware),

})

setupListeners(store.dispatch)
export type RootState = ReturnType<typeof store.getState>
