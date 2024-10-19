import React, { FC } from 'react';

import '../../styles.css';

const CatalogElement: FC = () => {
    return (
        <div className='catalog-element'>
            <div className='catalog-element-img'><img src="" alt="Картинка" /></div>
            <div className='catalog-element-title'><p>Товар</p></div>
            <div className='catalog-element-buy'></div>
        </div>
    );
};


export default CatalogElement;