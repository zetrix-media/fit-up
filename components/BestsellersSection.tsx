'use client';

import React, { useEffect, useState } from "react";
import { fetchProducts } from "@/utils/fetchProducts";

const BestsellersSection: React.FC = () => {
  interface Product {
    id: number;
    name: string;
    price: number;
    image_url: string;
  }

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };
    getProducts();
  }, []);

  return (
    <section className="bestsellers">
      <h2>Our Bestseller</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image_url} alt={product.name} />
            <h3>{product.name}</h3>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
      <style jsx>{`
        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
        }
        .product-card {
          border: 1px solid #ddd;
          padding: 10px;
          text-align: center;
        }
      `}</style>
    </section>
  );
};

export default BestsellersSection;
