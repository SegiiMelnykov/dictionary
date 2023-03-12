import React, { useEffect, useState } from 'react';

import { useLazyGetRecordsQuery } from 'store/googleSheet/googleSheet.api';
import {PageValueProps, Records} from 'models/models'
import { FidgetSpinner } from 'react-loader-spinner'
import { useAppSelector } from 'hooks/redux';
import { useActions } from 'hooks/actions';

const ShowRecord = () => {
    const {setCurrentRecord, setDataBuffer} = useActions()
    const {currentPage, currentRecord, dataBuffer} = useAppSelector(state => state.googleSheet)
    const {langDirection} = useAppSelector(state => state.googleSheet)
    const [fetchRecords, {isLoading, isSuccess, data}] = useLazyGetRecordsQuery();
    const [flag, setFlag] = useState(false)

    const _currentRecord:number = currentRecord[currentPage] ? currentRecord[currentPage] : 0;

    // console.log('currentRecord:', _currentRecord)
    // console.log('currentPage:', currentPage)
    // console.log('page Buffer:', dataBuffer)
    // console.log('page records:', records)
    
    useEffect(() => {
        getRecords()
    }, [currentPage, data])

    const records:Records = dataBuffer[currentPage]

    async function getRecords() {
        if(currentPage && !dataBuffer[currentPage]) {
            await fetchRecords(currentPage)
            setDataBuffer({[currentPage]: data})
        }
    }

    const nextButton = ()=> {
        if (_currentRecord < records!.length -1 && !flag) {
            setFlag(true)
        } else if(_currentRecord < records!.length -1 && flag) {
            setCurrentRecord({[currentPage]: _currentRecord + 1})
            setFlag(false)
        }
        else {
            setCurrentRecord({[currentPage]: 0 })
        }
    }
    const prevButton = ()=> {
        if (_currentRecord >= 1) {
            setCurrentRecord({[currentPage]: _currentRecord - 1})
        }
    }

    const reloadRecords = async () => {
        await fetchRecords(currentPage)
        setDataBuffer({[currentPage]: data})
        setCurrentRecord({[currentPage]: 0})
    }


    return (
        <div>
            <div className='manage-records'>
                <button onClick={prevButton} disabled={!Boolean(_currentRecord)}>prev record (z)</button>
                <button onClick={nextButton} >next record (x)</button>
            </div>
            
            { isLoading 
                ? <div className='text-center'><FidgetSpinner 
                    height="80"
                    width="80"
                    ariaLabel="loading"
                    /></div>
                :  '' 
            }
            {langDirection && records && _currentRecord < records!.length && 
            <div className='record'>
                {!flag && <p>{records![_currentRecord].word}</p>}
                {flag && <div>
                    <p>{records![_currentRecord].word}</p>
                    <p>-</p>
                    <p>{records![_currentRecord].translation}</p>
                </div>}
            </div>}

            {!langDirection && records && _currentRecord < records!.length && 
             <div className='record'>
                {!flag && <p>{records![_currentRecord].translation}</p>}
                {flag && <div>
                    <p>{records![_currentRecord].translation}</p>
                    <p>-</p>
                    <p>{records![_currentRecord].word}</p>
                </div>}
            </div>}

            <div className='home-footer'>
                {records && _currentRecord < records!.length && <p className='text-center'> {records!.length - _currentRecord } word from {records!.length}</p>}
                <div className='text-center'>
                    <button onClick={reloadRecords} >reload list</button>
                </div>
            </div>

        </div>
    );
};

export default ShowRecord;