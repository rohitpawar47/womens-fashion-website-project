import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="footer-main">

            <div className="upper-footer-wrapper">
                <div className="upper-footer">
                    <div>
                        <h4>ALL FASHION BRANDS</h4>
                        <Link to={"/products?brand=CAS+DESIGN"} className="para">CAS DESIGN</Link>
                        <Link to={"/products?brand=Monki"} className="para" >Monki</Link>
                        <Link to={"/products?brand=Topshop"} className="para" >Topshop</Link>
                        <Link className="para" to={'/products?brand=The+North+Face'}>The North Face</Link>
                        <Link to={"/products?brand=Never+Fully+Dressed"} className="para" >Never Fully Dressed</Link>
                    </div>
                    <div>
                        <h4>ALL SPORTS BRANDS</h4>
                        <Link to={"/products?brand=Adidas"} className="para" >Adidas</Link>
                        <Link to={"/products?brand=Puma"} className="para" >Puma</Link>
                    </div>
                    <div>
                        <h4>CATEGORIES</h4>
                        <Link to={"/products?category=top-wear"} className="para" >Tops</Link>
                        <Link to={"/products?category=bottom-wear"} className="para" >Jeans & Trousers</Link>
                        <Link to={"/products?category=shoes"} className="para" >Footwear</Link>
                        <Link to={"/products?category=dresses"} className="para" >Dresses</Link>
                        <Link to={"/products?category=outer-wear"} className='para'>Outerwear</Link>
                        <Link to={"/products?category=accessories"} className="para" >Accessories</Link>
                        <Link to={"/products?category=face-body"} className="para" >Face + Body</Link>
                    </div>
                    <div>
                        <h4>SHOP NOW</h4>
                        <Link to={"/products"} className="para" >All Products</Link>
                    </div>
                </div>
            </div>

            <div className="lower-footer">
                <div className="copyright">
                    <Link to={"#"}>@2023 CAS</Link>
                    <Link to={"#"}>Privacy & Cookies | Ts&Cs | Accessibility</Link>
                </div>
            </div>
        </footer>

    )
}