import React from "react";
import Header from "./components/Header/Header";
import HoverMenu from "./components/HoverMenu/HoverMenu";
import Footer from "./components/Footer/Footer";
import Socials from "./components/Socials/Socials";
import { Outlet } from "react-router-dom";
import './App.css';


export default function Layout() {
    return (
        <div className="app">
            <div className="header">
                <Header />
                <HoverMenu />
            </div>
            <div className="app-body">
                <Outlet />
            </div>
            <div className="footer">
                <Socials />
                <Footer />
            </div>
        </div>
    )
}