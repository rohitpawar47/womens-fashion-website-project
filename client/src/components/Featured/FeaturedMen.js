import React from "react";
import "./Featured.css";
import { Link } from "react-router-dom";

export default function FeaturedMen() {
    return (
        <div className="Featured">

            <div className="featured-main">
                <Link to={"#"} className="featured-link">
                    <img src="./Images/men-card-01.avif" alt="" />
                    <h2 className="featured-title">YEAR 2023</h2>
                    <p className="featured-subtitle">Its giving boy band</p>
                    <div className="featured-btn-flex">
                        <Link to={"#"} className="featured-btn">SHOP CAS DESIGN</Link>
                    </div>
                </Link>
                <Link to={"#"} className="featured-link">
                    <img src="./Images/men-card-02.avif" alt="" />
                    <h2 className="featured-title">GET FANCY</h2>
                    <p className="featured-subtitle">Date night done right</p>
                    <div className="featured-btn-flex">
                        <Link to={"#"} className="featured-btn">SHOP FORMAL</Link>
                    </div>
                </Link>
            </div>
        </div>
    )
}