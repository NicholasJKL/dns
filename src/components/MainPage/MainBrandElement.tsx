import React, { FC } from 'react';

import '../../styles/common_styles.css';
import '../../styles/main_styles.css'; 

interface MainBrandElementProps {
    path: string
}

const MainBrandElement: FC<MainBrandElementProps> = ({path}) => {
    return (
        <div className='main-brand-element'>
            <img src={path} alt="Бренд" />
        </div>
    );
};


export default MainBrandElement;