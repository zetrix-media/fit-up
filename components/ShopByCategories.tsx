// components/ShopByCategories.tsx
"use client";

import { useEffect, useState } from "react";
import CategoryCardHome from "@/components/CategoryCardHome";
import { fetchCategories } from "@/utils/fetchCategories";

type Category = {
  categoryid: string;
  categoryimage: string;
  categoryname: string;
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
    <section className="w-full py-16 px-4">
      <div className="max-w-screen-xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-extrabold text-[#1C2340] uppercase tracking-wide">
          Top Categories
        </h2>
      </div>

      <div className="max-w-screen-xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 justify-items-center">
        {categories.map((category) => (
          <CategoryCardHome
            key={category.categoryid}
            imageUrl={category.categoryimage}
            name={category.categoryname}
          />
        ))}
      </div>
    </section>
  );
};

export default ShopByCategories;
