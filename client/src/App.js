import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Products from './pages/Products/Products';
import Product from './pages/Product/Product';
import SignIn from './pages/SignIn/SignIn';
import Favourite from './pages/Favourite/Favourite';
import Cart from './pages/Cart/Cart';
import Success from './pages/SuccessPage/Success';
import Layout from './Layout';
import './App.css';
import Registration from './pages/SignIn/Registration';
import { Protector } from './helpers';
import NewsLetter from './pages/NewsLetter/NewsLetter';
import CustomerCare from './pages/CustomerCare/CustomerCare';



function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={
            <Protector Component={Home} />} />
          <Route path='products' element={<Products />} />
          <Route path='product/:id' element={<Product />} />
          <Route path='favourite' element={<Favourite />} />
          <Route path='cart' element={<Cart />} />
          <Route path='newsletter' element={<NewsLetter />} />
          <Route path='customercare' element={<CustomerCare />} />
        </Route>
        <Route path='success' element={<Success />} />
        <Route path='signin' element={<SignIn />} />
        <Route path='registration' element={<Registration />} />
      </Routes>
    </>
  );
}

export default App;
