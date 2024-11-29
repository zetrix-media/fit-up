// components/HeroSection.tsx
"use client";

import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="relative bg-gray-100">
      <div className="container mx-auto px-4 py-16 flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2">
          <h1 className="text-4xl font-bold mb-4">
            Classic Exclusive <br />
            <span className="text-yellow-500">Women&apos;s Collection</span>
          </h1>
          <p className="text-lg text-gray-700 mb-6">UPTO 40% OFF</p>
          <button className="bg-yellow-500 text-gray-900 px-6 py-3 rounded-lg font-bold">
            Shop Now
          </button>
        </div>
        <div className="lg:w-1/2">
          <Image
            src="/assets/hero-image.png" // Replace with your image URL
            alt="Women's Collection"
            width={500}
            height={500}
            className="rounded-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
