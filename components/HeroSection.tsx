// components/HeroSlider.jsx
'use client'; // This line marks the component as a Client Component

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
    src: '/assets/heroImg1.png', // This image should be the one with white/blue scrubs
    alt: 'Medical professional in white and light blue scrubs',
    title: 'Style in Every Stitch',
    description: 'Modern fits, vibrant colors, and durable fabrics – built for the demands of healthcare.',
    imagePosition: 'right',
  },
  {
    src: '/assets/heroImg2.png', // This image should be the one with red/blue scrubs (from your latest example)
    alt: 'Two medical professionals in red and blue scrubs',
    title: 'Comfort Meets Care',
    description: 'Premium Medical Uniforms for Everyday Heroes',
    imagePosition: 'right',
  },
  {
    src: '/assets/heroImg3.png', // This image should be the one with light blue scrubs and mask
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
                  width={600} // Keep fixed width for consistency
                  height={600} // Keep fixed height for consistency
                  objectFit="contain"
                  quality={90}
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
          height: 70vh; /* Adjust overall height */
          position: relative;
          overflow: hidden;
          background: linear-gradient(to right, #e0f2f7, #c6e7f1); /* Your desired gradient */
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
          align-items: center;
          justify-content: space-between;
          width: 100%;
          height: 100%;
          position: relative;
          /* Increased padding for left and right to pull content inwards */
          padding: 0 8%; /* Adjust to move both text and image away from corners */
          box-sizing: border-box;
        }

        /* --- Text Container --- */
        .hero-text-container {
          z-index: 10;
          color: #212529;
          max-width: 100%; /* Slightly reduced max-width to give more space on the right */
          flex-shrink: 0;
          position: relative;
          /* Add some left padding to pull it further from the absolute edge if needed */
          padding-left: 2%; /* Example: Add a slight indent from the overall slide padding */
        }

        .hero-title {
          font-size: 4.5em;
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

        /* --- Image Container and Overflow --- */
        .hero-image-container {
          position: absolute;
          height: 100%;
          display: flex;
          align-items: flex-end; /* Aligns image to the bottom of its container */
          justify-content: flex-end; /* Aligns image to the right within its container */
          z-index: 5;
          pointer-events: none;
          /* Adjusted right position to move it slightly left from the absolute edge */
          right: 8%; /* This will position the container away from the right edge */
          width: 55%; /* Keep a reasonable width for the image container */
          /* Adjusted negative margin to control the overflow under the text */
          margin-right: -5%; /* Less negative margin means less overflow, pull it more to the left */
        }

        .hero-image-container img {
          width: 100%;
          height: auto;
          max-height: 100%;
          display: block;
          object-fit: contain;
          object-position: bottom right;
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
          /* Adjusting navigation button positions relative to the slide edge */
          top: 50%; /* Center vertically */
          transform: translateY(-50%); /* Fine-tune vertical centering */
        }
        .swiper-button-prev {
            left: 20px; /* Pull left button away from the very edge */
        }
        .swiper-button-next {
            right: 20px; /* Pull right button away from the very edge */
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
            padding: 0 5%; /* Adjust padding for smaller desktops */
          }
          .hero-text-container {
            max-width: 50%;
            padding-left: 0;
          }
          .hero-image-container.image-right {
            right: 5%;
            width: 60%;
            margin-right: -3%; /* Slightly less negative margin */
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
            height: 60vh;
          }
          .hero-slide-content {
            flex-direction: column;
            justify-content: center;
            padding: 20px;
            text-align: center;
          }
          .hero-text-container {
            max-width: 90%;
            margin-bottom: 20px;
            padding-left: 0; /* Remove specific left padding */
          }
          .hero-image-container {
            position: relative;
            width: 100%;
            height: auto;
            margin-right: 0;
            right: auto; /* Remove absolute right positioning */
            align-items: center;
            justify-content: center;
          }
          .hero-image-container img {
             width: 80%;
             height: auto;
             object-position: center;
          }
          .hero-title {
            font-size: 2.5em;
          }
          .hero-description {
            font-size: 1.2em;
          }
          .shop-now-button {
            padding: 10px 20px;
            font-size: 1em;
          }
          /* Hide navigation buttons on smaller screens if they become too intrusive */
          .swiper-button-next,
          .swiper-button-prev {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .hero-slider-wrapper {
            height: 50vh;
          }
          .hero-title {
            font-size: 2em;
          }
          .hero-description {
            font-size: 1em;
          }
          .hero-image-container img {
             width: 90%;
          }
        }
      `}</style>
    </div>
  );
};

export default HeroSlider;