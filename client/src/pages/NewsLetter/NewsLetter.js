import React, { useState } from 'react';
import './NewsLetter.css';
import { toast } from 'react-toastify';

export default function NewsLetter() {

    const [email, setEmail] = useState('');

    const subscribedPopUp = () => {
        if (email.length > 8) {
            toast.success("Your are Subscribed!", {
                hideProgressBar: true
            });
        };
    }
    console.log(email);
    return (
        <div className="news-letter-container">
            <h1>NEWSLETTER SIGN UP</h1>
            <form action="">
                <input
                    type="email"
                    name='email'
                    placeholder='Enter your email'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                />
                <button onClick={subscribedPopUp} >Subscribe!</button>
            </form>
        </div>
    )
}