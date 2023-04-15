import React from "react";
import "./ProductDetails.css";
import { Link } from "react-router-dom";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

export default function ProductDetails(props) {

    const [open, setOpen] = React.useState(false);

    function openHandler() {
        setOpen(prev => !prev);
    }

    // const linkBrand = <Link to={"#"} className="link-brand">CAS</Link>

    return (
        <div>
            <div className="detail-top"
                onClick={openHandler}>
                <p>{props.title}</p>
                {open ? <AiOutlineMinus /> : <AiOutlinePlus />}
            </div>


            {
                open &&
                <div className="details-drop">
                    {props.productDetailsDrop}
                    {props.brandDetailsDrop}
                    {props.sizeDetailsDrop}
                    {props.careDetailsDrop}
                    {props.aboutDetailsDrop}
                </div>
            }

        </div>
    )
};