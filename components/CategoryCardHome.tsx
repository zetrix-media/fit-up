"use client";

import Image from "next/image";

type CategoryCardHomeProps = {
  imageUrl: string;
  name: string;
};

const CategoryCardHome = ({ imageUrl, name }: CategoryCardHomeProps) => {
  return (
    <div className="bg-[#FFD800] px-10 py-6 flex flex-col items-center justify-between rounded-md shadow-md">
      <div className="relative w-32 h-32">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-contain"
        />
      </div>
      <div className="relative mt-4">
        <div className="bg-white px-6 py-2 transform skew-x-[-12deg]">
          <h2 className="text-black font-semibold text-center text-base transform skew-x-[12deg]">
            {name}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default CategoryCardHome;
