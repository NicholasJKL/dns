import React, { FC, useEffect, useState } from 'react';

import User from '../../models/User';
import Item from '../../models/Item';
import CartElement from '../Common/ProductElement';

import '../../styles/common_styles.css';
import '../../styles/cart_styles.css';
import '../../styles/catalog_styles.css';


interface CartProps {
    user: User,
    cart: Item[],
    deleteFromCart: (item: Item) => void
}

const Cart: FC<CartProps> = ({ user, cart, deleteFromCart }) => {

    const [itemsPrice, setItemsPrice] = useState<number>(0);

    useEffect(() => {
        let itemsPrice = 0;
        cart.forEach((item) => {
            itemsPrice += parseInt(item.item_price.replaceAll(' ', ''));
        })
        setItemsPrice(itemsPrice);
    }, [cart]);

    return (
        <div className='cart-block'>
            <div className='cart-header'>
                <h1>Корзина</h1>
            </div>
            <div className='catalog-content'>
                {cart.map((item) => {
                    return (<CartElement key={item.item_id} item={item} type='cart' onButtonClick={deleteFromCart}></CartElement>)
                })}
            </div>
            <div className='cart-buy'>
                <p><b>Итого: {itemsPrice}</b></p>
            </div>
        </div>
    );
};


export default Cart;