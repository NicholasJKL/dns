import React, { FC, useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../requests';

import User from '../../models/User';

import '../../styles/common_styles.css';
import '../../styles/auth_styles.css';


interface AuthProps {
    setUser: (queryObject: any) => void,
    notify: (message: string, type: string) => void
}

const Auth: FC<AuthProps> = ({ setUser, notify }) => {

    const initUser: User = {
        user_id: '',
        user_email: '',
        user_name: '',
        user_password: '',
        user_phone: '',
        user_address: ''
    }

    const [userData, setUserData] = useState<User>(initUser);
    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        getUser(userData)
            .then(user => {
                setUser(user);
                notify('Успешный вход.', 'success');
                navigate('/profile');
            })
            .catch(error => alert(error.message));
    }

    return (
        <div>
            <form className='auth-reg-form' onSubmit={handleSubmit}>
                <h2>Вход</h2>
                <label>Почта (email)</label>
                <input name='user_email' type='email' onChange={handleChange} required />
                <label>Пароль</label>
                <input name='user_password' type="password" onChange={handleChange} required />
                <button type='submit'>Войти</button>
            </form>
        </div>

    );
};


export default Auth;