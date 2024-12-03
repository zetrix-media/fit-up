"use client";

import React from "react";
import { FiHeart, FiShoppingCart } from "react-icons/fi";

interface ProductCardProps {
  id: string;
  imageUrl: string;
  name: string;
  price: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, imageUrl, name, price }) => {
  const handleAddToCart = () => {
    console.log(`Product ${id} added to cart`);
  };

  const handleWishlist = () => {
    console.log(`Product ${id} added to wishlist`);
  };

  return (
    <div className="product-card">
      <div className="image-wrapper">
        <img src={imageUrl} alt={name} className="product-image" />
      </div>
      <div className="product-info">
        <div className="details">
          <h3 className="product-name">{name}</h3>
          <p className="product-price">${price}</p>
        </div>
        <div className="actions">
            <button onClick={handleWishlist} className="wishlist-button" aria-label="Add to Wishlist">
            <FiHeart/>
            </button>
            <button onClick={handleAddToCart} className="cart-button" aria-label="Add to Cart">
            <FiShoppingCart/>
            </button>
        </div>
      </div>
      <style jsx>{`
        .product-card {
          width: 100%;
          max-width: 300px;
          background-color: #232323;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
          color: #fff;
          font-family: Arial, sans-serif;
        }

        .image-wrapper {
          background-color: #e9e9e9;
          // padding: 16px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .product-image {
          width: 100%;
          // max-height: 250px;
          object-fit: contain;
          border-radius: 8px 8px 0 0;
        }

        .product-info {
          background-color: #ffde03;
          padding: 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .details {
          flex-grow: 1;
        }

        .product-name {
          font-size: 16px;
          font-weight: 600;
          margin: 0;
          color: #000;
        }

        .product-price {
          font-size: 14px;
          margin: 4px 0 0;
          color: #000;
        }

        .actions {
          display: flex;
          gap: 16px;
        }

        .wishlist-button,
        .cart-button {
          background-color: transparent;
          border: none;
          color: #000;
          font-size: 25px;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .wishlist-button:hover,
        .cart-button:hover {
          color: #444;
        }
      `}</style>
    </div>
  );
};

export default ProductCard;
