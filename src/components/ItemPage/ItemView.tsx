import React, { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import Item from '../../models/Item';

import { getItemById } from '../../requests';

import '../../styles/common_styles.css';
import '../../styles/item_styles.css';
import ItemDb from '../../models/ItemDb';
import { Divide } from 'faunadb';


interface ProductProps {
    item_id: string | number,
    addToCart: (newItem: Item) => void,
    notify?: (message: string, type: string) => void,
}

const Product: FC<ProductProps> = ({ item_id, addToCart, notify }) => {

    const { state } = useLocation();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    item_id = state.item_id;

    const [item, setItem] = useState<Item>({ item_id: item_id, item_name: '', item_description: '', item_props: {}, item_price: 0, image_path: '' });

    useEffect(() => {
        getItemById(item_id)
            .then((queryObject: ItemDb) => {
                if (queryObject !== undefined && queryObject !== null) {
                    const loadedItem: Item = (
                        {
                            item_id: queryObject.id,
                            item_name: queryObject.item_name,
                            item_price: queryObject.item_price,
                            item_description: queryObject.item_description,
                            item_props: queryObject.item_props,
                            image_path: '../' + queryObject.image_path
                        }
                    )
                    setIsLoading(false);
                    setItem(loadedItem);
                }
            })
            .catch(error => console.error(error));
    }, [item_id]);

    const handleBuy = () => {
        addToCart(item);
    }

    return (
        <div className='item-grid'>
            <div className='item-left-content'>
            {isLoading ? <div className='loading'></div> :
                <img src={item.image_path} alt={"Изображение"} />}
            </div>
            <div className='item-right-content'>
                <h2>{item.item_name ? item.item_name : 'Название'}</h2>
                    {isLoading ? <div className='loading'></div> : 
                <div className='item-buy-price'>
                    <p>{item.item_price ? item.item_price : ''}  ₽</p>
                    <button onClick={handleBuy}>Купить</button>
                </div>}
                <h2>Описание:</h2>
                {isLoading && <div className='loading'></div> }
                <p>{item.item_description}</p>
                <h2>Характеристики:</h2>
                {isLoading && <div className='loading'></div> }
                <ul>
                    {
                        Object.entries(item.item_props).map(prop => {
                            return <li>{prop[0]} - <i>{prop[1]}</i></li>;
                        })
                    }
                </ul>
            </div>
        </div>
    );
};


export default Product;