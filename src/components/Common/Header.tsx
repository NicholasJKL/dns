import React, { FC, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import User from '../../models/User';

import '../../styles/common_styles.css';


interface HeaderProps {
  user: User
}

const Header: FC<HeaderProps> = ({ user }) => {

  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    console.log(user);
  }, [user])

  const handleClick = () => {
    setIsActive(!isActive);
  }

  const handleLinkClick = () => {
    setIsActive(false);
  }

  return (
    <header>
      <NavLink to='/' className='header-logo'></NavLink>
      <div className={isActive ? 'mobile-menu mobile-menu-opened' : 'mobile-menu mobile-menu-closed'} onClick={handleClick}></div>
      <nav className={isActive ? 'nav-show' : ''}>
        <ul>
          <NavLink to='/' className={({ isActive }) => isActive ? 'link link-active' : 'link'} onClick={handleLinkClick}><li>Главная</li></NavLink>
          <NavLink to='/about' className={({ isActive }) => isActive ? 'link link-active' : 'link'} onClick={handleLinkClick}><li>О нас</li></NavLink>
          <NavLink to='/catalog' className={({ isActive }) => isActive ? 'link link-active' : 'link'} onClick={handleLinkClick}><li>Каталог</li></NavLink>
          <NavLink to='/contacts' className={({ isActive }) => isActive ? 'link link-active' : 'link'} onClick={handleLinkClick}><li>Контакты</li></NavLink>
          {(!user.user_id) ?
            <>
              <NavLink to='/auth' className={({ isActive }) => isActive ? 'link link-active' : 'link'} onClick={handleLinkClick}><li>Вход</li></NavLink>
              <NavLink to='/registration' className={({ isActive }) => isActive ? 'link link-active' : 'link'} onClick={handleLinkClick}><li>Регистрация</li></NavLink>
            </>
            :
            <>
              <NavLink to='/profile' className={({ isActive }) => isActive ? 'link link-active' : 'link'} onClick={handleLinkClick}><li>Профиль</li></NavLink>
              <NavLink to='/cart' className={({ isActive }) => isActive ? 'link link-active' : 'link'} onClick={handleLinkClick}><li>Корзина</li></NavLink>
            </>
          }
        </ul>
      </nav>
    </header>
  );
};


export default Header;