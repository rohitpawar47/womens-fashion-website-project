import React from "react";
import { Link } from "react-router-dom";
import './Cart.css';
import { Context } from "../../contexts/AppContext";
import { IoMdClose } from 'react-icons/io';
import { RiHeart3Line, RiHeart3Fill } from "react-icons/ri";
import { TbTruckDelivery } from "react-icons/tb";
import { FaCcVisa, FaCcPaypal } from 'react-icons/fa';
import { RiMastercardFill } from 'react-icons/ri';
import { SiAmericanexpress } from 'react-icons/si';


function MoveToFavourite({ moveToFavourite }) {
    const [hoverMoveToFav, setHoverMoveToFav] = React.useState(false);
    return (
        <div className="cart-fav"
            onClick={moveToFavourite}
            onMouseEnter={() => setHoverMoveToFav(true)}
            onMouseLeave={() => setHoverMoveToFav(false)}
        >
            {hoverMoveToFav ? <RiHeart3Fill /> : <RiHeart3Line />}
            <p>Save for later</p>
        </div>
    )
}



export default function Cart() {

    const { cart, setCart, removeFromCart, favourite, addToFav } = React.useContext(Context);

    function moveToFavourite(fav) {
        const alreadyFav = favourite.some(item => item.id === fav.item.id);
        if (!alreadyFav) {
            addToFav(fav.item);
        }
        removeFromCart(fav.item.id, fav.size);
    }

    const handleQuantityChange = (e, itemId, size) => {
        const newCartItems = cart.map((item) => {
            if (item.item.id === itemId && item.size === size) {
                return {
                    ...item,
                    quantity: parseInt(e.target.value),
                };
            }
            return item;
        });
        setCart(newCartItems);
    };


    function showSizeOrNot(i) {
        if (i?.item?.attributes?.category === 'accessories' ||
            i?.item?.attributes?.category === 'face-body') {
            return <p>Size: No Size</p>
        } else {
            return <p>Size: {i.size}</p>
        }
    }

    const cartProductsComp = cart.map(i => (
        <div className="cart-products cart-padding"
            key={(i.item.id + i.size)}>
            <Link to={`/product/${i.item.id}`} className="cart-product-img">
                <img src={i.item.image_1} alt="" /></Link>
            <div className="cart-product-detail">
                <p>${i.item.price}</p>
                <Link to={`/product/${i.item.id}`} >{i.item.name}</Link>
                <div className="cart-size-wrapper">
                    {showSizeOrNot(i)}
                    <select value={i.quantity} onChange={(e) => handleQuantityChange(e, i.item.id, i.size)}>
                        {Array.from({ length: 10 }, (_, i) => i + 1).map((quantity) => (
                            <option key={quantity} value={quantity}>{quantity}</option>
                        ))}
                    </select>
                </div>
                <MoveToFavourite moveToFavourite={() => moveToFavourite(i)} />
            </div>
            <IoMdClose className="remove-cart-icon" onClick={() => removeFromCart(i.item.id, i.size)} />
        </div>
    )
    )

    const subTotal = cart.reduce((acc, item) => acc + item.item.price * item.quantity, 0).toFixed(2);



    // const handlePayment = async () => {
    //     try {
    //         const stripe = await stripePromise;
    //         const requestBody = {
    //             products: cart.map(i => ({
    //                 id: i.item.id,
    //                 name: i.item.attributes.name,
    //                 quantity: i.quantity
    //             }))
    //         }
    //         const response = await fetch("http://localhost:1337/api/orders", {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify(requestBody),
    //         });

    //         const session = await response.json();
    //         console.log(session);
    //         await stripe.redirectToCheckout({
    //             sessionId: session.id.id,
    //         });
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };

    return (
        <>
            {
                cart.length > 0 ?
                    <div className="cart-wrapper">
                        <div className="cart-head-paragragh">
                            <p>Can we tempt you? Spend another $25.00 to qualify for FREE Standard Delivery to India.</p>
                        </div>
                        <div className="cart">
                            <div className="left-side">
                                <h2 className="main-title cart-padding">MY BAG</h2>
                                {cart ?
                                    <>
                                        {cartProductsComp}
                                    </> :
                                    <h1>Loading...</h1>
                                }
                                <div className="cart-delivery-section">
                                    <TbTruckDelivery />
                                    <div className="cart-delivery-section-details">
                                        <p>FREE* STANDARD DELIVERY</p>
                                        <p>Faster deliery options available to most countries.</p>
                                        <p>More info</p>
                                    </div>
                                </div>
                            </div>
                            <div className="cart-sub-total">
                                <h2>TOTAL</h2>
                                <div className="sub-total-flex">
                                    <p>Order value</p>
                                    <p>${subTotal}</p>
                                </div>
                                <div className="sub-total-flex">
                                    <p>Delivery</p>
                                    <p>Free</p>
                                </div>
                                <hr />
                                <div className="cart-total">
                                    <p>Total</p>
                                    <p>${subTotal}</p>
                                </div>

                                <Link to="#" className="cart-checkout"
                                >CHECKOUT</Link>
                                <div className="cart-we-accepts">
                                    <p>WE ACCEPT:</p>
                                    <FaCcVisa className="cart-cc" />
                                    <RiMastercardFill className="cart-cc" />
                                    <FaCcPaypal className="cart-cc" />
                                    <SiAmericanexpress className="cart-cc" />
                                    <p>Got a discount code? Add it in the next step.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="empty-cart">
                        <h1>Your bag is empty!</h1>
                    </div>
            }
        </>
    )
};