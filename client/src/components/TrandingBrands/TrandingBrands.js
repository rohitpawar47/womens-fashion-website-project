import React from "react";
import "./TrandingBrands.css";
import { Link } from "react-router-dom";

export default function TrandingBrands() {
    return (
        <div className="trending">

            <h2>TRENDING BRANDS</h2>

            <div className="trending-brands">
                <Link to={"/products?brand=Monki"} className="brand-1" >
                    <img src="./Images/brands/monkl.png" alt="" /></Link>
                <Link to={"/products?brand=Never+Fully+Dressed"} className="brand-2" >
                    <img src="./Images/brands/never-fully-dressed.png" alt="" /></Link>
                <Link to={"/products?brand=Topshop"} className="brand-3" >
                    <img src="./Images/brands/topshop.png" alt="" /></Link>
                <Link to={"/products?brand=The+North+Face"} className="brand-4" >
                    <img src="./Images/north-face.png" alt="" /></Link>
                <Link to={"/products?brand=Puma"} className="brand-5" >
                    <img src="./Images/puma-logo.png" alt="" /></Link>
                <Link to={"/products?brand=Adidas"} className="brand-6" >
                    <img src="./Images/brands/Adidas-Logo.png" alt="" /></Link>

            </div>
        </div>
    )
};