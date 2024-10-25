import React, { FC } from 'react';

import '../../styles/common_styles.css';
import '../../styles/auth_styles.css';


const Auth: FC = () => {
  return (
    <div>
      <form className='auth-reg-form' onSubmit={() => alert('Успешный вход')}>
        <h2>Вход</h2>
        <label>Почта (email)</label>
        <input name='login' type='email' required  />
        <label>Пароль</label>
        <input name='password' type="password" required  />
        <button type='submit'>Войти</button>
      </form>
    </div>

  );
};


export default Auth;