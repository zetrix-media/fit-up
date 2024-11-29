// components/BestSellers.tsx
"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { fetchProducts } from "@/utils/fetchProducts";

type Product = {
  variantid: string;
  productid: string;
  variantname: string;
  mainimageurl: string;
  price: number;
};

const BestSellers = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };
    loadProducts();
  }, []);

  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-2xl font-bold mb-6">Our Bestsellers</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.variantid}
            id={product.variantid}
            imageUrl={product.mainimageurl}
            name={product.variantname}
            price={product.price}
          />
        ))}
      </div>
    </section>
  );
};

export default BestSellers;
