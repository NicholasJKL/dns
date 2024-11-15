import React, { FC, useEffect, useState, FormEvent } from 'react';
import { createOrderDb } from '../../test/db_test';

import User from '../../models/User';
import Item from '../../models/Item';
import Order from '../../models/Order';
import CartElement from '../Common/ProductElement';
import Counter from '../Common/Counter';

import '../../styles/common_styles.css';
import '../../styles/cart_styles.css';
import '../../styles/catalog_styles.css';


interface CartProps {
    user: User,
    cart: Item[],
    setCart: (item: Item[]) => void,
    deleteFromCart: (item: Item) => void,
    updateItemAmount: (item_id: number | string, value: number) => void
}

const Cart: FC<CartProps> = ({ user, cart, setCart, deleteFromCart, updateItemAmount }) => {

    const initOrder: Order = {
        order_id: '',
        user_id: user.user_id,
        items_id: [],
        items_amount: new Map<number | string, number>(),
        order_price: 0,
        order_phone: '',
        order_address: '',
        order_status: 'created',
        order_created_at: new Date()
    }

    const [order, setOrder] = useState<Order>(initOrder);

    useEffect(() => {
        let total: number = 0;

        cart.forEach(item => {
            total = (item.item_price + total) * (item.item_cart_amount ?? 1);
        });

        setOrder(newOrder => {
            
            newOrder.items_id= cart.map(item => {
                return String(item.item_id);
            });
            newOrder.items_amount = new Map(cart.map(item => {
                return [item.item_id, item.item_cart_amount ?? 1];
            }));
            newOrder.order_price = total;
            newOrder.order_status =  'created';
            newOrder.order_created_at = new Date();
            return newOrder;
        });
    }, [order, cart]);

    const handleChange = (e: FormEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;
        setOrder({
            ...order,
            [name]: value
        });
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (cart.length > 0 && order.order_address.length > 0 && order.order_phone.length > 0) {
            createOrderDb(order)
                .then(() => {
                    alert(`Заказ создан`)
                    localStorage.removeItem('savedCart');
                    setCart([]);
                })
                .catch(() => alert(`Ошибка при создании заказа. Попробуйте позже`));
        }
        else {
            alert(`Заказ не создан. Убедитесь, что корзина не пуста и необходимые поля заполнены`);
        }
    }

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
                <form action='submit' className='cart-form' onSubmit={handleSubmit}>
                    <label>Номер телефона</label>
                    <input name='order_phone' type="phone" onChange={handleChange} required />
                    <label>Адрес</label>
                    <input name='order_address' type="text" onChange={handleChange} required />
                    <div className='cart-order'>
                        <p><b>Итого: {order.order_price} ₽</b></p>
                        <button>Заказать</button>
                    </div>
                </form>


            </div>
        </div>
    );
};


export default Cart;