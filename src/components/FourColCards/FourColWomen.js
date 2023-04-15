import React from "react";
import { Link } from "react-router-dom";
import "./FourColCards.css";


export default function FourColWomen() {
    return (
        <div className="four-col-cards">
            <Link to={"/products?category=dresses"} className="card">
                <img src="./Images/card-party.png" alt="male model wearing fashion clothing" />
                <h4>PARTY PERFECTION</h4>
                <p>Late-night legends</p>
            </Link>
            <Link to={"/products?category=accessories"} className="card">
                <img src="./Images/card-christmas-gifts.png" alt="male model wearing fashion clothing" />
                <h4>CHRISTMAS GIFTS</h4>
                <p>Tick 'em off the list</p>
            </Link>
            <Link to={"/products?category=face-body"} className="card">
                <img src="./Images/card-body-face.png" alt="male model wearing fashion clothing" />
                <h4>FACE + BODY</h4>
                <p>We're falling for these</p>
            </Link>
            <Link to={"/products?brand=CAS+DESIGN&sort=desc"} className="card">
                <img src="./Images/card-casual.png" alt="male model wearing fashion clothing" />
                <h4>CASUAL NEUTRALS</h4>
                <p>CAS EDITION statement</p>
            </Link>
        </div>
    )
}