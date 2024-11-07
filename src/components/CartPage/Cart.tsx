import React, { FC, useEffect, useState } from 'react';

import User from '../../models/User';
import Item from '../../models/Item';
import CatalogElement from '../CatalogPage/CatalogElement';

import '../../styles/common_styles.css';
import '../../styles/cart_styles.css';
import '../../styles/catalog_styles.css';


interface CartProps {
    user: User
}

const Cart: FC<CartProps> = ({ user }) => {

    const [itemsPrice, setItemsPrice] = useState<number>(0);
    const [items, setItems] = useState<Item[]>([
        { item_id: 0, item_name: 'iPhone 6', item_price: '19 999', image_path: 'img/iphone6-item.jpg' },
        { item_id: 1, item_name: 'iPhone SE', item_price: '14 999', image_path: 'img/iphoneSE-item.jpg' },
        { item_id: 2, item_name: 'Intel i5-12400F', item_price: '28 999', image_path: 'img/intel-processor.jpg' },
        { item_id: 3, item_name: 'AMD Ryzen 5 7500F', item_price: '25 499', image_path: 'img/amd-processor.jpg' },
        { item_id: 4, item_name: 'Dark Project Keyboard', item_price: '11 099', image_path: 'img/darkproject-keyboard.jpg' },
        { item_id: 5, item_name: 'Huawei MateBook', item_price: '44 999', image_path: 'img/huawei-matebook.jpg' },
        { item_id: 6, item_name: 'Xiaomi TV', item_price: '27 999', image_path: 'img/xiaomi-tv.jpg' },
        { item_id: 7, item_name: 'MSI RTX 4060', item_price: '58 499', image_path: 'img/msi-graphiccard.jpg' }]);

    useEffect(() => {
        let itemsPrice = 0;
        items.map(item => {
            itemsPrice += parseInt(item.item_price.replaceAll(' ', ''));
        })
        setItemsPrice(itemsPrice);
    }, [items]);

    return (
        <div className='cart-block'>
            <div className='cart-header'>
                <h1>Корзина</h1>
            </div>
            <div className='catalog-content'>
                {items.map((item) => {
                    return (<CatalogElement key={item.item_id} item={item} type='cart'></CatalogElement>)
                })}
            </div>
            <div className='cart-buy'>
                <p><b>Итого: {itemsPrice}</b></p>
            </div>
        </div>
    );
};


export default Cart;