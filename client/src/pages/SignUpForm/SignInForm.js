import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInAuthUserWithEmailAndPassword, createUserDocumentFromAuth, signInWithGooglePopUp } from "../../utils/firebase/firebase.utils";
import { toast } from "react-toastify";


import { CompanyLogo } from "../../components/Header/Header";
import './FormFields.css';



const defaultFormFields = {
    email: '',
    password: ''
};

export default function SignInForm() {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;
    const navigate = useNavigate();


    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    const signInWithGoogle = async () => {
        await signInWithGooglePopUp();
        toast.success("Logged in successfully!", {
            hideProgressBar: true
        });
        navigate('/');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await signInAuthUserWithEmailAndPassword(email, password);
            toast.success("Logged in successfully!", {
                hideProgressBar: true
            });
            resetFormFields();
            navigate('/');
        } catch (error) {
            switch (error.code) {
                case "auth/wrong-password":
                    alert('incorrect password for email');
                    break;
                case "auth/user-not-found":
                    alert('no user associated with this email address');
                    break;
                default:
                    console.log(error);
            };
        };
    };

    return (
        <div className="singin-container">
            <div className='signin-company-logo'>
                <CompanyLogo />
            </div>
            <div className="sign-in-wrapper">
                <div className="sign-in">
                    <h2>SIGN IN</h2>
                    <form action="" onSubmit={handleSubmit}>
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
                        <button type="submit" className="signin-btn">SIGN IN</button>
                        <button onClick={signInWithGoogle} className="signin-btn google-btn" type="button">Sign in with Google</button>
                        <p>Become a CAS member: <Link to={'/signup'} className='registration-link'>Sign Up</Link ></p>
                    </form>
                </div>
            </div>
        </div>
    )
}