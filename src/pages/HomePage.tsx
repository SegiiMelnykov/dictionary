import LangDirection from 'components/langDirection/LangDirection';
import PageList from 'components/pageList/PageList';
import ShowRecord from 'components/showRecord/ShowRecord';
import React, { useEffect, useState } from 'react';
import { useGetPagesQuery } from 'store/googleSheet/googleSheet.api';
import { FidgetSpinner } from 'react-loader-spinner'
import { useActions } from 'hooks/actions';


const HomePage = () => {
    const {isLoading, isSuccess, data: sheets} = useGetPagesQuery('');
    const {setCurrentPage} = useActions()
    useEffect(()=> {
        setCurrentPage(isSuccess ? sheets![0].properties.title : '')
    }, [sheets])
    console.log('home page')

    return (
        <div>
            {isLoading 
                ? <div className='text-center'><FidgetSpinner 
                    height="80"
                    width="80"
                    ariaLabel="loading"
                    /></div>
                : <PageList sheets={sheets} /> }
            {/* {isSuccess && <LangDirection/>} */}
            {isSuccess && <ShowRecord isSuccessSheets={isSuccess} />  }
            
        </div>
    );
};

export default HomePage;