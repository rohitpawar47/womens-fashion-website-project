import React from "react";
const Context = React.createContext();

function ContextProvider({ children }) {
    const [navShadow, setNavShadow] = React.useState(false);
    // const [subMenu, setSubMenu] = React.useState(false);
    const [downloadApp, setDownloadApp] = React.useState(false);
    const storeFav = JSON.parse(localStorage.getItem("favourite")) || [];
    const [favourite, setFavourite] = React.useState(storeFav);
    const storeCart = JSON.parse(localStorage.getItem('cart')) || [];
    const [cart, setCart] = React.useState(storeCart);
    const [titleToSort, setTitleToSort] = React.useState("createdAt");
    const [ascending, setAscending] = React.useState('ASC');
    const [priceGreater, setPriceGreater] = React.useState('gt');
    const [priceLesser, setPriceLesser] = React.useState('lt');
    const [priceAmountAbove, setPriceAmountAbove] = React.useState(0);
    const [priceAmountBelow, setPriceAmountBelow] = React.useState(999999);
    const [size, setSize] = React.useState(null);
    const [query, setQuery] = React.useState('');



    function sizeQtyHandler(event) {
        setSize(event.target.value);
    }

    const clickOutSearch = () => {
        setQuery('');
    }

    function priceFilter(amountAbove, amountBelow) {
        setPriceGreater('gte');
        setPriceLesser('lte');
        setPriceAmountAbove(amountAbove);
        setPriceAmountBelow(amountBelow);
    }

    function changeSort(title, sorting) {
        setTitleToSort(title);
        setAscending(sorting);
        priceFilter(0, 200);
    };


    const menuSlide = () => setNavShadow(prevNav => !prevNav);
    // const subMenuHandler = () => setSubMenu(!subMenu);
    function dropDownloadLink() {
        setDownloadApp(prevDownload => !prevDownload)
    };


    React.useEffect(() => {
        localStorage.setItem("favourite", JSON.stringify(favourite));
    }, [favourite]);

    function addToFav(item) {
        setFavourite(prevFav => [...prevFav, item]);
    }
    function removeFav(id) {
        setFavourite(prevFav => prevFav.filter(item => item.id !== id))
    }

    React.useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart])


    function addToCart(item, size) {
        const newItem = { item, size, quantity: 1 };
        setCart(prevCartItem => [...prevCartItem, newItem]);
        setSize(null);
    }

    function removeFromCart(id, size) {
        setCart(prevCartItem => prevCartItem.filter(cart => cart.size !== size || cart.item.id !== id));
    }

    const closeOnClickMob = () => {
        setNavShadow(false);
        // setSubMenu(false);
    }

    React.useEffect(() => {
        if (navShadow) {
            document.body.classList.add('app-scroll-hidden');
        } else {
            document.body.classList.remove('app-scroll-hidden');
        }
    }, [navShadow]);

    return (
        <Context.Provider value={{ navShadow, setNavShadow, menuSlide, downloadApp, dropDownloadLink, favourite, addToFav, removeFav, titleToSort, ascending, changeSort, priceGreater, priceLesser, priceAmountAbove, priceAmountBelow, priceFilter, cart, setCart, addToCart, removeFromCart, size, sizeQtyHandler, closeOnClickMob, query, setQuery, clickOutSearch }}>
            {children}
        </Context.Provider>
    )
};

export { ContextProvider, Context };