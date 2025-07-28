"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchBrands } from "@/utils/fetchBrands";
import BrandTile from "@/components/BrandTile";

type Brand = {
  brandId: string;
  brandName: string;
  brandImage: string;
};

const fallbackImage = "/assets/fitup_icon.png";

const ShopByBrands = () => {
  const router = useRouter();
  const [brands, setBrands] = useState<Brand[] | null>(null);

  useEffect(() => {
    const loadBrands = async () => {
      try {
        const fetchedBrands: Array<{ brandid: string; brandname: string; brandimage: string }> = await fetchBrands();
        const mappedBrands: Brand[] = fetchedBrands.map((b) => ({
          brandId: b.brandid,
          brandName: b.brandname,
          brandImage: b.brandimage,
        }));
        setBrands(mappedBrands);
      } catch (error) {
        console.error("❌ Error fetching brands:", error);
        setBrands([]);
      }
    };

    loadBrands();
  }, []);

  if (!brands || brands.length === 0) {
    return (
      <div className="text-center text-gray-600 py-10">
        No brands available at the moment.
      </div>
    );
  }

  const topBrands = brands
    .filter((b) => b?.brandId && b?.brandName)
    .slice(0, 5);

  const handleSeeAll = () => {
    router.push("/brands");
  };

  return (
    <section className="py-8">
      <h2 className="text-xl font-light mb-6 text-center md:text-left">
        Top Brands
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {topBrands.map((brand) => (
          <div key={`brand-${brand.brandId}`}>
            <BrandTile
              brandId={brand.brandId}
              brandImage={brand.brandImage || fallbackImage}
              brandName={brand.brandName}
            />
          </div>
        ))}
      </div>

      {brands.length > 5 && (
        <div className="mt-6 text-center">
          <button
            onClick={handleSeeAll}
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            See all brands
          </button>
        </div>
      )}
    </section>
  );
};

export default ShopByBrands;
