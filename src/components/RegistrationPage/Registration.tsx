import React, { FC, useState, ChangeEvent, FormEvent } from 'react';
import { createUser } from '../../requests';

import User from '../../models/User';

import '../../styles/common_styles.css';
import '../../styles/auth_styles.css';


const Registration: FC = () => {

    const initUser: User = {
        user_id: '',
        user_email: '',
        user_name: '',
        user_password: '',
        user_phone: ''
    }

    const [user, setUser] = useState<User>(initUser);
    const [passwordRepeat, setPasswordRepeat] = useState<string>('');

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    }

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    }

    const handlePasswordRepeatChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setPasswordRepeat(value);
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (user.user_password === passwordRepeat) {
            createUser(user)
            .then(()=>
                alert('Успешная регистрация'))
            .catch(
                error => alert(error));
            
        }
        else {
            alert('Пароли не совпадают. Попробуйте ещё раз')
        }
    }

    return (
        <div>
            <form className='auth-reg-form' onSubmit={handleSubmit}>
                <h2>Регистрация</h2>
                <label>Почта (email)</label>
                <input name='user_email' type="email" onChange={handleEmailChange} required />
                <label>Пароль (минимум 8 символов)</label>
                <input name='user_password' type="password" minLength={8} maxLength={24} required onChange={handlePasswordChange} />
                <label>Повторите пароль</label>
                <input name='password_repeat' type="password" minLength={8} maxLength={24} required onChange={handlePasswordRepeatChange} />
                <button type='submit'>Зарегистрироваться</button>
            </form>
        </div>
    );
};


export default Registration;