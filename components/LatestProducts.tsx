//componenets/LatestProducts
"use client";

import { useEffect, useState } from "react";
import NewProductCard from "@/components/NewProductCard";
import { supabase } from "@/utils/supabaseClient"; // Adjust if your Supabase client lives elsewhere

type Product = {
  productid: number;
  name: string;
};

const LatestProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadLatestProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("productid, name")
        .order("productid", { ascending: false })
        .limit(4);

      if (error) {
        console.error("Error fetching latest products:", error);
        return;
      }

      setProducts(data);
    };

    loadLatestProducts();
  }, [supabase]);

  return (
    <section className="latest-products-wrapper">
      <h2 className="section-title">LATEST PRODUCTS</h2>
      <div className="products-grid">
        {products
          .filter((p) => p.productid !== undefined && p.productid !== null)
          .map((product) => (
            <NewProductCard key={product.productid} productId={product.productid.toString()} />
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
          width: 75vw;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          row-gap: 32px;
          column-gap: 15px;
          margin: auto;
          align-items: stretch; /* Ensures all grid items stretch to same height */
        }

        /* Make all product cards the same height */
        :global(.product-card) {
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        @media (min-width: 1024px) {
          .products-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
      `}</style>
    </section>
  );
};

export default LatestProducts;
