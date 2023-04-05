import React from "react";
import "./Products.css";
import { Link, useParams, useSearchParams } from "react-router-dom";
import ProductsImg from "../../components/ProductsImg/ProductsImg";
import ProductsFilter from "../../components/ProductsFilter/ProductsFilter";
import ProductsFilterMob from "../../components/ProductsFilterMob/ProductsFilterMob";
import useFetch from "../../hooks/useFetch";
import { Context } from "../../AppContext";

export function ProductCard({ data, button }) {

    const productCard = data.map(img => (
        <Link to={`/product/${img.id}`}
            key={img.id}
            className="product-card">
            <ProductsImg img={img} />
            <p className="product-name">{img.attributes.name}</p>
            <p className="product-price">${img.attributes.price}</p>
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
            <p>{data?.length} styles found</p>
        </div>
    )
}

export default function OldProductsPage() {
    const params = useParams();
    const { id } = params;
    const [readMore, setReadMore] = React.useState(true);
    // const [searchParams, setSearchParams] = useSearchParams();
    const {
        titleToSort,
        ascending,
        changeSort,
        priceGreater,
        priceLesser,
        priceAmountAbove,
        priceAmountBelow,
        priceFilter
    } = React.useContext(Context);

    const { loading, error, data } = useFetch(`http://localhost:1337/api/products?filters[$and][0][sub_categories][id][$eq]=${id}&populate=*&sort=${titleToSort}:${ascending}&filters[$and][0][price][$${priceLesser}]=${priceAmountBelow}&filters[$and][0][price][$${priceGreater}]=${priceAmountAbove}`);

    if (loading) {
        <p>Loading...</p>
    }
    if (error) {
        <p>Error :(</p>
    }

    // const typeFilter = searchParams.get("brand");
    // const displayedItems = typeFilter
    //     ? data.filter(item => item.attributes.brand === typeFilter)
    //     : data;
    // console.log(searchParams);
    // function handleFilterChange(key, value) {
    //     setSearchParams(prevParams => {
    //         if (value === null) {
    //             prevParams.delete(key)
    //         } else {
    //             prevParams.set(key, value)
    //         }
    //         return prevParams
    //     })
    // }
    function brandFilter(brand) {
        const dataFilter = data.filter(i => i.attributes.brand === brand);
        return dataFilter;
    }

    // console.log(brandFilter('Nike'));

    const sortDrop =
        <nav className="click-head-dropdown">
            <Link to={`/products/19`}>Recommended</Link>
            <Link to={"/products/19"}
                onClick={() => changeSort('brand', 'DESC')}>
                What's new</Link>
            <Link to={"/products/19"}
                onClick={() => changeSort('price', 'DESC')}
            >Price high to low</Link>
            <Link to={"/products/19"}
                onClick={() => changeSort('price', 'ASC')}
            >Price low to high</Link>
        </nav>


    const filterDrop =
        <nav className="click-head-dropdown">
            <Link to={'/products/1'}>Top wear</Link>
            <Link to={'/products/2'}>Bottom wear</Link>
            <Link to={'/products/3'}>Shoes</Link>
            <Link to={'/products/5'}>Dresses</Link>
            <Link to={'/products/6'}>Sports</Link>
            <Link to={'/products/7'}>Accessories</Link>
            <Link to={'/products/8'}>Face + Body</Link>
        </nav>



    const recommendedDropdown =
        <nav className="large-drop">
            <Link to={`/products/19`}
                onClick={() => changeSort('name', 'ASC')}
            >Recommended</Link>
            <Link to={"/products/19"}
                onClick={() => changeSort('brand', 'DESC')}>
                What's new</Link>
            <Link to={"/products/19"}
                onClick={() => changeSort('price', 'DESC')}
            >Price high to low</Link>
            <Link to={"/products/19"}
                onClick={() => changeSort('price', 'ASC')}
            >Price low to high</Link>
        </nav>

    const categoryDropdown =
        <nav className="large-drop">
            <Link to={'/products/1'}>Top wear</Link>
            <Link to={'/products/2'}>Bottom wear</Link>
            <Link to={'/products/3'}>Shoes</Link>
            <Link to={'/products/5'}>Dresses</Link>
            <Link to={'/products/6'}>Sports wear</Link>
            <Link to={'/products/7'}>Accessories</Link>
            <Link to={'/products/8'}>Face + Body</Link>
        </nav>


    const brandDropdown =
        <nav className="large-drop">
            <Link to={"/products/11"}>CAS DESIGN</Link>
            <Link to={"/products/12"} >Monkl</Link>
            <Link to={"/products/13"}>Topshop</Link>
            <Link to={"/products/18"}>Vero Moda</Link>
            <Link to={"#"} onClick={() => brandFilter('Nike')}>Nike</Link>
            <Link to={"/products/17"}>Adidas</Link>
            <Link to={"/products/15"}>Puma</Link>
            <Link to={"/products/16"}>Under Armour</Link>
            <Link to={"/products/20"}>Reclaimed Vintage</Link>
        </nav>

    const priceDropdown =
        <nav className="large-drop">
            <Link to={"/products/19"}
                onClick={() => priceFilter(100, 200)}
            >$100 and above</Link>
            <Link to={"/products/19"}
                onClick={() => priceFilter(70, 100)}
            >$70 - $100</Link>
            <Link to={"/products/19"}
                onClick={() => priceFilter(50, 70)}
            >$50 - $70</Link>
            <Link to={"/products/19"}
                onClick={() => priceFilter(20, 50)}
            >$20 - $50</Link>
            <Link to={"#"}
                onClick={() => priceFilter(0, 20)}
            >Less than $20</Link>

        </nav>

    return (
        <div className="products-page">
            <div className="products-headline">
                <h2>Women's New in: Clothing</h2>
                <p>Want to update your wardrobe with the latest styles? Our edit of new-in clothing has all the latest trends in one place. Shop CAS DESIGN for</p> <p className={readMore ? "read-more" : ""}>everything from staple T-shirt dresses and jumpsuits to cool co-ords and statement pieces.Browse Topshop for an everyday wardrobe refresh, with trousers, shirts and versatile dresses on rotation. For experimental designs at the forefront of fashion, check out COLLUSION's colour blocking and bold prints. Whether you're looking to reinvent your style or find a statement piece for your weekend wardrobe, our edit of new-in clothing will keep your 'fits feeling fresh.</p>

                <h3 type="button"
                    onClick={() => setReadMore(prevRead => !prevRead)}
                >{readMore ? 'View more' : "View less"}</h3>

            </div>

            <div className="products-filter-main">
                <div className="products-filter-center">
                    <nav className="small-filter">
                        <ProductsFilterMob
                            title="SORT"
                            filterDropdown={sortDrop}
                        />
                        <ProductsFilterMob
                            title="FILTER"
                            filterDropdown={filterDrop}
                        />
                    </nav>


                    <nav className="large-filter">
                        <ProductsFilter
                            // id={id}
                            className="large-flex"
                            title="Sort"
                            filterDropdown={recommendedDropdown}
                        />
                        <ProductsFilter
                            className="large-flex"
                            title="Category"
                            filterDropdown={categoryDropdown}
                        />
                        <ProductsFilter
                            className="large-flex"
                            title="Brand"
                            filterDropdown={brandDropdown}
                        />
                        <ProductsFilter
                            className="large-flex"
                            title="Price Range"
                            filterDropdown={priceDropdown}
                        />
                    </nav>
                </div>
            </div>

            <PageItems data={data} />


            <div className="products-wrapper">
                <div className="products"
                >
                    <ProductCard data={data} />
                </div>
            </div>

        </div>
    )
};