import React, { FC } from 'react';

import '../../styles/common_styles.css';
import '../../styles/auth_styles.css';


const Auth: FC = () => {
  return (
    <div>
      <form className='auth-reg-form' onSubmit={() => alert('Успешный вход')}>
        <input name='login' type='email' placeholder='Логин' required  />
        <input name='password' type="password" placeholder='Пароль' required  />
        <button type='submit'>Войти</button>
      </form>
    </div>

  );
};


export default Auth;