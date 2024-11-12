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
    deleteFromCart: (item: Item) => void
}

const Cart: FC<CartProps> = ({ user, cart, deleteFromCart }) => {

    const [itemsPrice, setItemsPrice] = useState<number>(0);
    const [itemsAmount, setItemsAmount] = useState<Map<number | string, number>>(new Map());

    useEffect(() => {
        let itemsPrice = 0;
        cart.forEach((item) => {
            if (!itemsAmount.has(item.item_id)) {
                setItemsAmount(itemsAmount => itemsAmount.set(item.item_id, 1));
            }

            itemsPrice += parseInt(item.item_price.replaceAll(' ', '')) * (itemsAmount.get(item.item_id) ?? 1);
        })
        setItemsPrice(itemsPrice);
    }, [cart, itemsAmount]);

    const updateAmount = (item_id: number | string, value: number) => { // Нарушение SRP
        if (value < 1) {
            const removableItem: Item | undefined = cart.find(item => item.item_id === item_id);
            if (removableItem !== undefined) {
                deleteFromCart(removableItem);
            }
        }

        setItemsAmount(itemsAmount => {
            const updatedItems: Map<number | string, number> = new Map(itemsAmount);
            updatedItems.set(item_id, value);
            return updatedItems;
        }
        );
    }

    return (
        <div className='cart-block'>

            <div className='catalog-content'>
                {cart.map((item, index) => {
                    return (
                        <div>
                            <CartElement key={item.item_id} item={item} type='cart' onButtonClick={deleteFromCart}></CartElement>
                            <Counter key={item.item_id} valueKey={item.item_id} value={itemsAmount.get(item.item_id) ?? 1} onChange={updateAmount}></Counter>
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
                        <p><b>Итого: {itemsPrice} ₽</b></p>
                        <button>Заказать</button>
                    </div>
                </form>


            </div>
        </div>
    );
};


export default Cart;