import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { SpreadSheet, SheetProperties, PageValuesResponce, CollectionData } from 'models/models';
import { arraysToCollection } from 'utilities/convertData'

const API_KEY:string = 'AIzaSyBGIB_zTm4GCRAIChXoqtSTEUpVujf_sxU';
const SHEET_ID:string = '1aqssJJ9IvDDO21ylxiXSW2SjuPK5iO8r3tdZhGjGgBk';

export const sheetApi = createApi({
    reducerPath: 'sheet/api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://sheets.googleapis.com/v4/spreadsheets/'
    }),
    endpoints: build =>({
        getPages: build.query<SheetProperties[], string>({
            query: () => ({
                url: `${SHEET_ID}?&key=${API_KEY}`,
            }),
            transformResponse: (response: SpreadSheet) => response.sheets
        }),
        getRecords: build.query<CollectionData, string>({
            query: (pageName: string = '') => ({
                url: `${SHEET_ID}/values/${pageName}?&key=${API_KEY}`,
            }),
            transformResponse: (response: PageValuesResponce) => arraysToCollection(response.values)
            
        })
    })
})

export const {useGetPagesQuery, useLazyGetRecordsQuery} = sheetApi
