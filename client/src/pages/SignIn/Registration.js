import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import './SignIn';
import { CompanyLogo } from "../../components/Header/Header";
import axios from "axios";
import { toast } from "react-toastify";

const initialUserRegister = {
    username: "",
    email: "",
    password: "",
    // confirmed: ""
};


export default function Registration() {

    const [user, setUser] = useState(initialUserRegister);
    const navigate = useNavigate();

    const signUp = async (e) => {
        if ((user.password).length < 8) {
            alert("Minimum charactor 8!")
            e.preventDefault();
        } else if ((user.password).length >= 8) {
            try {
                const url = `http://localhost:1337/api/auth/local/register`;
                if (user.username && user.email && user.password) {
                    navigate("/signin");
                    console.log("Registered successfully!");
                    toast.success("Registered successfully!", {
                        hideProgressBar: true,
                    });
                    const res = await axios.post(url, user);
                    if (res) {
                        setUser(initialUserRegister);
                    }

                };
            } catch (error) {
                toast.error(error.message, {
                    hideProgressBar: true,
                });
            };
        }

    };


    const handleUserChange = ({ target }) => {
        const { name, value } = target;
        setUser((currentUser) => ({
            ...currentUser,
            [name]: value,
        }));
    };


    return (
        <div className="singin-container">
            <div className='signin-company-logo'>
                <CompanyLogo />
            </div>
            <div className="sign-in-wrapper">
                <div className="sign-in">
                    <h2>SIGN UP</h2>
                    <form action="">
                        <label htmlFor="">USER NAME</label>
                        <input
                            type="text"
                            name="username"
                            value={user.username}
                            onChange={handleUserChange}
                            required
                        />
                        <label htmlFor="">EMAIL ADDRESS:</label>
                        <input
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleUserChange}
                            required
                        />
                        <label htmlFor="">PASSWORD:</label>
                        <input
                            type="password"
                            name="password"
                            value={user.password}
                            onChange={handleUserChange}
                            required
                        />
                        {/* <label htmlFor="">CONFIRM PASSWORD:</label> */}
                        {/* <input
                        type="password"
                        name="confirmed"
                        value={user.confirmed}
                        onChange={handleUserChange}
                    /> */}
                        <button className='signin-btn' onClick={signUp}>JOIN CAS</button>
                        <p>Go back to <Link to={'/signin'} className='registration-link'>Sign In</Link ></p>
                    </form>
                </div>
            </div>
        </div>
    )
};