import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const API_KEY:string = 'AIzaSyBGIB_zTm4GCRAIChXoqtSTEUpVujf_sxU';
const SHEET_ID:string = '1aqssJJ9IvDDO21ylxiXSW2SjuPK5iO8r3tdZhGjGgBk';

export const sheetApi = createApi({
    reducerPath: 'sheet/api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://sheets.googleapis.com/v4/spreadsheets/'
    }),
    endpoints: build =>({
        getPages: build.query<any, string>({
            query: (pages: string) => ({
                url: `${SHEET_ID}?&key=${API_KEY}`,
            })
        })
    })
})

export const {useGetPagesQuery} = sheetApi