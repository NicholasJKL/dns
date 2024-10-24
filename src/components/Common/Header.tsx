import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

import '../../styles/common_styles.css';

const Header: FC = () => {
  return (
    <header>
      <NavLink to='/' className='header-logo'></NavLink>
      <nav>
        <ul>
          <NavLink to='/' className={({ isActive }) => isActive ? 'link link-active' : 'link'}><li>Главная</li></NavLink>
          <NavLink to='/about' className={({ isActive }) => isActive ? 'link link-active' : 'link'}><li>О нас</li></NavLink>
          <NavLink to='/catalog' className={({ isActive }) => isActive ? 'link link-active' : 'link'}><li>Каталог</li></NavLink>
          <NavLink to='/contacts' className={({ isActive }) => isActive ? 'link link-active' : 'link'}><li>Контакты</li></NavLink>
          <NavLink to='/auth' className={({ isActive }) => isActive ? 'link link-active' : 'link'}><li>Вход</li></NavLink>
          <NavLink to='/registration' className={({ isActive }) => isActive ? 'link link-active' : 'link'}><li>Регистрация</li></NavLink>
        </ul>
      </nav>
    </header>
  );
};


export default Header;