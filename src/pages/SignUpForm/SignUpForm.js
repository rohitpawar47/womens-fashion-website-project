import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import { toast } from "react-toastify";

import { CompanyLogo } from "../../components/Header/Header";


import './FormFields.css';


const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
};

export default function SignUpForm() {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;
    const navigate = useNavigate();

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("Password do not match");
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            createUserDocumentFromAuth(user, { displayName })
            toast.success("Registered successfully!", {
                hideProgressBar: true,
            });

            resetFormFields();
            navigate('/signin');
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('Cannot create user, email already in use');
            } else {
                console.log('user creation encountered an error', error);
            }
        }

    };
    return (
        <div className="singin-container">
            <div className='signin-company-logo'>
                <CompanyLogo />
            </div>
            <div className="sign-in-wrapper">
                <div className="sign-in">
                    <h2>SIGN UP</h2>
                    <form action="" onSubmit={handleSubmit}>
                        <label htmlFor="">USER NAME</label>
                        <input
                            type="text"
                            name="displayName"
                            value={displayName}
                            onChange={handleChange}
                            required />

                        <label htmlFor="">EMAIL</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            required />

                        <label htmlFor="">PASSWORD</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={handleChange}
                            required />

                        <label htmlFor="">CONFIRM PASSWORD</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={handleChange}
                            required />
                        <button type="submit" className="signin-btn">JOIN CAS</button>
                        <p>Already have an account, Click for <Link to={'/signin'} className='registration-link'>Sign In</Link ></p>
                    </form>
                </div>
            </div>
        </div>
    )
}