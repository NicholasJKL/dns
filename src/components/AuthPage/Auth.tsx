import React, { FC, useState, ChangeEvent, FormEvent } from 'react';
import { getUser } from '../../requests';

import User from '../../models/User';

import '../../styles/common_styles.css';
import '../../styles/auth_styles.css';


const Auth: FC = () => {

  const [user, setUser] = useState<User>({ user_id: '', user_email: '', user_name: '', user_password: '', user_phone: '' });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getUser(user)
    .then(user => console.log(user))
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