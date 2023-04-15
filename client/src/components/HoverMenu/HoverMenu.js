import React, { useContext, useRef } from "react";
import "./HoverMenu.css";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import useFetch from "../../hooks/useFetch";
import useOutSideClick from "../../hooks/useOutSideClick";
import { Context } from "../../contexts/AppContext";
import useData from "../../hooks/useData";


export function SearchInput(props) {
    const { query, setQuery, clickOutSearch } = useContext(Context);
    const inputRef = useRef(null);
    const { products } = useData();

    const searchDropDown = products.map(item => (
        <Link
            to={`/products?brand=${item.brand}&category=${item.category}`}
            onClick={() => clickOutSearch()}
            key={item.id}>
            <p>{item.name}</p>
        </Link>
    ))

    React.useEffect(() => {
        if (query.length > 0) {
            document.body.classList.add('app-scroll-hidden');
        } else {
            document.body.classList.remove('app-scroll-hidden');
        }
    }, [query]);

    useOutSideClick(inputRef, clickOutSearch, query);

    return (
        <>
            <input
                ref={inputRef}
                className={props.classInput}
                type="text"
                placeholder="Search products"
                onChange={(e) => setQuery(e.target.value)}
            />
            {
                query.length > 1 ?
                    <div className={props.classDrop}>
                        {searchDropDown}
                    </div>
                    : null
            }
        </>
    )
};

function HoverComp(props) {
    const [hoverDrop, setHoverDrop] = React.useState(false);
    const enterHandler = () => setHoverDrop(true);
    const leaveHandler = () => setHoverDrop(false);
    const closeOnClickHover = () => setHoverDrop(false);

    return (
        <div className="menu-item"
            onMouseEnter={enterHandler}
            onMouseLeave={leaveHandler}>
            <p>{props.title}</p>
            {
                hoverDrop &&
                <ul className="hover-menu-container" >
                    <div className="hover-menu-sub-wrap">
                        <div className="hover-menu-list"
                            onClick={closeOnClickHover}>
                            {props.dropdown}
                        </div>
                        <div className="hover-menu-image">
                            <img src={props.image} alt="hover-product-img" />
                        </div>
                    </div>
                </ul>
            }
        </div>
    )
};



export default function HoverMenu() {

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
            <Link to={"/products?brand=CAS+DESIGN"}>CAS DESIGN</Link>
            <Link to={"/products?brand=Monki"}>Monki</Link>
            <Link to={"/products?brand=Topshop"}>Topshop</Link>
            <Link to={"/products?brand=Adidas"}>Adidas</Link>
            <Link to={"/products?brand=Puma"}>Puma</Link>
            <Link to={"/products?brand=The+North+Face"}>The North Face</Link>
            <Link to={"/products?brand=Never+Fully+Dressed"}>Never Fully Dressed</Link>
        </>

    return (
        <nav className="second-nav" >
            <div className="menu-wrapper">

                <HoverComp
                    title='Clothings'
                    dropdown={clothings}
                    image='../Images/big-card-dress.png'

                />
                <HoverComp
                    title='Brands'
                    dropdown={brands}
                    image='../Images/big-card-winter.png'
                />
                <HoverComp
                    title='Accessories'
                    dropdown={<Link to={'/products?category=accessories'}>Accessories</Link>}
                    image='../Images/accessories-2.jpeg'
                />
                <HoverComp
                    title='Face + Body'
                    dropdown={<Link to={'/products?category=face-body'}>Face + Body</Link>}
                    image='../Images/face+body-2.jpeg'
                />
                <HoverComp
                    title='Footwear'
                    dropdown={<Link to={'/products?category=shoes'}>Footwear</Link>}
                    image='../Images/footwear.jpg'
                />
            </div>

            <div className="search-wrapper">
                <Link to={"#"}><CiSearch className="hover-search-icon" /></Link>
                <SearchInput
                    classInput='search-bar'
                    classDrop='search-dropdown'
                />
            </div>
        </nav >
    )
};