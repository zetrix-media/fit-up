// components/CategoryTabs.tsx
'use client';

import React from 'react';

type Category = {
  categoryid: number;
  categoryname: string;
};

interface CategoryTabsProps {
  categories: Category[];
  selectedCategoryId: number;
  onSelectCategory: (id: number) => void;
}

export default function CategoryTabs({
  categories,
  selectedCategoryId,
  onSelectCategory,
}: CategoryTabsProps) {
  return (
    <div className="flex justify-center mt-6">
      <div className="flex gap-6 bg-[#F9F9FB] rounded-full px-4 py-3 shadow-sm">
        {categories.map((cat) => (
          <button
            key={cat.categoryid}
            onClick={() => onSelectCategory(cat.categoryid)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategoryId === cat.categoryid
                ? 'bg-[#715DF2] text-white shadow-md'
                : 'text-gray-600 hover:text-black'
            }`}
          >
            {cat.categoryname}
          </button>
        ))}
      </div>
    </div>
  );
}
