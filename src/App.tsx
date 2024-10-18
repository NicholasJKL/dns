import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Common/Header';
import Main from './components/MainPage/Main';
import Footer from './components/Common/Footer';


function App() {
  return (
    <div>
      <Header></Header>
      <main>
        <Main></Main>
      </main>
      <Footer></Footer>
    </div>
  );
}


export default App;
