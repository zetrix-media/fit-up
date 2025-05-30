// components/HeroSection.tsx
"use client";

import Image from "next/image";

const HeroSection = () => {
  return (
    <section
      className="w-full flex items-center"
      style={{
        background: "linear-gradient(to right, #F8ED79, #FEDA0A)",
        height: "700px",
      }}
    >
      <div className="container mx-auto px-4 flex flex-col-reverse lg:flex-row items-center justify-between w-full h-full">
        <div className="lg:w-5/7 text-center lg:text-left">
          <p className="text-[#585858] text-xl mb-2">
            Precision in Every Stitch:
          </p>
          <h1 className="text-3xl md:text-6xl font-extrabold text-[#000000] leading-tight">
            Quality Medical Apparel for Healthcare Professionals
          </h1>
        </div>

        <div className="lg:w-1/2 flex justify-end items-end h-full">
          <Image
            src="/assets/hero-image.png"
            alt="Medical Professional"
            width={500}
            height={500}
            className="object-contain"
            style={{ objectPosition: "bottom" }}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
