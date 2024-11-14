import React, { useState, useEffect } from 'react';
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
import Test from './Test';


function App() {

    const unregisteredUser: User = {
        user_id: '',
        user_name: '',
        user_email: '',
        user_password: '',
        user_phone: '',
        user_address: ''
    };

    const [user, setUser] = useState<User>(unregisteredUser);
    const [cart, setCart] = useState<Item[]>(() => {
        const loadedCartJson = localStorage.getItem('savedCart');
        if (loadedCartJson) {
            return JSON.parse(loadedCartJson);
        }
        return [];
    });

    useEffect(() => {
        localStorage.setItem('savedCart', JSON.stringify(cart));
    }, [cart]);



    const addToCart = (newItem: Item, amount: number = 1) => {
        if (cart.filter(item => item.item_id === newItem.item_id).length > 0) {
            updateItemAmount(newItem.item_id, newItem.item_cart_amount ? newItem.item_cart_amount + 1 : 1);
        }
        else {
            newItem.item_cart_amount = amount;
            setCart([...cart, newItem]);

        }
    }

    const deleteFromCart = (rmItem: Item) => {
        const otherItems = cart.filter(item => item.item_id !== rmItem.item_id);
        setCart(otherItems);
    }

    const updateItemAmount = (item_id: number | string, value: number) => {
        const newCart: Item[] = cart.map(item => {
            if (item.item_id === item_id) {
                item.item_cart_amount = value;
            }
            return item;
        });
        setCart(newCart);
    }

    const updateUser = (queryObject: any) => {
        if (queryObject !== null && queryObject !== undefined) {
            const newUser: User = {
                user_id: queryObject.id,
                user_email: queryObject.user_email,
                user_name: queryObject.user_name,
                user_password: queryObject.user_password,
                user_phone: queryObject.user_phone,
                user_address: queryObject.user_address
            }
            setUser(newUser);
        }
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
                    <Route path='/auth' element={<Auth setUser={updateUser} />}></Route>
                    <Route path='/registration' element={<Registration />}></Route>
                    <Route path='/item' element={<Product item_id={''} />}></Route>
                    <Route path='/profile' element={<Profile user={user} setUser={setUser} orders={[]} />}></Route>
                    <Route path='/test' element={<Test></Test>}></Route>
                    <Route path='/cart' element={<Cart user={user} cart={cart} addToCart={addToCart} deleteFromCart={deleteFromCart} updateItemAmount={updateItemAmount} />}></Route>
                </Routes>
            </main>
            <Footer></Footer>
        </div>
    );
}


export default App;
