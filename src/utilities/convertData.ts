import { GoogleSheetValues, CollectionData, Record } from "models/models";

export const arraysToCollection = (array:GoogleSheetValues):CollectionData => {
    let result:CollectionData = []
        if(array.length > 1) {
            let columns = array[0];
            array.forEach((row: string[], indexRow:number) => {
                if(indexRow !== 0) {
                    let temp: Record = {word:'', tip:'', translation:''}
                    // columns.forEach(item => temp[item]= '')
                    columns.forEach((key:string, columnIndex:number) => {
                        if(row[columnIndex] !== 'undefined') {
                            temp[key] = row[columnIndex];
                        } else if(key === 'tip') {
                            temp[key] = row[columnIndex] ? row[columnIndex] : ''
                        } else {
                            temp[key] = 'no translation'
                        }
                    })
                    result.push(temp);
                }
            })
        }
    return assort(result);
}

const assort = (array:CollectionData) => {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array
}