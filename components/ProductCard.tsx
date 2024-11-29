"use client";

import React from "react";
// import { useRouter } from "next/navigation";

interface ProductCardProps {
  id: string;
  imageUrl: string;
  name: string;
  price: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, imageUrl, name, price }) => {
  // const router = useRouter();

  const handleAddToCart = () => {
    console.log(`Product ${id} added to cart`);
  };

  const handleWishlist = () => {
    console.log(`Product ${id} added to wishlist`);
  };

  return (
    <div className="product-card">
      <img src={imageUrl} alt={name} className="product-image" />
      <div className="product-details">
        <h3 className="product-name">{name}</h3>
        <p className="product-price">${price}</p>
        <div className="product-actions">
          <button onClick={handleWishlist} className="wishlist-button" aria-label="Add to Wishlist">
            ❤️
          </button>
          <button onClick={handleAddToCart} className="cart-button" aria-label="Add to Cart">
            🛒
          </button>
        </div>
      </div>
      <style jsx>{`
        .product-card {
          background-color: #fff;
          border-radius: 10px;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          max-width: 300px;
          text-align: center;
          font-family: Arial, sans-serif;
        }
        .product-image {
          width: 100%;
          height: auto;
        }
        .product-details {
          padding: 16px;
          background-color: #f9f9f9;
        }
        .product-name {
          font-size: 18px;
          font-weight: bold;
          margin: 8px 0;
        }
        .product-price {
          font-size: 16px;
          color: #444;
        }
        .product-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 10px;
        }
        .wishlist-button,
        .cart-button {
          background-color: #ffde03;
          border: none;
          padding: 8px;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
        }
        .wishlist-button:hover,
        .cart-button:hover {
          background-color: #ffd700;
        }
      `}</style>
    </div>
  );
};

export default ProductCard;
