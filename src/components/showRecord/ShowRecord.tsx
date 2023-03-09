import React, { useEffect, useState } from 'react';

import { useLazyGetRecordsQuery } from 'store/googleSheet/googleSheet.api';
import {PageValueProps, Records} from 'models/models'
import { FidgetSpinner } from 'react-loader-spinner'
import { useAppSelector } from 'hooks/redux';
import { useActions } from 'hooks/actions';

const ShowRecord = ({isSuccessSheets}: PageValueProps) => {
    const {setCurrentRecord, setDataBuffer} = useActions()
    const {currentPage, currentRecord, dataBuffer} = useAppSelector(state => state.googleSheet)
    const {langDirection} = useAppSelector(state => state.googleSheet)
    const [fetchRecords, {isLoading, isSuccess, data}] = useLazyGetRecordsQuery();

    const _currentrecord:number = currentRecord[currentPage] ? currentRecord[currentPage] : 0;

    // console.log('currentRecord:', currentRecord)
    // console.log('currentPage:', currentPage)
    
    useEffect(() => {
        if(currentPage && !dataBuffer[currentPage]) {
            fetchRecords(currentPage)
            setDataBuffer({[currentPage]: data})
        } 
    }, [currentPage, isSuccess])

    const records:Records = dataBuffer[currentPage]

    // console.log('show record: ', _currentrecord)

    console.log('pageBuffer:', dataBuffer)
    console.log('page data:', data)


    const checkCurrentRecord = ()=> {
        if(isSuccess && _currentrecord === data!.length) {
            fetchRecords(currentPage)
            setCurrentRecord({[currentPage]: 0})
            console.log('reload data')
        }
    }
    const nextButton = ()=> {
        if (isSuccess && _currentrecord < data!.length) {
            setCurrentRecord({[currentPage]: _currentrecord + 1})
        }
    }
    const prevButton = ()=> {
        if (isSuccess && _currentrecord >= 1) {
            setCurrentRecord({[currentPage]: _currentrecord - 1})
        }
        checkCurrentRecord()
    }
    // checkCurrentRecord()

    return (
        <div>
            <button onClick={prevButton} disabled={!Boolean(_currentrecord)}>prev record (z)</button>
            <button onClick={nextButton} >next record (x)</button>
            { isLoading 
                ? <div className='text-center'><FidgetSpinner 
                    height="80"
                    width="80"
                    ariaLabel="loading"
                    /></div>
                :  '' 
            }
            {isSuccess && records && _currentrecord < records!.length && <p>{records![_currentrecord].word} - {records![_currentrecord].translation}</p>}
            {isSuccess && records && _currentrecord < records!.length && <p className='text-center'> {records!.length - _currentrecord } word from {records!.length}</p>}
        </div>
    );
};

export default ShowRecord;