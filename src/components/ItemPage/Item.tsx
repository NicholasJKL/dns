import React, { FC } from 'react';

import '../../styles/common_styles.css';
import '../../styles/item_styles.css';

const Item: FC = () => {
    return (
        <div className='item-grid'>
            <div className='item-left-content'>
                <img src={require('../../img/iphone6-item.jpg')} alt="Картинка" />
            </div>
            <div className='item-right-content'>
                <h2>Название товара</h2>
                <div className='item-buy-price'>
                    <p>400 ₽</p>
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