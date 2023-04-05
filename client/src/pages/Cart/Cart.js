import React from "react";
import { Link } from "react-router-dom";
import './Cart.css';
import { Context } from "../../AppContext";
import { IoMdClose } from 'react-icons/io';
import { RiHeart3Line, RiHeart3Fill } from "react-icons/ri";
import { TbTruckDelivery } from "react-icons/tb";
import { FaCcVisa, FaCcPaypal } from 'react-icons/fa';
import { RiMastercardFill } from 'react-icons/ri';
import { SiAmericanexpress } from 'react-icons/si';
// import StripeButton from "../../components/CheckOut/CheckOut";

import { loadStripe } from "@stripe/stripe-js";

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
                <img src={"http://localhost:1337" + i.item.attributes.image_1.data.attributes.url} alt="" /></Link>
            <div className="cart-product-detail">
                <p>${i.item.attributes.price}</p>
                <Link to={`/product/${i.item.id}`} >{i.item.attributes.name}</Link>
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

    const subTotal = cart.reduce((acc, item) => acc + item.item.attributes.price * item.quantity, 0).toFixed(2);

    // const allPrice = cart.map(i => i.item.attributes.price);

    // function subTotal() {
    //     let sum = 0;
    //     for (let i = 0; i < allPrice.length; i++) {
    //         if (cart.quantity > 0) {
    //             sum = (sum + allPrice[i]) * cart.quantity;
    //         } else {
    //             sum = sum + allPrice[i];
    //         }
    //     }
    //     return sum.toFixed(2);
    // }
    const stripePromise = loadStripe('pk_test_51MgRuqSDqe9LvfgquWXtQX9EfS0QsTigYFlfN0ebqaZmkGPU9FdV5Ys4QqHQbILS8ZV1QyKG0lHe3GfeCGriBEFj00f25ObKSB');
    // const makeRequest = axios.create({
    //     baseURL: 'http://localhost:1337/api',
    //     headers: {
    //         Authorization: "bearer " + '570ba3050638ac147209533104ba33ecdc9e23b1f4929d5116c591f3107b659247e45dc5e299b4c8e473362fc1ec767bd17959a23923d5d9b914b9b73e16497475ff02662c0148fe17878e132442a54c4e6633eb3187ecfb8ad6c4f0b82bf4ff161d4fc6ee52e43ec61caa75f39b7fe6ae7d2442fd32dbc8ec8bacf87e187d7a',
    //     },
    // });

    const handlePayment = async () => {
        try {
            const stripe = await stripePromise;
            const requestBody = {
                // products: cart.map(({ id, quantity }) => ({
                //     id,
                //     quantity,
                // })),
                products: cart.map(i => ({
                    id: i.item.id,
                    name: i.item.attributes.name,
                    quantity: i.quantity
                }))
            }
            // const res = await makeRequest.post("/orders", {
            //     products: cart.map(i => ({
            //         id: i.item.id,
            //         name: i.item.attributes.name,
            //         quantity: i.quantity
            //     }))
            // });
            // const test = JSON.stringify(requestBody)
            // console.log([test].products);
            const response = await fetch("http://localhost:1337/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                // headers: {
                //     Authorization: "bearer " + '570ba3050638ac147209533104ba33ecdc9e23b1f4929d5116c591f3107b659247e45dc5e299b4c8e473362fc1ec767bd17959a23923d5d9b914b9b73e16497475ff02662c0148fe17878e132442a54c4e6633eb3187ecfb8ad6c4f0b82bf4ff161d4fc6ee52e43ec61caa75f39b7fe6ae7d2442fd32dbc8ec8bacf87e187d7a',
                // },
                body: JSON.stringify(requestBody),
            });

            const session = await response.json();
            console.log(session);
            await stripe.redirectToCheckout({
                sessionId: session.id.id,
            });
        } catch (err) {
            console.log(err);
        }
    };

    // const handlePayment = async (token, amount) => {
    //     const response = await fetch('http://localhost:3000/api/orders', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({ token, amount }),
    //     });
    //     const data = await response.json();
    //     return data;
    // };

    // // Call handlePayment function on checkout
    // const onToken = async (token) => {
    //     try {
    //         const amount = subTotal; // replace with actual price
    //         await handlePayment(token, amount);
    //         alert('Payment Successful!');
    //     } catch (error) {
    //         console.log('Payment Error: ', error);
    //         alert('Payment Error. Please try again.');
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
                                {cartProductsComp}
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
                                    onClick={handlePayment}>CHECKOUT</Link>
                                {/* <StripeButton
                                    onToken={onToken}
                                    price={subTotal} /> */}
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


// export default function CartOrCheck() {
//     const [checkOut, setCheckOut] = React.useState(false);

//     return (
//         <>
//             {
//                 checkOut ?
//                     <CheckOut /> :
//                     <Cart switchToComp={() => setCheckOut(prevCheck => !prevCheck)} />
//             }
//         </>
//     )
// };
