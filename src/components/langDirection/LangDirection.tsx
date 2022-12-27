import React from 'react';




type directionType = {
    [key: string]: string
}

const direction: directionType = {
    'true': 'eng to rus',
    'false': 'rus to eng'
}

const LangDirection = () => {


 
    return (
        <>
            <button type="button" >eng to rus</button>
        </>
    );
};

export default LangDirection;