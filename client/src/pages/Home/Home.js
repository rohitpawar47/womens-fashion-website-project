import React from "react";
import "./Home.css";
import TrandingBrands from "../../components/TrandingBrands/TrandingBrands";
import OfferLinks from "../../components/OfferLinks/OfferLinks";
import FourColWomen from "../../components/FourColCards/FourColWomen";
import FourColMen from "../../components/FourColCards/FourColMen";
import WomenBanner from "../../components/MainBanner/WomenBanner";
import MenBanner from "../../components/MainBanner/MenBanner";
import FeaturedMen from "../../components/Featured/FeaturedMen";
import FeaturedWomen from "../../components/Featured/FeaturedWomen";
// import OfferBannerTop from "/Users/rohitpawar/Desktop/FE-projects/fashion-store/client/src/components/OfferBanner/OfferBannerTop.js"
import OfferBannerMiddle from "../../components/OfferBanner/OfferBannerMiddle";
import OfferBannerTop from "../../components/OfferBanner/OfferBannerTop";
import Socials from "../../components/Socials/Socials";
import useFetch from "../../hooks/useFetch";



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
            {/* <div className="home-main-banner">
                <MenBanner />
            </div>
            <div className="home-featured-cards">
                <FourColMen />
            </div> */}
            <OfferBannerMiddle />
            <div className="home-featured-cards">
                <FeaturedWomen />
                {/* <FeaturedMen /> */}
            </div>
            <div className="home">
                <TrandingBrands />
            </div>
        </main>
    )
};