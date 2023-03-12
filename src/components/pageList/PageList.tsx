import { SheetProperties } from 'models/models';
import React from 'react';
import { useGetPagesQuery } from 'store/googleSheet/googleSheet.api';

import './pageList.module.scss'
import {ListProps} from 'models/models'
import { useActions } from 'hooks/actions';
import { useAppSelector } from 'hooks/redux';



const PageList = ({sheets}:ListProps) => {

    const {setCurrentPage} = useActions()
    const {currentPage} = useAppSelector(state => state.googleSheet)


    return (
        <p>
            {
                sheets?.map((page:SheetProperties) => {
                    return (
                        <button 
                        type='button'
                        className={page.properties.title == currentPage ? 'active' : ""}
                        key={page.properties.sheetId} 
                        onClick={()=> setCurrentPage(page.properties.title)}>{ page.properties.title }</button>
                    )
                })
            }
        </p>
    );
};

export default PageList;