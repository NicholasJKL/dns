import React, { FC, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import Item from '../../models/Item';

import '../../styles/common_styles.css';
import '../../styles/catalog_styles.css';
import '../../styles/cart_styles.css';

interface ProductElementProps {
    item: Item,
    type: string,
    onButtonClick: (item: Item) => void
}


const ProductElement: FC<ProductElementProps> = ({ item, type, onButtonClick }) => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/item', { state: { item_id: item.item_id } });
    }

    const handleButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
        onButtonClick(item);
    }

    return (
        <div className='catalog-element'>
            <div className='catalog-element-click' onClick={handleClick}>
                <div className='catalog-element-img'><img src={item.image_path} alt="Картинка" /></div>
                <div className='catalog-element-title'><p>{item.item_name}</p></div>
            </div>

            <div className={type === 'cart' ? 'cart-element catalog-element-buy' : 'catalog-element-buy'}>
                <p>{item.item_price} ₽</p>
                <button onClick={handleButtonClick}></button>
            </div>
        </div>
    );
};


export default ProductElement;