import React, { FC, useState, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import User from '../../models/User';

import '../../styles/common_styles.css';
import '../../styles/profile_styles.css';


interface ProfileProps {
    user: User,
    setUser: (user: User) => void,
    orders: []
}

const Profile: FC<ProfileProps> = ({ user, setUser, orders }) => {
    const navigate = useNavigate();

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
                <button onClick={handleExit}>Выйти из аккаунта</button>
            </div>
            <div className='profile-data profile-orders'>
                <h1>История заказов</h1>
                <details className='profile-order'>
                    <summary><b>Заказ 1</b></summary>
                    Детали заказ
                </details>
                <details className='profile-order'>
                    <summary><b>Заказ 2</b></summary>
                    Детали заказ
                </details>
            </div>
        </div>

    );
};


export default Profile;