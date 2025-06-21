// components/HeroSection.tsx
"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import classNames from "classnames";

type Slide = {
  id: number;
  bg: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  button: {
    label: string;
    url: string;
    className?: string;
  };
};

const slides: Slide[] = [
  {
    id: 1,
    bg: "linear-gradient(to right, #F8ED79, #FEDA0A)",
    title: "Quality Medical Apparel for Healthcare Professionals",
    subtitle: "Precision in Every Stitch:",
    imageUrl: "/assets/hero-image.png",
    button: {
      label: "Shop Now",
      url: "/shop",
      className: "bg-black text-white",
    },
  },
  {
    id: 2,
    bg: "linear-gradient(to right, #FFD6E8, #FF69B4)",
    title: "Designed for Comfort, Built for Performance",
    subtitle: "Trusted by Thousands of Medical Pros:",
    imageUrl: "/assets/hero-image.png",
    button: {
      label: "Explore Collection",
      url: "/collection",
      className: "bg-white text-black border border-black",
    },
  },
  {
    id: 3,
    bg: "linear-gradient(to right, #D1FFF3, #4BE1C0)",
    title: "Engineered for Everyday Excellence",
    subtitle: "Smart Fit. Lasting Style.",
    imageUrl: "/assets/hero-image.png",
    button: {
      label: "Browse Styles",
      url: "/styles",
      className: "bg-black text-white",
    },
  },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    if (index >= 0 && index < slides.length) {
      setCurrent(index);
    }
  };

  const goToPrev = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (
      touchStartX.current !== null &&
      touchEndX.current !== null &&
      Math.abs(touchStartX.current - touchEndX.current) > 50
    ) {
      if (touchStartX.current > touchEndX.current) {
        goToNext();
      } else {
        goToPrev();
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section
      className="relative overflow-hidden w-full h-[700px]"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slide Container */}
      <div
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{
          width: `${slides.length * 100}vw`,
          transform: `translateX(-${current * 100}vw)`,
        }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="w-screen flex items-center justify-center"
            style={{
              background: slide.bg,
              height: "700px",
            }}
          >
            <div className="container mx-auto px-4 flex flex-col-reverse lg:flex-row items-center justify-between w-full h-full">
              {/* Text Section */}
              <div className="w-full lg:w-3/5 flex flex-col justify-center text-center lg:text-left order-2 lg:order-1 pt-10 lg:pt-0">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-[#000000] leading-tight mb-4 order-1">
                  {slide.title}
                </h1>
                <p className="text-[#585858] text-lg mb-4 order-2">{slide.subtitle}</p>
                <div className="order-3">
                  <a
                    href={slide.button.url}
                    className={classNames(
                      "inline-block px-8 py-3 font-semibold rounded-md text-sm sm:text-base transition-all duration-300",
                      slide.button.className
                    )}
                  >
                    {slide.button.label}
                  </a>
                </div>
              </div>

              {/* Image Section */}
              <div className="w-full lg:w-2/5 flex justify-center lg:justify-end items-end h-full order-1 lg:order-2">
                <Image
                  src={slide.imageUrl}
                  alt={slide.title}
                  width={500}
                  height={500}
                  className="object-contain"
                  style={{ objectPosition: "bottom" }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrev}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 border-2 border-black rounded-full w-10 h-10 flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors duration-300 z-10"
        aria-label="Previous Slide"
      >
        ‹
      </button>
      <button
        onClick={goToNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 border-2 border-black rounded-full w-10 h-10 flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors duration-300 z-10"
        aria-label="Next Slide"
      >
        ›
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className={classNames(
              "w-4 h-4 rounded-full border border-black transition-all duration-300",
              {
                "bg-black": i === current,
                "bg-transparent hover:bg-black": i !== current,
              }
            )}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
