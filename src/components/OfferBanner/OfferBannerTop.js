import React from "react";
import "./OfferBanner.css";
import { Link } from "react-router-dom";

export default function OfferBannerTop() {
    return (
        <Link to={'/products?category=top-wear'}
            className="offer-banner offer-banner-top">
            <button>SALE</button>
            <h2 className="top-h2-1">FINAL CLEARANCE!</h2>
            <h2 className="top-h2-2" >FURTHER REDUCTIONS</h2>
            <h2 className="top-h2-3">ALREADY UPTO 80% OFF</h2>
            <p>Limited time only. Selected styles marked down as shown.</p>
        </Link >
    )
}