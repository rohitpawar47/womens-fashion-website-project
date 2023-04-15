import React from "react";
import useFetch from "../../hooks/useFetch";
import { Link, useParams } from "react-router-dom";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RiHeart3Line, RiHeart3Fill } from "react-icons/ri";
import { TbTruckDelivery } from "react-icons/tb";
import { Context } from "../../contexts/AppContext";
import ProductDetails from "../../components/ProductDetails/ProductDetails";
import "./Product.css";
import OfferLinks from "../../components/OfferLinks/OfferLinks";
import { toast } from "react-toastify";
import useData from "../../hooks/useData";


// export function PopUp({ data, bagPopUp }) {

//     const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 767);

//     React.useEffect(() => {
//         function handleResize() {
//             setIsMobile(window.innerWidth <= 767);
//         };

//         window.addEventListener('resize', handleResize);

//         return () => {
//             window.removeEventListener('resize', handleResize);
//         }
//     }, [])

//     function whatToShow() {
//         if (isMobile) {
//             return <div className={`cart-comp-mob ${bagPopUp ? "cart-comp-open" : ""}`} key={data.id}>
//                 <div className="pop-image-mob">
//                     <img src={"http://localhost:1337" + data?.attributes?.image_1?.data?.attributes?.url} alt="" />
//                 </div>
//             </div>
//         } else {
//             return <div className={`cart-comp-desk ${bagPopUp ? "cart-comp-open" : ""}`} key={data.id}>
//                 <div className="pop-image">
//                     <img src={"http://localhost:1337" + data?.attributes?.image_1?.data?.attributes?.url} alt="" />
//                 </div>
//                 <div className="pop-details">
//                     <p className="single-product-name">{data?.attributes?.name}</p>
//                     <p className="single-product-name">${data?.attributes?.price}</p>
//                 </div>
//             </div>
//         }
//     }


//     return (<>{whatToShow()}</>)
// }

export function ProductSize() {
    const { sizeQtyHandler } = React.useContext(Context);
    return (
        <>
            <p className="single-product-size">SIZE:</p>
            <div className='size-wrapper'>
                <select name="size" id="size" className="size-drop"
                    onChange={sizeQtyHandler}
                    required>
                    <option value="">Please select </option>
                    <option value="S" >S</option>
                    <option value="M" >M</option>
                    <option value="L" >L</option>
                </select>
                <RiArrowDropDownLine className="size-down-arrow" />
            </div>
        </>
    )
}

