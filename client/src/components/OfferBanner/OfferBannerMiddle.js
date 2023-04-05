import React from "react";
import "./OfferBanner.css";
import { Link } from "react-router-dom";

export default function OfferBannerMiddle() {
    return (
        <Link to={'/products?brand=Never+Fully+Dressed'}
            className="offer-banner offer-banner-middle">
            <h2 className="middle-h2">25% OFF EVERYTHING!
                <br />
                GET YOURSELF A PAYDAY TREAT
            </h2>

            <h3>With code: PAYTREAT</h3>
            <p>Available on cas.com, app & in stores. Prices may vary online & in-stores.</p>
        </Link>
    )
}