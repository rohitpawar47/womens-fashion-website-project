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
import { UserContext } from "../../contexts/UserContext";


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
    const { navShadow, setNavShadow, menuSlide, cart, clickOutSearch } = React.useContext(Context);
    const { currentUser } = useContext(UserContext);



    const handleCloseSearch = () => {
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



    const menuRef = useRef(null);

    const profileDropHandle = () => {
        setProfileComp(prevPro => !prevPro);
    }

    useOutSideClick(menuRef, profileDropHandle, profileComp);

    function profileDrop() {
        return (
            <>
                {
                    profileComp && (
                        <div className="profile-drop">
                            {currentUser ?
                                <Link to="signin" onClick={signOutUser} className='go-to-signin'>Sign out
                                </ Link> :
                                <Link to="signin" onClick={signOutUser} className='go-to-signin'>Sign in
                                </ Link>}
                            <Link to='signup' className="join-link">Not a mumber yet? Join here!</Link>
                        </div>
                    )

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

                <MobNavigation />

                <CompanyLogo />
                <div className="first-nav-right" style={{ position: "relative" }} >
                    <button
                        className="mobile-search"
                        onClick={() => setSearchClick(!searchClick)}
                    >
                        <RiSearch2Line className="profile-icons search-icon" />
                    </button>
                    <div ref={menuRef}>
                        <button onClick={profileDropHandle}

                            className="profile-wrapper"><RiUserLine className="profile-icons" /><p>Profile</p></button>
                        {profileDrop()}
                    </div>
                    <Link to={"/favourite"}
                        className="profile-wrapper"> <RiHeart3Line className="profile-icons" /> <p>Favourites</p>
                    </Link>

                    <Link to={`/cart`}
                        className="profile-wrapper"><RiShoppingBag2Line className="profile-icons" /><p>Shopping bag ({cart.length})</p>
                    </Link>

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
                        onClick={handleCloseSearch} />
                </div>
            }
        </header >
    )
};