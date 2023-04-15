import React from "react";
import './Favourite.css';
import { Context } from "../../contexts/AppContext";
import { PageItems, ProductCard } from "../Products/Products";

export default function Favourite() {
    const { favourite } = React.useContext(Context);

    return (
        <>
            {
                favourite.length > 0 ?
                    < div className="fav-page-wrapper" >
                        <div className="saved-items">Saved Items</div>
                        <div style={{ marginBottom: '2em' }}>
                            <PageItems data={favourite} />
                        </div>
                        <div className="fav-grid">
                            <ProductCard
                                data={favourite}
                                button={
                                    <button
                                        className="move-to-bag-btn">OPEN PRODUCT
                                    </button>} />
                        </div>
                    </div > :
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                        letterSpacing: '1px'
                    }}>
                        <h1>No saved item</h1>
                    </div>

            }
        </>
    )
};