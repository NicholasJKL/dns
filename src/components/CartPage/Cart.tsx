import React, { FC, useEffect, useState, FormEvent } from 'react';

import User from '../../models/User';
import Item from '../../models/Item';
import Order from '../../models/Order';
import CartElement from '../Common/ProductElement';
import Counter from '../Common/Counter';

import '../../styles/common_styles.css';
import '../../styles/cart_styles.css';
import '../../styles/catalog_styles.css';
import { StringMappingType } from 'typescript';
import { createOrderDb } from '../../test/db_test';



interface CartProps {
    user: User,
    cart: Item[],
    setCart: (item: Item[]) => void,
    deleteFromCart: (item: Item) => void,
    updateItemAmount: (item_id: number | string, value: number) => void
}

const Cart: FC<CartProps> = ({ user, cart, setCart, deleteFromCart, updateItemAmount }) => {

    const [totalValue, setTotalValue] = useState<number>(0);

    const [order, setOrder] = useState<Order>({
        order_id: '',
        user_id: user.user_id,
        items_id: [],
        items_amount: new Map<number | string, number>(),
        order_price: totalValue,
        order_phone: '',
        order_address: '',
        order_status: '',
        order_created_at: new Date()
    });

    useEffect(() => {
        let total: number = 0;

        cart.forEach(item => {
            total = (item.item_price + total) * (item.item_cart_amount ?? 1);
        });

        setTotalValue(total);
    }, [cart]);

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

            const newItemsAmount = new Map(cart.map(item => {
                return [item.item_id, item.item_cart_amount ?? 1];
            }));

            const newItemsId = cart.map(item => {
                return String(item.item_id);
            });

            setOrder({
                ...order,
                user_id: user.user_id,
                items_id: newItemsId,
                items_amount: newItemsAmount,
                order_price: totalValue,
                order_status: 'created',
                order_created_at: new Date()
            });
            const queryObject = createOrderDb(order)
                .then(() => {
                    alert(`Заказ создан`)
                    localStorage.removeItem('savedCart');
                    setCart([]);
                })
                .catch(() => alert(`Ошибка при создании заказа. Попробуйте позже`));
                console.log(queryObject);

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
                        <p><b>Итого: {totalValue} ₽</b></p>
                        <button>Заказать</button>
                    </div>
                </form>


            </div>
        </div>
    );
};


export default Cart;