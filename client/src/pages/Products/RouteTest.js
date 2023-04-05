import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

export default function RouteTest() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [show, setShow] = React.useState('');
    const { loading, error, data } = useFetch(`http://localhost:1337/api/products?populate=*`);

    if (loading) {
        <p>Loading...</p>
    }
    if (error) {
        <p>Error :(</p>
    }

    const typeFilter = searchParams.get(show);
    // const params = Object.fromEntries([...searchParams]);
    // console.log(params);
    const displayedProducts = typeFilter
        ? data.filter(item => item.attributes[show] === typeFilter)
        : data;

    function handleFilterChange(key, value) {
        setShow(key);
        setSearchParams(prevParams => {
            prevParams.set(key, value)
            // prevParams.set({ key: 'name', order: 'ascending' })
            return prevParams;

        });
        // setSearchParams(prevParams => {
        //     if (value === null) {
        //         prevParams.delete(key)
        //     } else {
        //         prevParams.set(key, value)
        //     }
        //     return prevParams
        // })
    }

    const styles = {
        display: 'grid',
        gridTempleteColumns: 'repeat(4, 1fr)'
    }

    const productElement = displayedProducts.map(item => (
        <div
            state={{
                search: `?${searchParams.toString()}`,
                type: typeFilter
            }}
            key={item.id}
        >
            {/* <img src={"http://localhost:1337" + item.attributes.image_1.data.attributes.url} alt="" /> */}
            <h2>{item.attributes.name}</h2>
            <h2>{item.attributes.price}</h2>

        </div>
    ))
    console.log(Object.fromEntries([...searchParams]));

    return (
        <>
            <button
                onClick={() => handleFilterChange("brand", 'adidas')}
            >Adidas</button>
            <button
                onClick={() => handleFilterChange("brand", "Nike")}
            >Nike</button>
            <button
                onClick={() => handleFilterChange("brand", "Topshop")}
            >Topshop</button>
            {/* <button
                onClick={() => handleFilterChange('brand', null)}
            >clear filter</button> */}
            <button
                onClick={() => handleFilterChange("cat", 'dresses')}
            >dresses</button>
            <button
                onClick={() => handleFilterChange("cat", 'topwear')}
            >topwear</button>
            <button
                onClick={() => handleFilterChange("cat", 'sports')}
            >sportwear</button>
            <button
                onClick={() => setSearchParams('')}
            >clear filter</button>

            <div style={styles}>
                {productElement}
            </div>
        </>
    )
}