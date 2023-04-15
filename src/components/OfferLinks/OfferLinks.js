import React from "react";
import "./OfferLinks.css"
import { Link } from "react-router-dom";

export default function OfferLinks() {
    return (
        <div className="offer-links">
            <Link to={"/products?brand=Monki&sort=asc"} className="members-offer"><p>Member only: 10% off on 1st purchase + Free shipping over $20.</p></Link>
        </div>
    )
};