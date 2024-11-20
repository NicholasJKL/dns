import React, { FC, useState, MouseEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import User from '../../models/User';
import Order from '../../models/Order';

import { getAllOrders, getItemById, updateUser } from '../../requests';
import ItemDb from '../../models/ItemDb';

import '../../styles/common_styles.css';
import '../../styles/profile_styles.css';


interface ProfileProps {
    user: User,
    setUser: (user: User) => void,
    notify: (message: string, type: string) => void
}

const Profile: FC<ProfileProps> = ({ user, setUser, notify }) => {
    const navigate = useNavigate();

    const [orders, setOrders] = useState<Order[]>([]);
    const [items, setItems] = useState<ItemDb[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        let loadedItems: Set<Promise<any>> = new Set();
        getAllOrders(user)
            .then(loadedOrders => {
                loadedOrders.data.forEach((order: Order) => {
                    order.items_amount = new Map(Object.entries(order.items_amount));
                    order.items_id.forEach(async ref => {
                        if (!(ref.id in loadedItems)) {
                            loadedItems.add(getItemById(ref.id));
                        }
                    })
                })
                setIsLoading(false);
                setOrders(loadedOrders.data);
                Promise.all(loadedItems).then(newItems => setItems(newItems));
            }
            )
            .catch(error => console.log(error));
    }, [user]);

    const handleExit = (e: MouseEvent<HTMLButtonElement>) => {
        let result: boolean = window.confirm('Вы действительно хотите выйти из аккаунта?');
        if (result) {
            notify('Вы вышли из аккаунта.', 'success');
            setUser({
                user_id: '',
                user_email: '',
                user_name: '',
                user_password: '',
                user_phone: '',
                user_address: ''
            });
            navigate('/');
        }
    }

    const changeUserData = async (e: MouseEvent<HTMLButtonElement>) => {
        const { name } = e.currentTarget;
        const value = prompt('Введите новое значение', '');

        if (value !== null) {
            let result: boolean = true;
            if (name === 'user_phone' && value) {
                const phoneRegex = /^(\+7)\s*\((\d{3})\)\s*-?\s*(\d{3})\s*-?\s*(\d{2})\s*-?\s*(\d{2})$/;
                result = phoneRegex.test(value);
            }
            if (result) {
                notify('Данные обновлены', 'success');
                setUser({
                    ...user,
                    [name]: value
                });
                await updateUser({
                    ...user,
                    [name]: value
                });
            }
            else{
                notify('Данные не обновлены. Некорректно введён номер телефона', 'error');
            }
        }
    }

    return (
        <div>
            <div className='profile-data'>
                <h1>Информация о пользователе</h1>
                <p>Почта: {user.user_email}</p>
                <p>Имя: {user.user_name} <button name='user_name' className='change-button' onClick={changeUserData}>Изменить</button></p>
                <p>Телефон: {user.user_phone ? user.user_phone : '+7(XXX)-XXX-XX-XX'}
                 <button name='user_phone' className='change-button' onClick={changeUserData}>Изменить</button></p>
                <p>Адрес: {user.user_address} <button name='user_address' className='change-button' onClick={changeUserData}>Изменить</button></p>
                <button onClick={handleExit}>Выйти из аккаунта</button>
            </div>
            <div className='profile-data profile-orders'>
                <h1>История заказов</h1>
                {
                    isLoading ? <div className='loading'></div> :
                    orders.map(order => {
                        return (
                            <details key={order.id} className='profile-order'>
                                <summary><b>Заказ от {order.order_created_at.toString()},
                                    Сумма: {order.order_price} ₽, Статус: {order.order_status}</b></summary>
                                <ol>
                                    {
                                        order.items_id.map((ref, index) => {
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