import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import '../../styles/common_styles.css';
import '../../styles/catalog_styles.css';

interface CatalogElementProps {
    item_id: string | number,
    item_name: string,
    item_price: string,
    image_path: string
}


const CatalogElement: FC<CatalogElementProps> = ({ item_id, item_name, item_price, image_path }) => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/item', { state: { item_id: item_id } });
    }

    return (
        <div className='catalog-element'>
            <div className='catalog-element-click' onClick={handleClick}>
                <div className='catalog-element-img'><img src={image_path} alt="Картинка" /></div>
                <div className='catalog-element-title'><p>{item_name}</p></div>
            </div>
            <div className='catalog-element-buy'>
                <p>{item_price} ₽</p>
                <button></button>
            </div>
        </div>
    );
};


export default CatalogElement;