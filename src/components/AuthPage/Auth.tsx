import React, { FC, useState, ChangeEvent, MouseEvent, FormEvent } from 'react';
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
    const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);
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
            .catch(error => notify(`${error.message}`,'error'));
    }

    const handlePasswordVisibilityChange = (e: MouseEvent<HTMLImageElement>) => {
        setPasswordVisibility(state => !state);
    }

    return (
        <div>
            <form className='auth-reg-form' onSubmit={handleSubmit} autoComplete='off'>
                <h2>Вход</h2>
                <label>Почта (email)</label>
                <input name='user_email' type='email' onChange={handleChange} required />
                <label>Пароль</label>
                <div className='input-password'>
                    <input name='user_password' type={passwordVisibility ? 'text' : 'password'} 
                    minLength={8} maxLength={24} required onChange={handleChange} />
                    <img className='password-visibility'
                     src={passwordVisibility ? '/img/visibility_on.svg' : '/img/visibility_off.svg'} alt="show" onClick={handlePasswordVisibilityChange} />
                </div>
                <button type='submit'>Войти</button>
            </form>
        </div>

    );
};


export default Auth;