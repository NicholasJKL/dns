import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Common/Header';
import Main from './components/MainPage/Main';
import About from './components/AboutPage/About'
import Catalog from './components/CatalogPage/Catalog'
import Footer from './components/Common/Footer';


function App() {
  return (
    <div>
      <Header></Header>
      <main>
        <Routes>
          <Route path='/' element={<Main />}></Route>
          <Route path='/about' element={<About />}></Route>
          <Route path='/catalog' element={<Catalog />}></Route>
          <Route path='/contacts' element={<Main />}></Route>
          <Route path='/auth' element={<Main />}></Route>
          <Route path='/registration' element={<Main />}></Route>
        </Routes>
      </main>
      <Footer></Footer>
    </div>
  );
}


export default App;
