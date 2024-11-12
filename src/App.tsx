import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import User from './models/User';
import Item from './models/Item';

import Header from './components/Common/Header';
import Main from './components/MainPage/Main';
import About from './components/AboutPage/About'
import Catalog from './components/CatalogPage/Catalog'
import Contacts from './components/ContactsPage/Contacts';
import Auth from './components/AuthPage/Auth';
import Footer from './components/Common/Footer';
import Registration from './components/RegistrationPage/Registration';
import Product from './components/ProductPage/Product';
import Profile from './components/ProfilePage/Profile';
import Cart from './components/CartPage/Cart';


function App() {

  const unregisteredUser: User = {
    user_id: '1',
    user_name: '',
    user_email: '',
    user_password: '',
    user_phone: ''
  };

  const [user, setUser] = useState<User>(unregisteredUser);
  const [cart, setCart] = useState<Item[]>([]);

  const addToCart = (newItem: Item) => {
    if (cart.filter(item => item.item_id === newItem.item_id).length > 1) {
      
    }
    setCart([...cart, newItem]);
  }

  const deleteFromCart = (removableItem: Item) => {
    setCart(cart.filter(item => item.item_id !== removableItem.item_id));
  }

  return (
    <div>
      <Header user={user}></Header>
      <main>
        <Routes>
          <Route path='/' element={<Main />}></Route>
          <Route path='/about' element={<About />}></Route>
          <Route path='/catalog' element={<Catalog addToCart={addToCart} />}></Route>
          <Route path='/contacts' element={<Contacts />}></Route>
          <Route path='/auth' element={<Auth />}></Route>
          <Route path='/registration' element={<Registration />}></Route>
          <Route path='/item' element={<Product item_id={''} />}></Route>
          <Route path='/profile' element={<Profile user={user} orders={[]} />}></Route>
          <Route path='/cart' element={<Cart user={user} cart={cart} addToCart={addToCart} deleteFromCart={deleteFromCart} />}></Route>
        </Routes>
      </main>
      <Footer></Footer>
    </div>
  );
}


export default App;
