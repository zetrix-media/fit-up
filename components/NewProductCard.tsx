// components/NewProductCard 
"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface NewProductCardProps {
  id: string;
  imageUrl: string;
  name: string;
  price: number;
  colorVariants: string[];
}

const NewProductCard: React.FC<NewProductCardProps> = ({
  id,
  imageUrl,
  name,
  price,
  colorVariants,
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/product-details/${id}`);
  };

  return (
    <div className="new-product-card" onClick={handleClick}>
      <div className="image-section">
        <img src={imageUrl} alt={name} className="product-image" />
      </div>
      <div className="description-section">
        <div className="color-variants">
          {colorVariants.map((color, index) => (
            <span
              key={index}
              className="color-dot"
              style={{ backgroundColor: color }}
              aria-label={`Color option ${index + 1}`}
            />
          ))}
        </div>
        <div className="product-text">
          <h3 className="product-name">{name}</h3>
          <p className="product-price">${price}</p>
        </div>
      </div>

      <style jsx>{`
        .new-product-card {
          width: 100%;
          cursor: pointer;
          overflow: hidden;
          background-color: rgba(30, 30, 30, 0);
          position: relative;
          font-family: Arial, sans-serif;
        }

        .image-section {
          height: 78%;
          background-color: #f3f3f3;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .product-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .description-section {
          height: 22%;
          backdrop-filter: blur(6px);
          background-color: rgba(0, 0, 0, 0);
          display: flex;
          flex-direction: column;
          align-items: start;
          padding: 12px;
          gap: 10px;
        }

        .color-variants {
          display: flex;
          gap: 24px;
          margin-top: 10px;
          margin-bottom: 10px;
        }

        .color-dot {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          border: 1px solid #fff;
          cursor: pointer;
        }

        .product-text {
          text-align: left;
        }

        .product-name {
          font-size: 18px;
          font-weight: 400;
          color: #000;
          margin: 0;
        }

        .product-price {
          font-size: 22px;
          font-weight: 800;
          color: #000;
          margin: 4px 0 0;
        }
      `}</style>
    </div>
  );
};

export default NewProductCard;
