import React, { FC, useState, MouseEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import User from '../../models/User';
import Order from '../../models/Order';

import { getAllOrders, getItemById } from '../../requests';
import ItemDb from '../../models/ItemDb';

import '../../styles/common_styles.css';
import '../../styles/profile_styles.css';


interface ProfileProps {
    user: User,
    setUser: (user: User) => void,
}

const Profile: FC<ProfileProps> = ({ user, setUser }) => {
    const navigate = useNavigate();

    const [orders, setOrders] = useState<Order[]>([]);
    const [items, setItems] = useState<ItemDb[]>([]);

    useEffect(() => {
        let loadedItems: Set<Promise<any>> = new Set();
        getAllOrders(user)
            .then(loadedOrders => {
                loadedOrders.data.forEach((order: Order) => {
                    order.items_amount = new Map(Object.entries(order.items_amount));
                    order.items_id.forEach(async ref => {
                            loadedItems.add(getItemById(ref.id));
                    })
                })
                Promise.all(loadedItems).then(items => setItems(items));
                setOrders(loadedOrders.data);
            }
            )
            .catch(error => console.log(error));
    }, [user]);

    const handleExit = (e: MouseEvent<HTMLButtonElement>) => {
        let result: boolean = window.confirm('Вы действительно хотите выйти из аккаунта?');
        if (result) {
            setUser({
                user_id: '',
                user_email: '',
                user_name: '',
                user_password: '',
                user_phone: ''
            });
            navigate('/');
        }
    }

    return (
        <div>
            <div className='profile-data'>
                <h1>Информация о пользователе</h1>
                <p>Почта: {user.user_email}</p>
                <p>Имя: {user.user_name}</p>
                <p>Телефон: {user.user_phone}</p>
                <p>Адрес: {user.user_address}</p>
                <button onClick={handleExit}>Выйти из аккаунта</button>
            </div>
            <div className='profile-data profile-orders'>
                <h1>История заказов</h1>

                {
                    orders.map(order => {
                        return (
                            <details key={order.id} className='profile-order'>
                                <summary><b>Заказ от {order.order_created_at.toString()},
                                     Сумма: {order.order_price} ₽, Статус: {order.order_status}</b></summary>
                                <ol>
                                    {
                                        order.items_id.map((ref,index) => {
                                            const item: ItemDb | undefined = items.find(item => item.id === ref.id);
                                            if (item !== undefined) {
                                                const { item_name, item_price } = item;
                                                const amount = order.items_amount.get(item.id);
                                                if (amount !== undefined) {
                                                    return (<li key={index}>{item_name}
                                                        : {item_price} ₽ * {amount} = {item_price * amount} ₽</li>);
                                                }
                                            }
                                            return <li key={index}>Загрузка...</li>;
                                        })
                                    }
                                </ol>
                            </details>
                        )
                    })

                }

            </div>
        </div>

    );
};


export default Profile;