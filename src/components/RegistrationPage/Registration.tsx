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
                <p><b>Регистрация</b></p>
                <input name='login' type="text" placeholder='Введите почту' required  />
                <input name='password' type="password" placeholder='Придумайте пароль' minLength={8} required  onChange={handlePasswordChange} />
                <input name='password_repeat' type="password" placeholder='Повторите пароль' minLength={8} required  onChange={handlePasswordRepeatChange} />
                <button type='submit'>Зарегистрироваться</button>
            </form>
        </div>

    );
};


export default Registration;