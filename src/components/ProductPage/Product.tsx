import React, { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import Item from '../../models/Item';

import { getItemById } from '../../requests';

import '../../styles/common_styles.css';
import '../../styles/item_styles.css';


interface ProductProps {
    item_id: string | number
}

const Product: FC<ProductProps> = ({ item_id}) => {

    const { state } = useLocation();
    item_id = state.item_id;

    const [item, setItem] = useState<Item>({ item_id: item_id, item_name: '', item_price: 0, image_path: '' });

    useEffect(() => {
        getItemById(item_id)
            .then(queryObject => {
                if (queryObject !== undefined && queryObject !== null) {
                    const loadedItem: Item = (
                        {
                            item_id: queryObject.id,
                            item_name: queryObject.item_name,
                            item_price: queryObject.item_price,
                            image_path: queryObject.image_path
                        }
                    )
                    setItem(loadedItem);
                }
            })
            .catch(error => console.error(error));
    }, [item_id]);

    return (
        <div className='item-grid'>
            <div className='item-left-content'>
                <img src={item.image_path} alt="Картинка" />
            </div>
            <div className='item-right-content'>
                <h2>{item.item_name}</h2>
                <div className='item-buy-price'>
                    <p>{item.item_price} ₽</p>
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


export default Product;