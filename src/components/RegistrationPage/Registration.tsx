import React, { FC, useState, ChangeEvent, FormEvent } from 'react';
import { createUser, getUser } from '../../requests';
import { useNavigate } from 'react-router-dom';

import User from '../../models/User';

import '../../styles/common_styles.css';
import '../../styles/auth_styles.css';


interface RegistrationProps {
    notify: (message: string, type: string) => void,
    setUser: (queryObject: any) => void
}

const Registration: FC<RegistrationProps> = ({ notify, setUser }) => {

    const initUser: User = {
        user_id: '',
        user_email: '',
        user_name: '',
        user_password: '',
        user_phone: '',
        user_address: ''
    }

    const [userData, setUserData] = useState<User>(initUser);
    const [passwordRepeat, setPasswordRepeat] = useState<string>('');
    const [ppAgreement, setPPAgreement] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
    }

    const handleChangeCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
        const { checked } = e.currentTarget;
        setPPAgreement(checked);

    }

    const handlePasswordRepeatChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setPasswordRepeat(value);
    }

    const authUser = async (userData: User) => {
        const user = await getUser(userData);
        setUser(user);
        navigate('/profile');
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (userData.user_password !== passwordRepeat) {
            notify('Регистрация не завершена. Пароли не совпадают.', 'error');
        }

        else if (!ppAgreement) {
            notify('Регистрация не завершена. Подтвердите согласие на обработку персональных данных.', 'error');
        }

        else {
            createUser(userData)
                .then(() => {
                    notify('Успешная регистрация.', 'success');
                    authUser(userData);
                }
                )
                .catch(
                    error => notify(`${error.message}`, 'error')
                )
        }
    }

    return (
        <div>
            <form className='auth-reg-form' onSubmit={handleSubmit}>
                <h2>Регистрация</h2>
                <label>Почта (email)</label>
                <input name='user_email' type="email" onChange={handleChange} required />
                <label>Пароль (минимум 8 символов)</label>
                <input name='user_password' type="password" minLength={8} maxLength={24} required onChange={handleChange} />
                <label>Повторите пароль</label>
                <input name='password_repeat' type="password" minLength={8} maxLength={24} required onChange={handlePasswordRepeatChange} />
                <label><input type="checkbox" onChange={handleChangeCheckbox} />&nbsp;Нажимая на кнопку, я даю своё согласие на обработку персональных данных и соглашаюсь
                    с условиями <a href="/privacy_policy.pdf" target="_blank" className='link link-active'>политикой конфиденциальности</a></label>
                <button type='submit'>Зарегистрироваться</button>
            </form>
        </div>
    );
};


export default Registration;