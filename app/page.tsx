// app/page.tsx
import React from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ShopByCategories from "@/components/ShopByCategories";
import LatestProducts from "@/components/LatestProducts";
import BestSellers from "@/components/BestSellers";
import Footer from "@/components/Footer";

const HomePage = () => {
  return (
    <div>
      {/* hello */}
      <Navbar />
      <HeroSection />
      <ShopByCategories />
      <LatestProducts />
      <BestSellers />
      <Footer />
    </div>
  );
};

export default HomePage;
