import React, { FC } from 'react';
import { NavLink, Link } from 'react-router-dom';

import '../../styles.css';

const Header: FC = () => {
  return (
  <header>
    <div className='header-logo'>
    </div>
    <nav>
      <ul>
        <li>Главная</li>
        <li>О нас</li>
        <li>Каталог</li>
        <li>Контакты</li>
        <li>Вход</li>
        <li>Регистрация</li>
      </ul>
    </nav>
  </header>
  );
};


export default Header;