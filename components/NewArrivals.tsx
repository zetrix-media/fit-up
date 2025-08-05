// components/NewArrivals
"use client";

import { useEffect, useState } from "react";
import NewProductCard from "@/components/NewProductCard";
import { supabase } from "@/utils/supabaseClient"; // Use supabase directly

type Product = {
  productid: number;
  name: string;
  // Add other fields if needed
};

interface NewArrivalsProps {
  limit?: number;
}

const NewArrivals = ({ limit = 13 }: NewArrivalsProps) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("productid, name")
        .order("productid", { ascending: false })
        .limit(limit);

      if (error) {
        console.error("Error fetching new arrivals:", error);
        return;
      }

      setProducts(data);
    };
    loadProducts();
  }, [limit]);

  return (
    <section className="latest-products-wrapper">
      <h2 className="section-title">NEW ARRIVALS</h2>
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

export default NewArrivals;