export default function Product() {
    const [singleProduct, setSingleProduct] = React.useState();
    const [showImage, setShowImage] = React.useState("image_1");
    const { cart, addToCart, favourite, addToFav, removeFav, size } = React.useContext(Context);
    const singleId = useParams();
    const { products } = useData();

    React.useEffect(() => {
        const singleData = products.filter(i => i.id == singleId.id);
        setSingleProduct(...singleData);
    }, [products])

    function newProductSize() {
        if (singleProduct?.category === 'accessories' ||
            singleProduct?.category === 'face-body') {
            return <p className="single-product-size">SIZE: One Size</p>
        } else {
            return <ProductSize />
        }
    }

    function addToCartAndPopUp() {

        if (size) {
            addToCart(singleProduct, size);
            toast.success("Added to your cart!", {
                hideProgressBar: true
            });
        }
        else if (singleProduct?.category === 'accessories' ||
            singleProduct?.category === 'face-body') {
            addToCart(singleProduct, size);
            toast.success("Added to your cart!", {
                hideProgressBar: true
            });
        }
        else {
            alert("Please select size");
        }
    }

    function forFaceAndBody() {
        if (
            singleProduct?.category === 'accessories' ||
            singleProduct?.category === 'face-body'
        ) {
            alert('This item is already in the bag');
        }
        else {
            alert(`Size '${size}' is already in the bag for this product`);
        }

    }


    function addToCartBtn() {
        const alreadyInCart = cart.some(i => i.item.id === singleProduct?.id && i.size === size);
        if (alreadyInCart) {
            return <Link to={`/product/${singleId.id}`} className="add-to-bag-btn"
                onClick={() => forFaceAndBody()}
            >ADD TO BAG</Link>
        } else {
            return <Link to={`/product/${singleId.id}`} className="add-to-bag-btn"
                onClick={() => addToCartAndPopUp()}
            >ADD TO BAG</Link>
        }
    }

    function favIcon() {
        const alreadyFav = favourite.some(item => item.id === singleProduct?.id);
        if (alreadyFav) {
            return <RiHeart3Fill onClick={() => removeFav(singleProduct?.id)} />
        } else {
            return <RiHeart3Line onClick={() => addToFav(singleProduct)} />
        }
    }

    const imageSlider =
        <div className="image-slide">
            <img src={singleProduct?.image_1} alt="" onClick={() => setShowImage("image_1")} />
            <img src={singleProduct?.image_2} alt="" onClick={() => setShowImage("image_2")} />
            <img src={singleProduct?.image_3} alt="" onClick={() => setShowImage("image_3")} />
            <img src={singleProduct?.image_4} alt="" onClick={() => setShowImage("image_4")} />
        </div>


    const productDetailsDrop =
        <div className="productDetailsDrop">
            <p className="drop-title"><Link to={"#"} className="link-brand">Clothing</Link> by <Link to={"#"} className="link-brand">{singleProduct?.brand}</Link></p>
            <ul className="drop-list">
                <li>All other dresses can go home</li>
                <li>Casual wear</li>
                <li>Blended cotton</li>
                <li>Machine wash</li>
                <li>Dry clean</li>
                <li>Regular fit</li>
            </ul>
            <p>Product Code: 121427286</p>
        </div>

    const brandDetailsDrop =
        <p>This is <Link to={"#"} className="link-brand" >{singleProduct?.brand}</Link> - your go-to for all the latest trends, no matter who you are, where you're from and what you're up to. Exclusive to <Link to={"#"} className="link-brand" >{singleProduct?.brand}</Link>, our universal brand is here for you, and comes in all our fit ranges: <Link to={"#"} className="link-brand" >{singleProduct?.brand}</Link>, Tall, Petite and Maternity. Created by us, styled by you.</p>

    const sizeDetailsDrop =
        <p>Model wears: UK 8/ EU 36/ US 4 <br />
            Model's height: 170.5cm/5'7"</p>

    const careDetailsDrop =
        <p>Dry clean & Machine wash</p>

    const aboutDetailsDrop =
        <p>Satin-style fabric: glossy, drapey and silky-smooth
            <br />
            Lining: 100% Polyester, Shell: 100% Viscose.</p>

    return (
        <>
            <div style={{ marginBottom: '2em' }}>
                <OfferLinks />
            </div>
            {singleProduct ?
                <div className="single-product-wrapper">

                    <div className="single-product"
                        key={singleProduct?.id}>
                        <div className="single-product-images">
                            {imageSlider}
                            <img src={singleProduct?.[showImage]} alt="" />
                        </div>
                        <div className="single-product-details">
                            <p className="single-product-name">{singleProduct?.name}</p>
                            <p className="single-product-brand">{singleProduct?.brand}</p>
                            <p className="single-product-price">${singleProduct?.price}</p>
                            {newProductSize()}
                            <div className="add-to-bag">
                                {addToCartBtn()}
                                <div className="fav-wrapper">
                                    {favIcon()}
                                </div>
                            </div>
                            {/* <>
                            {bagPopUp &&
                                <>
                                <PopUp data={data} bagPopUp={bagPopUp} />
                                </>
                            }
                        </> */}
                            <div className="delivery-box">
                                <TbTruckDelivery />
                                <div className="tnc">
                                    <p>Free Delivery.</p>
                                    <p>Ts&Cs apply. <span>More delivery info</span></p>
                                </div>
                            </div>
                            <div className="details">
                                <ProductDetails
                                    title="Product Details"
                                    productDetailsDrop={productDetailsDrop}
                                />
                                <ProductDetails
                                    title="Brand"
                                    brandDetailsDrop={brandDetailsDrop}
                                />
                                <ProductDetails
                                    title="Size & Fit"
                                    sizeDetailsDrop={sizeDetailsDrop}
                                />
                                <ProductDetails
                                    title="Look After Me"
                                    careDetailsDrop={careDetailsDrop}
                                />
                                <ProductDetails
                                    title="About Me"
                                    aboutDetailsDrop={aboutDetailsDrop}
                                />
                            </div>
                        </div>

                    </div>
                </div> :
                <h1>Loading...</h1>
            }
        </>
    )
}
