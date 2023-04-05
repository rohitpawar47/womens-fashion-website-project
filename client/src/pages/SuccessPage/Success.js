import React from "react";
import { Context } from "../../AppContext";
import { TiTick } from 'react-icons/ti';
import { Link } from "react-router-dom";
import './Success.css';

export default function Success() {
    const { setCart, cart } = React.useContext(Context);
    React.useEffect(() => {
        if (window.location.href === 'http://localhost:3000/success') {
            // localStorage.removeItem('cart');
            setCart([]);
        }
        // window.location.reload();
    }, [])

    // function successComp() {
    //     if (cart.length <= 0) {
    //         return <div className="">Your order has successfuly placed!</div>
    //     } else {
    //         return <div className=""></div>
    //     }
    // }


    return (
        <div className="success-container">
            <div className='success-text'>
                <TiTick style={{ color: 'green', fontSize: '3rem' }} />
                <h1>Your order has successfuly placed!</h1>
            </div>
            <Link to={'/'} className='home-btn'>Continue Shopping..</Link>
        </div>
    )
}