import React, { useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { BiNews } from 'react-icons/bi';
import { TfiMenu } from "react-icons/tfi";
import { RiUserLine, RiHeart3Line, RiShoppingBag2Line, RiSearch2Line, RiCloseLine, RiCustomerServiceLine } from "react-icons/ri";

import { Context } from "../../contexts/AppContext";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import MobNavigation from "./MobNavigation";
import { SearchInput } from "../HoverMenu/HoverMenu";
import useOutSideClick from "../../hooks/useOutSideClick";
import "./Header.css"


export function CompanyLogo() {
    return (
        <p className="company-logo"><Link to={"/"}>CAS</Link></p>
    )
};

export default function Header() {
    const [profileComp, setProfileComp] = React.useState(false);
    const [searchClick, setSearchClick] = React.useState(false);
    const [windowSize, setWindowSize] = React.useState({
        winWidth: window.innerWidth
    });
    const { navShadow, setNavShadow, menuSlide, downloadApp, dropDownloadLink, cart, clickOutSearch } = React.useContext(Context);



    const windowWidth = () => {
        clickOutSearch();
        setSearchClick(!searchClick);
    }
    function detectSize() {
        setWindowSize({ winWidth: window.innerWidth });
    };
    React.useEffect(() => {
        if (windowSize.winWidth > 1020) {
            setSearchClick(false);
        }
        window.addEventListener("resize", detectSize);
        return () => {
            window.removeEventListener("resize", detectSize);
        }
    }, [windowSize]);



    const navRef = useRef(null);
    useEffect(() => {
        function handleClickOutside(event) {
            if (navRef.current && !navRef.current.contains(event.target)) {
                setNavShadow(false);
                setSearchClick(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [navRef]);



    const profileDropHandle = () => {
        setProfileComp(prevPro => !prevPro);
    }
    const menuRef = useRef(null);
    useOutSideClick(menuRef, profileDropHandle, profileComp);
    function profileDrop() {
        // const local = localStorage.getItem("user");
        // function profileHandle() {
        //     if (local !== {}) {
        //         return <Link to="signin" onClick={() => localStorage.removeItem("user")} className="profile-drop">Logout
        //         </ Link>
        //     } else {
        //         return <button onClick={() => nav("/signin")}>Sign In</button>
        //     }
        // }
        return (
            <>
                {
                    profileComp &&
                    // <Link to="signin" onClick={() => localStorage.removeItem("user")} className="profile-drop">Logout
                    // </ Link>
                    <Link to="signin" onClick={signOutUser} className="profile-drop">Logout
                    </ Link>
                    // <>{profileHandle()}</>

                }
            </>

        )
    }

    return (
        <header >
            {/* navigation - 1 */}

            <nav className="first-nav" >

                <div className="first-nav-left">
                    <Link to={"/customercare"} className="profile-wrapper"><RiCustomerServiceLine className="profile-icons" /> Customer Service</Link>
                    <Link to={"/newsletter"} className="profile-wrapper"><BiNews className="profile-icons" /> Newsletter</Link>
                </div>

                <div
                    className="hamburger-icon-wrapper"
                    onClick={() => setNavShadow(!navShadow)}>
                    <TfiMenu className="hamburger-icon" />
                </div>

                <MobNavigation navRef={navRef} />

                <CompanyLogo />
                <div className="first-nav-right" >
                    <button
                        className="mobile-search"
                        onClick={() => setSearchClick(!searchClick)}
                    >
                        <RiSearch2Line className="profile-icons search-icon" />
                    </button>
                    <div style={{ position: "relative" }} ref={menuRef}>
                        <button onClick={profileDropHandle}

                            className="profile-wrapper"><RiUserLine className="profile-icons" /><p>Profile</p></button>
                        {profileDrop()}
                    </div>
                    {/* <Link to={"/signin"}
                        className="profile-wrapper">
                        <RiUserLine className="profile-icons person-icon" />
                        <p>Sign in</p></Link> */}
                    <Link to={"/favourite"}
                        className="profile-wrapper"> <RiHeart3Line className="profile-icons" /> <p>Favourites</p></Link>

                    <Link to={`/cart`}
                        className="profile-wrapper"><RiShoppingBag2Line className="profile-icons" /><p>Shopping bag ({cart.length})</p> </Link>

                </div>
            </nav >

            {
                searchClick && <div className="search-box" ref={navRef}>
                    <RiSearch2Line className="search-icon-inside-box" />
                    <SearchInput
                        classInput='input-bar-inside-box'
                        classDrop='head-search-drop'
                    />
                    <RiCloseLine
                        className="close-icon-inside-box"
                        onClick={windowWidth} />
                </div>
            }
        </header >
    )
};