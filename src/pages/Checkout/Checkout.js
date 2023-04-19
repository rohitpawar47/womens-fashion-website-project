import { useState, useContext } from 'react';
import { CardElement, AddressElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

import { useAmount } from '../Cart/Cart';
import { Context } from '../../contexts/AppContext';
import './Checkout.css';

export default function Checkout() {
    const [shippingAddress, setShippingAddress] = useState({});
    const [disableBtn, setDisableBtn] = useState(true);
    const stripe = useStripe();
    const elements = useElements();
    const { total } = useAmount();
    const navigate = useNavigate();
    const { setCart } = useContext(Context);

    const paymentHandler = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const response = await fetch('/.netlify/functions/create-payment-intent', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ amount: total * 100 })
        }).then(function (res) {
            return res.json();
        })
        // .then((res) => res.json())

        // const clientSecret = response.paymentIntent.client_secret;
        const { paymentIntent: { client_secret }, } = response;





        const paymentResult = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: shippingAddress.name,
                    address: {
                        city: shippingAddress.address.city,
                        country: shippingAddress.address.country,
                        line1: shippingAddress.address.line1,
                        line2: shippingAddress.address.line2,
                        postal_code: shippingAddress.address.postal_code,
                        state: shippingAddress.address.state
                    }
                }
            }
        })

        //     .then(function (result) {
        //     if (result.error) {
        //         alert(result.error.message);
        //         console.log(result.error);
        //     } else {
        //         if (result.error.payment_intent.status === 'succeeded') {
        //             alert('Payment Successful');
        //         }
        //     }
        // });


        if (paymentResult.error) {
            alert(paymentResult.type);
        } else {
            if (paymentResult.paymentIntent.status === 'succeeded') {
                // alert('Payment Successful');
                toast.success("Payment Successful", {
                    hideProgressBar: true,
                });
                setCart([]);
                setShippingAddress({});
                setDisableBtn(true);
                return navigate("/success");
            }
        }
    };


    const handleChange = (event) => {
        if (event.complete) {
            const address = event.value;
            setShippingAddress(address);
            setDisableBtn(false);
        }
    }


    return (
        <div className="checkout-container">
            <form action="" onSubmit={paymentHandler}>
                <h2>PAYMENT</h2>
                <label htmlFor="">SHIPPING ADDRESS:</label>
                <AddressElement options={{
                    mode: 'shipping'
                }} onChange={handleChange} />
                <label>CARD:</label>
                <CardElement />
                <button disabled={disableBtn}>Pay now</button>
            </form>
        </div>
    )
};