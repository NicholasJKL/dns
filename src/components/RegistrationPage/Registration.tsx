import React, { FC, useState, ChangeEvent, FormEvent } from 'react';

import '../../styles/common_styles.css';
import '../../styles/auth_styles.css';


const Registration: FC = () => {

    const [password, setPassword] = useState<string>('');
    const [passwordRepeat, setPasswordRepeat] = useState<string>('');

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setPassword(value);
    }

    const handlePasswordRepeatChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setPasswordRepeat(value);
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        if (password === passwordRepeat) {
            alert('Успешная регистрация');
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
                <input name='login' type="text" required  />
                <label>Пароль (минимум 8 символов)</label>
                <input name='password' type="password" minLength={8} maxLength={24} required  onChange={handlePasswordChange} />
                <label>Повторите пароль</label>
                <input name='password_repeat' type="password" minLength={8} maxLength={24} required  onChange={handlePasswordRepeatChange} />
                <button type='submit'>Зарегистрироваться</button>
            </form>
        </div>

    );
};


export default Registration;