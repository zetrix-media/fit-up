// components/HeroSlider.jsx
'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';
import Image from 'next/image';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

const heroImages = [
  {
    src: '/assets/heroImg1.png',
    alt: 'Medical professional in white and light blue scrubs',
    title: 'Style in Every Stitch',
    description: 'Modern fits, vibrant colors, and durable fabrics – built for the demands of healthcare.',
    imagePosition: 'right',
  },
  {
    src: '/assets/heroImg2.png',
    alt: 'Two medical professionals in red and blue scrubs',
    title: 'Comfort Meets Care',
    description: 'Premium Medical Uniforms for Everyday Heroes',
    imagePosition: 'right',
  },
  {
    src: '/assets/heroImg3.png',
    alt: 'Medical professional in light blue scrubs and mask',
    title: 'Gear Up with Confidence',
    description: 'From hospitals to home care, our uniforms deliver performance, comfort, and confidence.',
    imagePosition: 'right',
  },
];

const HeroSlider = () => {
  return (
    <div className="hero-slider-wrapper">
      <Swiper
        modules={[Navigation, Pagination, A11y, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        className="mySwiper"
      >
        {heroImages.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="hero-slide-content">
              {/* Text Content */}
              <div className="hero-text-container">
                <h1 className="hero-title">{slide.title}</h1>
                <p className="hero-description">{slide.description}</p>
                <button className="shop-now-button">SHOP NOW</button>
              </div>

              {/* Image Container */}
              <div className={`hero-image-container image-${slide.imagePosition}`}>
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  // Removed fixed width/height here; will control via CSS for better responsiveness
                  // Use fill layout with objectFit for desktop image positioning
                  layout="fill"
                  objectFit="contain" // Ensures image fits within bounds
                  objectPosition="bottom right" // Sticks to bottom and right
                  quality={90}
                  // Responsive sizing for image within its container (Next.js optimizes based on this)
                  sizes="(max-width: 768px) 80vw, (max-width: 1024px) 60vw, 55vw"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        /* --- General Layout and Background Gradient --- */
        .hero-slider-wrapper {
          width: 100%;
          height: 80vh; /* Fixed height for desktop */
          position: relative;
          overflow: hidden;
          background: linear-gradient(to right, #e0f2f7, #c6e7f1);
          display: flex;
          align-items: center;
        }

        .mySwiper {
          width: 100%;
          height: 100%;
        }

        /* --- Slide Content Layout (Text and Image) --- */
        .hero-slide-content {
          display: flex;
          align-items: center; /* Vertically centers content within this flex container */
          justify-content: space-between;
          width: 100%;
          height: 100%; /* Important: Takes full height of swiper-slide */
          position: relative; /* For absolute positioning of image */
          padding: 0 8%;
          box-sizing: border-box;
        }

        /* --- Text Container --- */
        .hero-text-container {
          z-index: 10;
          color: #212529;
          max-width: 70%; /* Adjusted for desktop layout */
          flex-shrink: 0;
          position: relative;
          padding-left: 2%; /* Fine-tuning text position */
        }

        .hero-title {
          font-size: 3.5em;
          font-weight: 700;
          margin-bottom: 20px;
        }

        .hero-description {
          font-size: 1.5em;
          margin-bottom: 30px;
          line-height: 1.5;
        }

        .shop-now-button {
          background-color: #ffffff;
          color: #212529;
          border: 1px solid #ced4da;
          padding: 15px 30px;
          font-size: 1.2em;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
          border-radius: 5px;
        }

        .shop-now-button:hover {
          background-color: #e9ecef;
          border-color: #adb5bd;
        }

        /* --- Image Container (Desktop) --- */
        .hero-image-container {
          position: absolute; /* Absolute positioning for desktop */
          bottom: 0; /* Stick to bottom */
          right: 8%; /* Adjust from right edge */
          width: 55%; /* Control width */
          height: 100%; /* Allows image to take full vertical space to align to bottom */
          z-index: 5;
          pointer-events: none;
          margin-right: -5%; /* Overflow effect */
        }

        /* Next.js Image with layout="fill" inside .hero-image-container */
        .hero-image-container img {
          /* No direct width/height needed here as layout="fill" takes over */
          /* object-fit and object-position are passed directly to Image component */
        }

        /* --- Swiper Navigation Button Styles --- */
        .swiper-button-next,
        .swiper-button-prev {
          color: #007bff;
          background-color: rgba(255, 255, 255, 0.7);
          border-radius: 50%;
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.3s ease;
          top: 50%;
          transform: translateY(-50%);
        }
        .swiper-button-prev {
            left: 20px;
        }
        .swiper-button-next {
            right: 20px;
        }

        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          background-color: rgba(255, 255, 255, 1);
        }

        .swiper-button-next::after,
        .swiper-button-prev::after {
          font-size: 1.5em !important;
        }

        /* --- Swiper Pagination Styles --- */
        .swiper-pagination-bullet {
          background-color: #ced4da;
          opacity: 1;
        }

        .swiper-pagination-bullet-active {
          background-color: #007bff;
        }

        /* --- Responsive Adjustments --- */
        @media (max-width: 1024px) {
          .hero-slide-content {
            padding: 0 5%;
          }
          .hero-text-container {
            max-width: 50%;
            padding-left: 0;
          }
          .hero-image-container { /* Updated for 1024px */
            right: 5%;
            width: 60%;
            margin-right: -3%;
          }
          .hero-title {
            font-size: 3em;
          }
          .hero-description {
            font-size: 1.3em;
          }
          .swiper-button-prev { left: 10px; }
          .swiper-button-next { right: 10px; }
        }

        @media (max-width: 768px) {
          .hero-slider-wrapper {
            height: auto; /* Allow height to be determined by content on mobile */
            min-height: 50vh; /* Ensure a minimum height */
          }
          .mySwiper {
            height: auto; /* Allow Swiper to adapt height to current slide */
            min-height: 50vh; /* Match wrapper's min-height */
          }
          .swiper-slide {
            height: auto; /* Allow individual slides to have dynamic height */
            min-height: 50vh; /* Ensures content has enough room */
            display: flex;
            flex-direction: column;
            justify-content: space-between; /* Pushes text to top, image to bottom */
            align-items: center; /* Centers horizontally */
            padding: 30px 20px 20px; /* Consistent top padding, adjust bottom as needed */
            box-sizing: border-box;
          }

          .hero-slide-content {
            /* On mobile, this div is no longer the flex parent, so we revert its display. */
            /* It acts as a logical grouping for text+image within the slide. */
            display: contents; /* Allows children to become direct flex items of swiper-slide */
          }

          .hero-text-container {
            max-width: 90%;
            margin-bottom: 20px;
            padding-left: 0;
            flex-shrink: 0;
            text-align: center;
          }
          .hero-title {
            font-size: 2.5em;
            line-height: 1.2;
            margin-bottom: 10px;
          }
          .hero-description {
            font-size: 1.2em;
            margin-bottom: 20px;
          }
          .shop-now-button {
            padding: 10px 20px;
            font-size: 1em;
          }

          .hero-image-container {
            position: relative; /* Switch to relative for mobile layout */
            width: 100%; /* Take full available width */
            height: auto; /* Height determined by content */
            margin-right: 0;
            right: auto; /* Remove absolute positioning property */
            flex-grow: 1; /* Allows image container to take remaining space */
            display: flex; /* Makes this a flex container for the Image */
            align-items: flex-end; /* Aligns image to the bottom within this container */
            justify-content: center; /* Centers image horizontally within this container */
            padding-bottom: 0; /* Ensure no extra padding at the bottom */
          }

          /* For Next.js Image with layout="fill" on mobile */
          .hero-image-container img {
             position: relative !important; /* Override layout="fill" absolute positioning for mobile */
             width: 80% !important; /* Smaller image on mobile */
             height: auto !important; /* Allow proportional scaling */
             object-fit: contain !important;
             object-position: bottom center !important; /* Stick to bottom, center horizontally */
          }

          .swiper-button-next,
          .swiper-button-prev {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .hero-slider-wrapper {
            min-height: 40vh;
          }
          .mySwiper {
            min-height: 40vh;
          }
          .swiper-slide {
            min-height: 40vh;
            padding: 20px 15px 15px;
          }
          .hero-title {
            font-size: 2em;
            margin-bottom: 8px;
          }
          .hero-description {
            font-size: 0.9em;
            margin-bottom: 15px;
          }
          .hero-image-container img {
             width: 90% !important; /* Adjust image size for very small screens */
          }
        }
      `}</style>
    </div>
  );
};

export default HeroSlider;
