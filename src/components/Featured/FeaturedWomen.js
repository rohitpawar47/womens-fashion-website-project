import React from "react";
import "./Featured.css";
import { Link } from "react-router-dom";

export default function FeaturedWomen() {
    return (
        <div className="Featured">

            <div className="featured-main">
                <Link to={"/products?category=outer-wear"} className="featured-link">
                    <img src="./Images/women-card-01.avif" alt="" />
                    <h2 className="featured-title">OUTERWEAR</h2>
                    <p className="featured-subtitle">Our kinda club</p>
                    <div className="featured-btn-flex">
                        <p to={"#"} className="featured-btn">SHOP THE BRAND</p>
                    </div>
                </Link>
                <Link to={"/products?brand=The+North+Face&sort=desc"} className="featured-link">
                    <img src="./Images/women-card-02.webp" alt="" />
                    <h2 className="featured-title">THE NORTH FACE</h2>
                    <p className="featured-subtitle">New drop just in</p>
                    <div className="featured-btn-flex">
                        <p to={"#"} className="featured-btn">SHOP THE BRAND</p>
                    </div>
                </Link>
            </div>
        </div>
    )
}