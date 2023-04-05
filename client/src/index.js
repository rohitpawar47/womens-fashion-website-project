import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import "./css/Reset.css";
import "./Index.css"
import App from './App';
import { ContextProvider } from './AppContext';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <ContextProvider >
    <BrowserRouter>
      <App />
      <ToastContainer />
    </BrowserRouter>
  </ContextProvider>

);
