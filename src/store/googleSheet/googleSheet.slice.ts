import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import exp from "constants";
import { CurrentPage } from "models/models";

const LS_CP_KEY = 'currentPage';
const LS_CR_KEY = 'currentRecord'

const initialState: CurrentPage = {
    currentPage: JSON.parse(localStorage.getItem(LS_CP_KEY) ?? '[]'),
    currentRecord: JSON.parse(localStorage.getItem(LS_CR_KEY) ?? '0'),
}


export const googleSheetSlice = createSlice({
    name: 'googleSheet',
    initialState,
    reducers: {
        setCurrentPage(state, action: PayloadAction<string>){
            state.currentPage = action.payload
            localStorage.setItem(LS_CP_KEY, JSON.stringify(state.currentPage))
        },
        setCurrentRecord(state, action: PayloadAction<number>) {
            state.currentRecord = action.payload
            localStorage.setItem(LS_CR_KEY, JSON.stringify(state.currentRecord))
        }
        
    }
})

export const googleSheetActions = googleSheetSlice.actions
export const googleSheetReducer = googleSheetSlice.reducer