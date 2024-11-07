import React, { FC, useState, ChangeEvent, FormEvent } from 'react';

import User from '../../models/User';

import '../../styles/common_styles.css';
import '../../styles/profile_styles.css';


interface ProfileProps {
    user: User
    orders: []
}

const Profile: FC<ProfileProps> = ({ user, orders }) => {



    return (
        <div>

            <div className='profile-data'>
                <h1>Информация о пользователе</h1>
                <p>Почта: {user.user_email}</p>
                <p>Имя: {user.user_name}</p>
                <p>Телефон: {user.user_phone}</p>
                <button>Выйти из аккаунта</button>
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