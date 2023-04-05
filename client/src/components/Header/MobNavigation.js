import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { RiUserLine, RiCloseLine } from "react-icons/ri";
import { Context } from "../../AppContext";
import { BiRightArrowAlt, BiDownArrowAlt } from "react-icons/bi";


function DropMenu(props) {
    const [opener, setOpener] = React.useState(false);
    const { closeOnClickMob } = React.useContext(Context);

    const openerHandler = () => {
        setOpener(prevOpener => !prevOpener);
    }

    const arrowSwitch = opener ?
        <BiDownArrowAlt className="drop-menu-arrow" /> : <BiRightArrowAlt className="drop-menu-arrow" />;

    return (
        <div style={{ position: "relative" }} className={opener ? 'hold-border-for-title' : ''}>
            <div className="drop-menu-title-wrapper"
                onClick={openerHandler}>
                <p className="drop-menu-title">
                    {props.title}</p>
                {arrowSwitch}
            </div>
            <nav className={`drop-menu-main ${opener ? 'drop-menu-main-visible' : ''}`} ref={props.navRef}>
                <div className="drop-nav-menu"
                    onClick={closeOnClickMob}
                >
                    {props.dropMenuList}
                </div>
            </nav>
        </div>
    )
}

export default function MobNavigation(props) {

    const { navShadow, menuSlide, closeOnClickMob } = React.useContext(Context);


    const clothings =
        <>
            <Link to={'/products'}>View all</Link>
            <Link to={'/products?category=top-wear'}>Tops</Link>
            <Link to={'/products?category=bottom-wear'}>Jeans & Trousers</Link>
            <Link to={'/products?category=shoes'}>Footwear</Link>
            <Link to={'/products?category=dresses'}>Dresses</Link>
            <Link to={'/products?category=outer-wear'}>Outerwear</Link>
        </>

    const brands =
        <>
            <Link to={"/products?brand=CAS+DESIGN"} onClick={closeOnClickMob}>CAS DESIGN</Link>
            <Link to={"/products?brand=Monki"}>Monki</Link>
            <Link to={"/products?brand=Topshop"}>Topshop</Link>
            <Link to={"/products?brand=Adidas"}>Adidas</Link>
            <Link to={"/products?brand=Puma"}>Puma</Link>
            <Link to={"/products?brand=The+North+Face"}>The North Face</Link>
            <Link to={"/products?brand=Never+Fully+Dressed"}>Never Fully Dressed</Link>
        </>


    return (
        <div className={`nav ${navShadow ? "" : "navigation-open"}`}>
            <ul className="nav-list" ref={props.navRef} >
                <Link to={"/signin"}
                    onClick={closeOnClickMob}
                    className="drop-nav-profile">
                    <li>
                        <RiUserLine className="profile-icons" />
                        <p>Sign in</p>
                    </li>
                </Link>

                <DropMenu
                    title="Clothings"
                    dropMenuList={clothings}
                />
                <DropMenu
                    title="Brands"
                    dropMenuList={brands}
                />
                <DropMenu
                    title='Accessories'
                    dropMenuList={<Link to={'/products?category=accessories'}>Accessories</Link>}
                />
                <DropMenu
                    title='Face + Body'
                    dropMenuList={<Link to={'/products?category=face-body'}>Face + Body</Link>}
                />
                <div
                    className="close-icon"
                    onClick={menuSlide}>
                    <RiCloseLine className="close-icon-mob" />
                </div>
            </ul>

        </div>
    )
};