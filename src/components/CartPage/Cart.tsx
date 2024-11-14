import React, { FC, useEffect, useState } from 'react';

import User from '../../models/User';
import Item from '../../models/Item';
import CartElement from '../Common/ProductElement';
import Counter from '../Common/Counter';

import '../../styles/common_styles.css';
import '../../styles/cart_styles.css';
import '../../styles/catalog_styles.css';



interface CartProps {
    user: User,
    cart: Item[],
    addToCart: (item: Item) => void,
    deleteFromCart: (item: Item) => void,
    updateItemAmount: (item_id: number | string, value: number) => void
}

const Cart: FC<CartProps> = ({ user, cart, addToCart, deleteFromCart, updateItemAmount }) => {

    const [totalValue, setTotalValue] = useState<number>(0);

    useEffect(() => {
        let total: number = 0;

        cart.forEach(item => {
            total = (item.item_price + total)*(item.item_cart_amount ?? 1);
        });

        setTotalValue(total);
    }, [cart]);



    return (
        <div className='cart-block'>
            <div className='catalog-content'>
                {cart.map((item) => {
                    return (
                        <div key={item.item_id}>
                            <CartElement item={item} type='cart' onButtonClick={deleteFromCart}></CartElement>
                            <Counter item={item} itemCartAmount={item.item_cart_amount} updateAmount={updateItemAmount} deleteItem={deleteFromCart}></Counter>
                        </div>)
                })}
            </div>
            <div className='cart-buy'>
                <form action="" className='cart-form'>
                    <label>Номер телефона</label>
                    <input type="phone" required />
                    <label>Адрес</label>
                    <input type="text" required />
                    <div className='cart-order'>
                        <p><b>Итого: {totalValue} ₽</b></p>
                        <button>Заказать</button>
                    </div>
                </form>


            </div>
        </div>
    );
};


export default Cart;