//componenets/LatestProducts
"use client";

import { useEffect, useState } from "react";
import NewProductCard from "@/components/NewProductCard";
import { fetchProducts } from "@/utils/fetchProducts";

type Product = {
  variantid: string;
  productid: string;
  variantname: string;
  mainimageurl: string;
  price: number;
};

const LatestProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };
    loadProducts();
  }, []);

  const dummyColors = ["#000000", "#ff6b6b", "#f5b9e5", "#8b8c4a", "#98c6ff", "#4361ee"];

  return (
    <section className="latest-products-wrapper">
      <h2 className="section-title">LATEST PRODUCTS</h2>
      <div className="products-grid">
        {products.map((product) => (
          <NewProductCard
            key={product.variantid}
            id={product.variantid}
            imageUrl={product.mainimageurl}
            name={product.variantname}
            price={product.price}
            colorVariants={dummyColors}
          />
        ))}
      </div>

      <style jsx>{`
        .latest-products-wrapper {
          padding: 40px 20px;
          text-align: center;
        }

        .section-title {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 32px;
          color: #0f172a;
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 24px;
          justify-items: center;
        }
      `}</style>
    </section>
  );
};

export default LatestProducts;
