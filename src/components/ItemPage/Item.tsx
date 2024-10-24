import React, { FC } from 'react';

import '../../styles/common_styles.css';
import '../../styles/item_styles.css';
import { useLocation } from 'react-router-dom';

interface ItemProperty {
    item_name: string,
    item_price: string,
    image_path: string
}

const Item: FC<ItemProperty> = ({ item_name, item_price, image_path }) => {

    const { state } = useLocation();

    item_name = state.item_name;
    item_price = state.item_price;
    image_path = state.image_path;

    return (
        <div className='item-grid'>
            <div className='item-left-content'>
                <img src={image_path} alt="Картинка" />
            </div>
            <div className='item-right-content'>
                <h2>{item_name}</h2>
                <div className='item-buy-price'>
                    <p>{item_price} ₽</p>
                    <button>Купить</button>
                </div>
                <h2>Описание:</h2>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta dolorum harum tempora voluptate fuga rem eaque praesentium mollitia officiis. Perferendis animi aliquid laborum labore iure. Eligendi, non? Impedit, tempora voluptatibus!  </p>
                <h2>Характеристики:</h2>
                <ul>
                    <li>Характеристика 1 - <i>значение</i></li>
                    <li>Характеристика 2 - <i>значение</i></li>
                    <li>Характеристика 3 - <i>значение</i></li>
                    <li>Характеристика 4 - <i>значение</i></li>
                    <li>Характеристика 5 - <i>значение</i></li>
                </ul>
            </div>
        </div>
    );
};


export default Item;