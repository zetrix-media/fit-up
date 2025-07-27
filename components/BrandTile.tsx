"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

type BrandTileProps = {
  brandId: string | number;
  brandImage: string;
  brandName: string;
};

const BrandTile = ({ brandId, brandImage, brandName }: BrandTileProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/brands/${brandId}`);
  };

  return (
    <div
      className="bg-[#E3F1F5] px-6 py-6 flex flex-col items-center justify-between rounded-md shadow-md w-full min-h-[240px] md:min-h-[260px] cursor-pointer"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleClick();
      }}
    >
      <div className="relative w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32">
        <Image
          src={brandImage || "/assets/fitup_icon.png"}
          alt={brandName || "Brand logo"}
          fill
          className="object-contain"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/assets/fitup_icon.png";
          }}
        />
      </div>

      <div className="relative mt-4 w-full flex items-end h-[52px] md:h-[56px] lg:h-[60px]">
        <div className="bg-white px-4 py-2 transform skew-x-[-12deg] w-full">
          <h2 className="text-black font-semibold text-center text-sm md:text-base transform skew-x-[12deg] leading-tight">
            {brandName}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default BrandTile;
