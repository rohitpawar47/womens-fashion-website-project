import React from "react";
import { RxReset } from "react-icons/rx";
import { Link, useSearchParams } from "react-router-dom";

import ProductsImg from "../../components/ProductsImg/ProductsImg";
import ProductsFilter from "../../components/ProductsFilter/ProductsFilter";
import useFetch from "../../hooks/useFetch";
import useData from "../../hooks/useData";
import "./Products.css";


export function ProductCard({ data, button }) {

    const productCard = data.map(img => (
        <Link to={`/product/${img.id}`}
            // state={{
            //     search: `?${searchParams.toString()}`,
            //     type: typeFilter
            // }}
            key={img.id}
            className="product-card">
            <ProductsImg img={img} />
            <p className="product-name">{img.name}</p>
            <p className="product-price">${img.price}</p>
            {button}
        </Link>
    ))
    return (
        <>
            {productCard}
        </>
    )
}

export function PageItems({ data }) {
    return (
        <div className="total-item">
            {
                data.length > 0 ?
                    <p>{data.length} styles found</p> :
                    <p>There is no such type of category available for this brand.</p>
            }
        </div>
    )
}

export default function Products() {
    const [brandTitle, setBrandTitle] = React.useState('Brand');
    const [categoryTitle, setCategoryTitle] = React.useState('Category');
    const [sortTitle, setSortTitle] = React.useState('Sort');
    const [priceSorting, setPriceSorting] = React.useState('asc');
    const [readMore, setReadMore] = React.useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const { products } = useData();
    // const { loading, error, data } = useFetch(`http://localhost:1337/api/products?populate=*&sort=createdAt:ASC`);

    // if (loading) {
    //     <p>Loading...</p>
    // }
    // if (error) {
    //     <p>Error :(</p>
    // }


    const brandFilter = searchParams.get('brand');
    const catFilter = searchParams.get('category');
    const sorting = searchParams.get('sort');

    // const displayedProducts = brandFilter || catFilter ?
    //     data.filter((item) =>
    //         (!brandFilter || item.attributes.brand === brandFilter) &&
    //         (!catFilter || item.attributes.category === catFilter)) :
    //     data;

    // const sortedAndFilteredData = sorting ? (priceSorting === 'desc' ?
    //     displayedProducts.sort((a, b) => b.attributes.price - a.attributes.price) :
    //     displayedProducts.sort((a, b) => a.attributes.price - b.attributes.price)
    // ) : displayedProducts;

    const displayedProducts = brandFilter || catFilter ?
        products.filter((item) => (
            (!brandFilter || item.brand === brandFilter) &&
            (!catFilter || item.category === catFilter)
        )) :
        products;

    const sortedAndFilteredData = sorting ? (priceSorting === 'desc' ?
        displayedProducts.sort((a, b) => b.price - a.price) :
        displayedProducts.sort((a, b) => a.price - b.price)
    ) : displayedProducts;



    function handleBrands(key, value) {
        setBrandTitle(value);
        setSearchParams(prevParams => {
            if (value === null) {
                prevParams.delete(key)
            } else {
                prevParams.set(key, value)
            }
            return prevParams
        })
    };

    function handleCategories(key, value, cat) {
        setCategoryTitle(cat);
        setSearchParams(prevParams => {
            if (value === null) {
                prevParams.delete(key)
            } else {
                prevParams.set(key, value)
            }
            return prevParams
        })
    };

    function handleSorting(key, value, sor) {
        setSortTitle(sor);
        setPriceSorting(value);
        setSearchParams(prevParams => {
            if (value === null) {
                prevParams.delete(key)
            } else {
                prevParams.set(key, value)
            }
            return prevParams
        })
    };

    const resetWhole = () => {
        setSearchParams({});
        setBrandTitle('Brand');
        setCategoryTitle('Category');
        setSortTitle('Sort');
    };

    const sortUpAndDown =
        <nav className="large-drop">
            <button onClick={() => handleSorting('sort', 'asc', 'Price low to high')}>Price low to high</button>
            <button onClick={() => handleSorting('sort', 'desc', 'Price high to low')}>Price high to low</button>
            <button style={{ textDecoration: "underline" }} onClick={() => handleSorting('sort', null, 'Sort')}>Clear Filter</button>
        </nav>

    const categoryDropdown =
        <nav className="large-drop">
            <button onClick={() => handleCategories('category', 'top-wear', 'Tops')}>Tops</button>
            <button onClick={() => handleCategories('category', 'bottom-wear', 'Jeans & Trousers')}>Jeans & Trousers</button>
            <button onClick={() => handleCategories('category', 'shoes', 'Footwear')}>Footwear</button>
            <button onClick={() => handleCategories('category', 'dresses', 'Dresses')}>Dresses</button>
            <button onClick={() => handleCategories('category', 'outer-wear', 'Outerwear')}>Outerwear</button>
            <button onClick={() => handleCategories('category', 'accessories', 'Accessories')}>Accessories</button>
            <button onClick={() => handleCategories('category', 'face-body', 'Face + Body')}>Face + Body</button>
            <button style={{ textDecoration: "underline" }} onClick={() => handleCategories('category', null, 'Category')}>Clear Filter</button>
        </nav>


    const brandDropdown =
        <nav className="large-drop">
            <button onClick={() => handleBrands('brand', 'CAS DESIGN')}>CAS DESIGN</button>
            <button onClick={() => handleBrands('brand', 'Monki')}>Monki</button>
            <button onClick={() => handleBrands('brand', 'Topshop')}>Topshop</button>
            <button onClick={() => handleBrands('brand', 'Adidas')}>Adidas</button>
            <button onClick={() => handleBrands('brand', 'Puma')}>Puma</button>
            <button onClick={() => handleBrands('brand', 'The North Face')}>The North Face</button>
            <button onClick={() => handleBrands('brand', 'Never Fully Dressed')}>Never Fully Dressed</button>
            <button style={{ textDecoration: "underline" }} onClick={() => handleBrands('brand', null)}>Clear Filter</button>
        </nav>



    return (
        <div className="products-page">
            <div className="products-headline">
                <h2>Women's New in: Clothing </h2>
                <p>Want to update your wardrobe with the latest styles? Our edit of new-in clothing has all the latest trends in one place. Shop CAS DESIGN for</p> <p className={readMore ? "read-more" : ""}>everything from staple T-shirt dresses and jumpsuits to cool co-ords and statement pieces.Browse Topshop for an everyday wardrobe refresh, with trousers, shirts and versatile dresses on rotation. For experimental designs at the forefront of fashion, check out NEVER FULLY DRESSED's colour blocking and bold prints. Whether you're looking to reinvent your style or find a statement piece for your weekend wardrobe, our edit of new-in clothing will keep your 'fits feeling fresh.</p>

                <h3 type="button"
                    onClick={() => setReadMore(prevRead => !prevRead)}
                >{readMore ? 'View more' : "View less"}</h3>
            </div>

            <div className="products-filter-main">
                <div className="products-filter-center">
                    <nav className="large-filter">
                        <ProductsFilter
                            className="large-flex"
                            title={brandTitle}
                            defaultTitle='Brand'
                            filterDropdown={brandDropdown}
                        />
                        <ProductsFilter
                            className="large-flex"
                            title={categoryTitle}
                            defaultTitle='Category'
                            filterDropdown={categoryDropdown}
                        />
                        <ProductsFilter
                            className="large-flex"
                            title={sortTitle}
                            defaultTitle='Sort'
                            filterDropdown={sortUpAndDown}
                        />
                        <button
                            style={{
                                border: 'none',
                                cursor: 'pointer',
                                backgroundColor: 'transparent',
                                letterSpacing: '.2px',
                                textDecoration: 'underline',
                                borderTop: '1px solid rgb(216, 214, 214)',
                                borderBottom: '1px solid rgb(216, 214, 214)',
                                display: "flex",
                                justifyContent: "center",
                                alignItems: 'center',
                                gap: ".3em"
                            }}
                            onClick={resetWhole}><RxReset /> <p>Reset</p></button>
                    </nav>
                </div>
            </div>

            {products.length > 0 ?
                <>
                    <PageItems data={sortedAndFilteredData} />
                    <div className="products-wrapper">
                        <div className="products"
                        >
                            <ProductCard
                                data={sortedAndFilteredData}
                            />
                        </div>
                    </div>
                </> :
                <h1>Loading...</h1>
            }

        </div>
    )
};