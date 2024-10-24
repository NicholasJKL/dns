import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Common/Header';
import Main from './components/MainPage/Main';
import About from './components/AboutPage/About'
import Catalog from './components/CatalogPage/Catalog'
import Contacts from './components/ContactsPage/Contacts';
import Auth from './components/AuthPage/Auth';
import Footer from './components/Common/Footer';
import Registration from './components/RegistrationPage/Registration';
import Item from './components/ItemPage/Item';


function App() {
  return (
    <div>
      <Header></Header>
      <main>
        <Routes>
          <Route path='/' element={<Main />}></Route>
          <Route path='/about' element={<About />}></Route>
          <Route path='/catalog' element={<Catalog />}></Route>
          <Route path='/contacts' element={<Contacts />}></Route>
          <Route path='/auth' element={<Auth />}></Route>
          <Route path='/registration' element={<Registration />}></Route>
          <Route path='/item' element={<Item />}></Route>
        </Routes>
      </main>
      <Footer></Footer>
    </div>
  );
}


export default App;
