import React from "react";
import "./Home.css";
import TrandingBrands from "../../components/TrandingBrands/TrandingBrands";
import OfferLinks from "../../components/OfferLinks/OfferLinks";
import FourColWomen from "../../components/FourColCards/FourColWomen";
import WomenBanner from "../../components/MainBanner/WomenBanner";
import FeaturedWomen from "../../components/Featured/FeaturedWomen";
import OfferBannerMiddle from "../../components/OfferBanner/OfferBannerMiddle";
import OfferBannerTop from "../../components/OfferBanner/OfferBannerTop";



export default function Home() {

    return (
        <main>
            <OfferLinks />
            <OfferBannerTop />
            <div className="home-main-banner">
                <WomenBanner />
            </div>
            <div className="home-featured-cards">
                <FourColWomen />
            </div>
            <OfferBannerMiddle />
            <div className="home-featured-cards">
                <FeaturedWomen />
            </div>
            <div className="home">
                <TrandingBrands />
            </div>
        </main>
    )
};