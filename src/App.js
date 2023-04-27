import React from 'react';
import { Routes, Route } from 'react-router-dom';


import Home from './pages/Home/Home';
import Products from './pages/Products/Products';
import Product from './pages/Product/Product';
import Favourite from './pages/Favourite/Favourite';
import Cart from './pages/Cart/Cart';
import Success from './pages/SuccessPage/Success';
import Layout from './Layout';
import NewsLetter from './pages/NewsLetter/NewsLetter';
import CustomerCare from './pages/CustomerCare/CustomerCare';
import SignUpForm from './pages/SignUpForm/SignUpForm';
import SignInForm from './pages/SignUpForm/SignInForm';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes';
import ForbiddenRoutes from './components/ProtectedRoutes/ForbiddenRoutes';
import Checkout from './pages/Checkout/Checkout';
import './App.css';




function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='products' element={<Products />} />
          <Route path='product/:id' element={<Product />} />
          <Route path='newsletter' element={<NewsLetter />} />
          <Route path='customercare' element={<CustomerCare />} />
          <Route element={<ProtectedRoutes />}>
            <Route path='/favourite' element={<Favourite />} />
            <Route path='/cart' element={<Cart />} />
          </Route >

        </Route>
        <Route element={<ForbiddenRoutes />}>
          <Route path='success' element={<Success />} />
          <Route path='checkout' element={<Checkout />} />
        </Route>
        <Route path='signin' element={<SignInForm />} />
        <Route path='signup' element={<SignUpForm />} />
      </Routes>
    </>
  );
}

export default App;
