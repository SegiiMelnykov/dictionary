import LangDirection from 'components/langDirection/LangDirection';
import PageList from 'components/pageList/PageList';
import ShowRecord from 'components/showRecord/ShowRecord';
import React, { useEffect, useState } from 'react';
import { useGetPagesQuery } from 'store/googleSheet/googleSheet.api';
import { FidgetSpinner } from 'react-loader-spinner'
import { useActions } from 'hooks/actions';
import { useAppSelector } from 'hooks/redux';


const HomePage = () => {
    const {isLoading, isSuccess, data: sheets} = useGetPagesQuery('');
    const {setCurrentPage} = useActions()

    const {currentPage} = useAppSelector(state => state.googleSheet)
    
    useEffect(()=> {
        // setCurrentPage(currentPage ? sheets![0].properties.title : '')

    }, [isSuccess])
    // console.log('home page')

    return (
        <div className='home-page'>
            {isLoading 
                ? <div className='text-center'><FidgetSpinner 
                    height="80"
                    width="80"
                    ariaLabel="loading"
                    /></div>
                : <PageList sheets={sheets} /> }
            {isSuccess && <LangDirection/>}
            {currentPage && <ShowRecord />  }
        
        </div>
    );
};

export default HomePage;