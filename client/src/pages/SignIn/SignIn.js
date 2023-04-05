import React, { useState } from "react";
import "./SignIn.css";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from 'react-icons/fc';
import { BsFacebook, BsApple } from 'react-icons/bs';
import { CompanyLogo } from "../../components/Header/Header";
import axios from 'axios';
import { storeUser } from "../../helpers";
import { toast } from "react-toastify";

const initialUser = {
    identifier: '',
    password: ''
};

export default function SignIn() {

    const [user, setUser] = useState(initialUser);
    const navigate = useNavigate();

    const handleChange = ({ target }) => {
        const { name, value } = target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value
        }));
    };


    const handleLogin = async () => {
        const url = `http://localhost:1337/api/auth/local`;
        try {
            if (user.identifier && user.password) {
                const { data } = await axios.post(url, user);

                if (data.jwt) {
                    storeUser(data);
                    toast.success("Logged in successfully!", {
                        hideProgressBar: true
                    });
                    setUser(initialUser);
                    navigate('/');
                };
            };
        } catch (error) {
            toast.error(error.massage, {
                hideProgressBar: true,
            });
        }
    }

    return (
        <div className="signin-container">
            <div className='signin-company-logo'>
                <CompanyLogo />
            </div>
            <div className="sign-in-wrapper">
                <div className="sign-in">
                    <h2>SIGN IN</h2>
                    <form action="">
                        <label htmlFor="">USER NAME</label>
                        <input
                            type='email'
                            name="identifier"
                            value={user.identifier}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="">PASSWORD:</label>
                        <input
                            type="password"
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                            required
                        />
                        <button className='signin-btn' onClick={handleLogin}>SIGN IN</button>
                        {/* <p>Forget password?</p> */}
                        <p>Click here for <Link to={'/registration'} className='registration-link'>Registration</Link ></p>
                    </form>
                </div>
            </div>
        </div>

    )
};

