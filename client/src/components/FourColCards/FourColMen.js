import React from "react";
import { Link } from "react-router-dom";
import "./FourColCards.css";

export default function FourColMen() {
    return (
        <div className="four-col-cards">
            <Link to={"#"} className="card">
                <img src="./Images/four-col-men/topman.png" alt="male model wearing fashion clothing" />
                <h4>TOPMAN</h4>
                <p>Top 'fits</p>
            </Link>
            <Link to={"#"} className="card">
                <img src="./Images/four-col-men/v-day.png" alt="male model wearing fashion clothing" />
                <h4>V-DAY GOALS</h4>
                <p>Gifts they'll *love*</p>
            </Link>
            <Link to={"#"} className="card">
                <img src="./Images/four-col-men/sporty-stuff.png" alt="male model wearing fashion clothing" />
                <h4>SPORTY STUFF</h4>
                <p>Our personal best</p>
            </Link>
            <Link to={"#"} className="card">
                <img src="./Images/four-col-men/fred-perry.png" alt="male model wearing fashion clothing" />
                <h4>FRED PERRY</h4>
                <p>Just dropped</p>
            </Link>
        </div>
    )
}