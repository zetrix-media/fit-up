'use client';

import React, { useEffect, useState } from "react";
import { fetchCategories } from "@/utils/fetchCategories";

const CategoriesSection: React.FC = () => {
  interface Category {
    id: number;
    name: string;
    image_url: string;
  }

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const getCategories = async () => {
      const data = await fetchCategories();
      const formattedData = data.map((item: { categoryid: number; categoryname: string; categoryimage: string }) => ({
        id: item.categoryid,
        name: item.categoryname,
        image_url: item.categoryimage,
      }));
      setCategories(formattedData);
    };
    getCategories();
  }, []);

  return (
    <section className="categories">
      <h2>Shop by Categories</h2>
      <div className="categories-grid">
        {categories.map((category) => (
          <div key={category.id} className="category-card">
            <img src={category.image_url} alt={category.name} />
            <p>{category.name}</p>
          </div>
        ))}
      </div>
      <style jsx>{`
        .categories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 20px;
        }
        .category-card {
          text-align: center;
        }
        .category-card img {
          width: 100px;
          height: 100px;
          object-fit: cover;
          border-radius: 8px;
        }
      `}</style>
    </section>
  );
};

export default CategoriesSection;
