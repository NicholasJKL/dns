import React, { FC, useEffect, useState, FormEvent, ChangeEvent } from 'react';

import { createOrder } from '../../requests';

import User from '../../models/User';
import Item from '../../models/Item';
import Order from '../../models/Order';
import CartElement from '../Common/ItemElement';
import Counter from '../Common/Counter';

import '../../styles/common_styles.css';
import '../../styles/cart_styles.css';
import '../../styles/catalog_styles.css';


interface CartProps {
    user: User,
    cart: Item[],
    setCart: (item: Item[]) => void,
    deleteFromCart: (item: Item) => void,
    updateItemAmount: (item_id: number | string, value: number) => void,
    notify: (message: string, type: string) => void
}

const Cart: FC<CartProps> = ({ user, cart, setCart, deleteFromCart, updateItemAmount, notify }) => {

    const initOrder: Order = {
        id: '',
        user_id: user.user_id,
        items_id: [],
        items_amount: new Map<number | string, number>(),
        order_price: 0,
        order_phone: user.user_phone,
        order_address: user.user_address,
        order_status: 'создан',
        order_created_at: new Date()
    }

    const [order, setOrder] = useState<Order>(initOrder);
    const [totalValue, setTotalValue] = useState<number>(0);

    useEffect(() => {
        let total: number = 0;

        cart.forEach(item => {
            total = (item.item_price * (item.item_cart_amount ?? 1)) + total;
        });
        setTotalValue(total);

        setOrder(newOrder => {
            newOrder.items_id = cart.map(item => {
                return String(item.item_id);
            });
            newOrder.items_amount = new Map(cart.map(item => {
                return [item.item_id, item.item_cart_amount ?? 1];
            }));
            newOrder.order_price = total;
            newOrder.order_status = 'создан';
            newOrder.order_created_at = new Date();
            return newOrder;
        }
        );
    }, [order, cart]);

    const validatePhone = (phone: string) => {
        const phoneRegex = /^(\+7)\s*\((\d{3})\)\s*-?\s*(\d{3})\s*-?\s*(\d{2})\s*-?\s*(\d{2})$/;
        if (!phoneRegex.test(phone)) {
            return false;
        }
        else {
            return true;
        }
    }

    const handleChange = (e: FormEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;

        setOrder({
            ...order,
            [name]: value
        });

    }
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (checkInput()) {
            createOrder(order, user)
                .then(() => {
                    alert(`Заказ создан`);
                    notify('Заказ создан', 'success');
                    localStorage.removeItem('savedCart');
                    setCart([]);
                })
                .catch(() => alert(`Ошибка при создании заказа. Попробуйте позже`));
        }
        else {
            alert(`Заказ не создан. Убедитесь, что корзина не пуста и необходимые поля заполнены`);
        }
    }

    const checkInput = (): boolean => {
        const validatePhoneResult = validatePhone(order.order_phone);
        if (cart.length > 0 && order.order_address.length > 0 && validatePhoneResult) {
            return true;
        }
        if (!validatePhoneResult) {
            notify('Неправильно введён номер телефона', 'error');
        }
        return false;
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
                    <input name='order_phone' type="tel" placeholder="+7(XXX)-XXX-XX-XX" inputMode='tel' 
                    onChange={handleChange} defaultValue={user.user_phone} required />
                    <label>Адрес</label>
                    <input name='order_address' type="text" onChange={handleChange} defaultValue={user.user_address} required />
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