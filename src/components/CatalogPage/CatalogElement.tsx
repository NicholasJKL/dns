import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import '../../styles/common_styles.css';
import '../../styles/catalog_styles.css';


const CatalogElement: FC = () => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/item');
    }

    return (
        <div className='catalog-element'>
            <div className='catalog-element-click' onClick={handleClick}>
                <div className='catalog-element-img'><img src={require('../../img/iphone6-item.jpg')} alt="Картинка" /></div>
                <div className='catalog-element-title'><p>iPhone 6</p></div>
            </div>
            <div className='catalog-element-buy'>
                <p>400 ₽</p>
                <button></button>
            </div>
        </div>
    );
};


export default CatalogElement;