import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import exp from "constants";
import { CurrentPage } from "models/models";

const LS_CP_KEY = 'currentPage';
const LS_CR_KEY = 'currentRecord';
const LS_LD_KEY = 'langDirection';
const LS_DB_KEY = 'dataBuffer';

 localStorage.setItem(LS_CP_KEY, JSON.stringify(''))

const initialState: CurrentPage = {
    currentPage: JSON.parse(localStorage.getItem(LS_CP_KEY) ?? ''),
    currentRecord: JSON.parse(localStorage.getItem(LS_CR_KEY) ?? '{}'),
    langDirection: JSON.parse(localStorage.getItem(LS_LD_KEY) ?? 'true'),
    dataBuffer: JSON.parse(localStorage.getItem(LS_DB_KEY) ?? '{}')
}


export const googleSheetSlice = createSlice({
    name: 'googleSheet',
    initialState,
    reducers: {
        setCurrentPage(state, action: PayloadAction<string>){
            state.currentPage = action.payload
            localStorage.setItem(LS_CP_KEY, JSON.stringify(state.currentPage))
        },
        setCurrentRecord(state, action: PayloadAction<object>) {
            state.currentRecord = {...state.currentRecord, ...action.payload }
            localStorage.setItem(LS_CR_KEY, JSON.stringify(state.currentRecord))
        },
        setLangDirection(state, action: PayloadAction<boolean>) {
            state.langDirection = action.payload
            localStorage.setItem(LS_LD_KEY, JSON.stringify(state.langDirection))
        },
        setDataBuffer(state, action: PayloadAction<object>) {
            state.dataBuffer = {...state.dataBuffer, ...action.payload}
            localStorage.setItem(LS_DB_KEY, JSON.stringify(state.dataBuffer))
        }
    }
})

export const googleSheetActions = googleSheetSlice.actions
export const googleSheetReducer = googleSheetSlice.reducer