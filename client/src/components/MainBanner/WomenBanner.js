import React from "react";
import { Link } from "react-router-dom";
import "./Banner.css";

export default function WomenBanner() {
    return (
        <Link to={"/products?brand=CAS+DESIGN"}
            className="women-banner">
            <h2>Minimal to the MAX</h2>
            <p>SHOP CAS DESIGN</p>
        </Link>

    )
};