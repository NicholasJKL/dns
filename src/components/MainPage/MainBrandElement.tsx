import React, { FC } from 'react';

import '../../styles/common_styles.css';
import '../../styles/main_styles.css'; 

interface MainBrandElementProps {
    image_path: string
}

const MainBrandElement: FC<MainBrandElementProps> = ({image_path}) => {
    return (
        <div className='main-brand-element'>
            <img src={image_path} alt="Бренд" />
        </div>
    );
};


export default MainBrandElement;