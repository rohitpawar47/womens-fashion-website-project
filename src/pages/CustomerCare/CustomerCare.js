import './CustomerCare.css';
import { BiPhoneCall } from "react-icons/bi";

export default function CustomerCare() {
    return (
        <div className="customer-care-container">
            <h1>Welcome to Customer Service</h1>
            <div className="contact-wrapper">
                <p>Contact us on our toll free number:</p>
                <p><BiPhoneCall className='phone' /> 8000090000</p>
            </div>
        </div>
    )
};