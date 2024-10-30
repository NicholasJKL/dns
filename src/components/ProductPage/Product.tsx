import React, { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import Item from '../../models/Item';
import ItemDb from '../../models/ItemDb';

import '../../styles/common_styles.css';
import '../../styles/item_styles.css';


interface ItemProperty {
    item_id: string | number;
}

const Product: FC<ItemProperty> = ({ item_id }) => {

    const { state } = useLocation();
    const [item, setItem] = useState<Item>({ item_id: item_id, item_name: '', item_price: '', image_path: '' });

    useEffect(() => {

        const url = `https://rococo-quokka-cd4373.netlify.app/.netlify/functions/DbGetItemById?${item_id}`

        const getItemFromDb = async () => {
            try {
                const response = await fetch(url);
                const { data } = await response.json();

                const loadedItem: Item = (
                    {
                        item_id: data.id,
                        item_name: data.item_name,
                        item_price: data.item_price,
                        image_path: data.image_path
                    }
                );
                setItem(loadedItem);
            }
            catch {
                console.error(`Failed to load data`);
            }
        }
        getItemFromDb();
    });

    item_id = state.item_id;

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