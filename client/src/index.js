import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import { ContextProvider } from './contexts/AppContext';
import { UserProvider } from './contexts/UserContext';
import App from './App';


import "./css/Reset.css";
import "./Index.css"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <ContextProvider >
    <UserProvider>
      <BrowserRouter>
        <App />
        <ToastContainer />
      </BrowserRouter>
    </UserProvider>
  </ContextProvider>

);
