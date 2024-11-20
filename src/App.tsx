import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer, toast, cssTransition, Zoom, Bounce } from 'react-toastify';

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
import Product from './components/ItemPage/ItemView';
import Profile from './components/ProfilePage/Profile';
import Cart from './components/CartPage/Cart';
import Test from './Test';

import 'react-toastify/dist/ReactToastify.css';


function App() {

    const unregisteredUser: User = {
        user_id: '',
        user_name: '',
        user_email: '',
        user_password: '',
        user_phone: '',
        user_address: ''
    };

    const [user, setUser] = useState<User>(() => {
        const loadedUserJson = localStorage.getItem('user');
        if (loadedUserJson) {
            return JSON.parse(loadedUserJson);
        }
        return unregisteredUser;
    });

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

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user));
    }, [user]);

    const addToCart = (newItem: Item, amount: number = 1) => {
        if (user.user_id) {
            const item = cart.find(item => item.item_id === newItem.item_id)
            if (item) {
                updateItemAmount(newItem.item_id, item.item_cart_amount ? item.item_cart_amount + 1 : 1);
            }
            else {
                newItem.item_cart_amount = amount;
                setCart([...cart, newItem]);
            }
            notify('Товар добавлен в корзину.','success');
        }
        else {
            notify('Необходимо войти в аккаунт, прежде чем добавлять товары в корзину.', 'error');
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

    const notify = (message: string, type: string) => {
        const toastParams: Object = {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Zoom,
        };
        switch (type) {
            case 'success': {
                toast.success(message, toastParams);
                break;
            }
            case 'error': {
                toast.error(message, toastParams);
                break;
            }
        }
    }

    return (
        <div>
            <Header user={user}></Header>
            <main>
                <Routes>
                    <Route path='/' element={<Main />}></Route>
                    <Route path='/about' element={<About user={user} notify={notify} />} ></Route>
                    <Route path='/catalog' element={<Catalog addToCart={addToCart} notify={notify} />}></Route>
                    <Route path='/contacts' element={<Contacts />}></Route>
                    <Route path='/auth' element={<Auth setUser={updateUser} notify={notify} />}></Route>
                    <Route path='/registration' element={<Registration setUser={updateUser} notify={notify} />}></Route>
                    <Route path='/item/*' element={<Product item_id={''} addToCart={addToCart} notify={notify} />}></Route>
                    <Route path='/profile' element={<Profile user={user} setUser={setUser} notify={notify} />}></Route>
                    <Route path='/test' element={<Test></Test>}></Route>
                    <Route path='/cart' element={<Cart user={user} cart={cart} setCart={setCart} deleteFromCart={deleteFromCart} updateItemAmount={updateItemAmount} notify={notify} />}></Route>
                </Routes>
                <ToastContainer
                    position="bottom-right"
                    autoClose={5000}
                    limit={5}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    transition={Zoom} />
            </main>

            <Footer></Footer>
        </div>
    );
}


export default App;
