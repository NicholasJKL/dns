import React, { FC, MouseEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Item from '../../models/Item';

import '../../styles/common_styles.css';
import '../../styles/catalog_styles.css';
import '../../styles/cart_styles.css';

interface ProductElementProps {
    item: Item,
    type: string,
    notificate?: (messages: string) => void,
    denotificate?: () => void,
    onButtonClick: (item: Item) => void
}


const ProductElement: FC<ProductElementProps> = ({ item, type, notificate, denotificate, onButtonClick }) => {

    const navigate = useNavigate();

    useEffect(() => {
        if (denotificate) {
            setTimeout(() => {
                denotificate();
                console.log(1)
            }, 3000)
        }
    }, [])

    const handleClick = () => {
        navigate('/item', { state: { item_id: item.item_id } });
    }

    const handleButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
        onButtonClick(item);
        if (notificate)
            notificate("Товар добавлен в корзину");
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