import React from "react";
import "./Socials.css";
import { Link } from "react-router-dom";
import { FaFacebookSquare, FaTwitter, FaInstagram, FaYoutube, FaPinterest } from "react-icons/fa";


export default function Socials() {
    return (
        <div className="socials">
            <a href="https://www.facebook.com"><FaFacebookSquare /></a>
            <a href="https://www.twitter.com"><FaTwitter /></a>
            <a href="https://www.instagram.com"><FaInstagram /></a>
            <a href="https://www.youtube.com"><FaYoutube /></a>
            <a href="https://www.pinterest.com"><FaPinterest /></a>
        </div>
    )
};