import React, { useEffect, useState } from 'react';

import { useLazyGetRecordsQuery } from 'store/googleSheet/googleSheet.api';
import {PageValueProps} from 'models/models'
import { FidgetSpinner } from 'react-loader-spinner'
import { useAppSelector } from 'hooks/redux';
import { useActions } from 'hooks/actions';

const ShowRecord = ({isSuccessSheets}: PageValueProps) => {
    const {setCurrentRecord} = useActions()
    const {currentPage, currentRecord} = useAppSelector(state => state.googleSheet)
    const {langDirection} = useAppSelector(state => state.googleSheet)
    const [fetchRecords, {isLoading, isSuccess, data}] = useLazyGetRecordsQuery();
    
    useEffect(() => {
        if(currentPage) {
            fetchRecords(currentPage)
            setCurrentRecord(0)
            console.log('load data')
        }
    }, [currentPage])

    console.log('show record component')

    const checkCurrentRecord = ()=> {
        if(isSuccess && currentRecord === data!.length) {
            fetchRecords(currentPage)
            setCurrentRecord(0)
            console.log('reload data')
        }
    }
    const nextButton = ()=> {
        if (isSuccess && currentRecord < data!.length) {
            setCurrentRecord(currentRecord + 1)
        }
    }
    const prevButton = ()=> {
        if (isSuccess && currentRecord >= 1) {
            setCurrentRecord(currentRecord -  1)
        }
        checkCurrentRecord()
    }
    checkCurrentRecord()

    return (
        <div>
            <button onClick={prevButton} disabled={!Boolean(currentRecord)}>prev record(z)</button>
            <button onClick={nextButton} >next record(x)</button>
            { isLoading 
                ? <div className='text-center'><FidgetSpinner 
                    height="80"
                    width="80"
                    ariaLabel="loading"
                    /></div>
                :  '' 
            }
            {isSuccess && currentRecord < data!.length && <p>{data![currentRecord].word} - {data![currentRecord].translation}</p>}
            {isSuccess && currentRecord < data!.length && <p className='text-center'> {data!.length - currentRecord } word from {data!.length}</p>}
        </div>
    );
};

export default ShowRecord;