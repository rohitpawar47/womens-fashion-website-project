import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Elements } from '@stripe/react-stripe-js';


import { ContextProvider } from './contexts/AppContext';
import { UserProvider } from './contexts/UserContext';
import { stripePromise } from './utils/firebase/stripe.utils';
import App from './App';


import "./css/Reset.css";
import "./Index.css"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <ContextProvider >
    <UserProvider>
      <BrowserRouter>
        <Elements stripe={stripePromise}>
          <App />
        </Elements>
        <ToastContainer />
      </BrowserRouter>
    </UserProvider>
  </ContextProvider>

);
