"use client";

import Image from "next/image";

type CategoryCardProps = {
  imageUrl: string;
  name: string;
  productCount: number;
};

const CategoryCard = ({ imageUrl, name, productCount }: CategoryCardProps) => {
  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg">
      <div className="relative w-full h-64">
        {/* Category Image */}
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover"
        />
      </div>
      <div className="bg-yellow-500 p-4 flex justify-between items-center">
        <div>
          {/* Category Name */}
          <h2 className="text-lg font-bold text-gray-900">{name}</h2>
          {/* Product Count */}
          <p className="text-sm text-gray-800">{productCount} Products</p>
        </div>
        <div className="text-gray-900">
          {/* Arrow Icon */}
          <span className="text-xl font-bold">➔</span>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
