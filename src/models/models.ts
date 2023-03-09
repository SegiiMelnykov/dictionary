import { Dispatch, SetStateAction } from "react";


export interface SpreadSheet {
    properties: any,
    sheets:SheetProperties[]
}

export interface SheetProperties {
    properties: {
        sheetId: number;
        title: string;
        index: number;
        sheetType: string;
        gridProperties: any;
    }

}


export interface ListProps {
    sheets: SheetProperties[] | undefined,
}

export interface PageValueProps {
    isSuccessSheets: boolean
}

export interface PageValuesResponce {
    range: string;
    majorDimension: string;
    values: string[][];
}
export interface Record {
    word: string;
    tip: string;
    translation: string;
    [key:string]: string
}

export interface CurrentPage {
    currentPage: string;
    currentRecord: {
        [key:string] : number
    };
    langDirection: boolean;
    dataBuffer: {
        [key:string] : Record[]
    }
}
export type Records = Record[] | undefined

export type GoogleSheetValues = string[][]
export type CollectionData = Record[]
export type ObjectStrings = {[key:string]: string}