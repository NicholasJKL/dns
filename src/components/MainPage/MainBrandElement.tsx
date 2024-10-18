import React, { FC } from 'react';

import '../../styles.css';

interface MainBrandElementProps {
    path: string
}

const MainBrandElement: FC<MainBrandElementProps> = ({path}) => {
    return (
        <div className='main-brand-element'>
            <img src={path} alt="apple" />
        </div>
    );
};


export default MainBrandElement;