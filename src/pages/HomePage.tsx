import React from 'react';
import { useGetPagesQuery } from 'store/googleSheet/googleSheet.api';

const HomePage = () => {
    const {isLoading, data} = useGetPagesQuery('');
    console.log(data)
    return (
        <div>
            { isLoading ? '<p>Loading...<p>' : ''}
        </div>
    );
};

export default HomePage;