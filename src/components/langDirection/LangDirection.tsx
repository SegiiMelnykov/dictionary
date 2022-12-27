import React from 'react';

import { useAppSelector } from 'hooks/redux';
import { useActions } from 'hooks/actions';


type directionType = {
    [key: string]: string
}

const direction: directionType = {
    'true': 'English to Russian',
    'false': 'Russian to English'
}

const LangDirection = () => {

    const {setLangDirection} = useActions()
    const {langDirection} = useAppSelector(state => state.googleSheet)
 
    return (
        <div>
            <button type="button" onClick={()=> setLangDirection(!langDirection)}>{direction[String(langDirection)]}</button>
        </div>
    );
};

export default LangDirection;