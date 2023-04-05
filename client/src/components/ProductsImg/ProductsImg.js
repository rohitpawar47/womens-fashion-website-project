import React from "react";
import { Context } from "../../AppContext";
import { NavLink } from "react-router-dom";
import { RiHeart3Line, RiHeart3Fill } from "react-icons/ri";
import useHover from "../../hooks/useHover";
import "./ProductsImg.css";


export default function ProductsComp({ img }) {
    const [hovered, ref] = useHover();
    const { favourite, addToFav, removeFav } = React.useContext(Context);
    function heartIcon() {
        const alreadyFav = favourite.some(item => item.id === img.id);
        if (alreadyFav) {
            return <p onClick={(e) => e.preventDefault()}>
                <RiHeart3Fill onClick={() => removeFav(img.id)} />
            </p>
        } else {
            return <p onClick={(e) => e.preventDefault()}>
                <RiHeart3Line onClick={() => addToFav(img)} />
            </p>
        }
    }

    function imageHovered() {
        if (hovered) {
            return <img
                className="product-images"
                src={"http://localhost:1337" + img?.attributes?.image_2?.data?.attributes?.url}
                alt="" />
        } else {
            return <img
                className="product-images"
                src={"http://localhost:1337" + img?.attributes?.image_1?.data?.attributes?.url}
                alt="" />
        }
    };

    const sellingFast =
        <>
            {(img?.attributes?.new_in)
                &&
                <div className="selling-fast">
                    <p>SELLING FAST</p>
                </div>
            }
        </>


    return (
        <div className="product-images-container">
            <div ref={ref}>
                {imageHovered()}
            </div>
            <div className="heart-wrapper">
                {heartIcon()}
            </div>
            {sellingFast}
        </div>
    )
}