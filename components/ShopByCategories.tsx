// components/ShopByCategories.tsx
"use client";

import { useEffect, useState } from "react";
import CategoryCard from "@/components/CategoryCard";
import { fetchCategories } from "@/utils/fetchCategories";

type Category = {
  categoryid: string;
  categoryimage: string;
  categoryname: string;
  productcount: number;
};

const ShopByCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error loading categories:", error);
      }
    };
    loadCategories();
  }, []);

  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-2xl font-bold mb-6">Shop by Categories</h2>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
        {categories.map((category) => (
          <CategoryCard
            key={category.categoryid}
            imageUrl={category.categoryimage}
            name={category.categoryname}
            productCount={category.productcount}
          />
        ))}
      </div>
    </section>
  );
};

export default ShopByCategories;
