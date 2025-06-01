// app/page.tsx
import React from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ShopByCategories from "@/components/ShopByCategories";
import LatestProducts from "@/components/LatestProducts";
import OfferBanner from "@/components/OfferBanner";
import NewArrivals from "@/components/NewArrivals";
import BrandLogos from "@/components/BrandLogos";
// import BestSellers from "@/components/BestSellers";
import Footer from "@/components/Footer";

const HomePage = () => {
  return (
    <div style={{ backgroundColor: "#fff" }}>
      {/* hello */}
      <Navbar />
      <HeroSection />
      <ShopByCategories />
      <LatestProducts />
      <OfferBanner />
      <NewArrivals />
      <BrandLogos />
      {/* <BestSellers /> */}

      <Footer />
    </div>
  );
};

export default HomePage;
