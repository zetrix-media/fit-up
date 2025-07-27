'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/utils/supabaseClient';
import ShopByBrands from './ShopByBrands';
import CategoryTabs from '@/components/CategoryTabs';
import NewProductCard from '@/components/NewProductCard';

type Category = {
  categoryid: number;
  categoryname: string;
};

type Product = {
  productid: number;
  categoryid: number;
  productvariants: { variantid: number }[];
};

export default function BrandPageWrapper() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    Number(searchParams.get('category')) || 0
  );

  // Fetch categories
  useEffect(() => {
    const loadCategories = async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('categoryid, categoryname')
        .order('categoryid');

      if (error) {
        console.error('❌ Error fetching categories:', error);
      }

      setCategories(data ?? []);
    };

    loadCategories();
  }, []);

  // Fetch products
  useEffect(() => {
    const loadProducts = async () => {
      let query = supabase
        .from('products')
        .select(`productid, categoryid, productvariants ( variantid )`)
        .order('createdat', { ascending: false });

      if (selectedCategoryId !== 0) {
        query = query.eq('categoryid', selectedCategoryId);
      }

      const { data, error } = await query;

      if (error) {
        console.error('❌ Error fetching products:', error);
        return;
      }

      const normalized: Product[] = (data ?? []).map((item) => ({
        productid: item.productid,
        categoryid: item.categoryid,
        productvariants: item.productvariants ?? [],
      }));

      setProducts(normalized);
    };

    loadProducts();
  }, [selectedCategoryId]);

  // Handle category tab change
  const allCategories: Category[] = [
    { categoryid: 0, categoryname: 'All' },
    ...categories,
  ];

  const handleCategoryChange = (categoryId: number) => {
    setSelectedCategoryId(categoryId);

    const newParams = new URLSearchParams();
    if (categoryId !== 0) newParams.set('category', categoryId.toString());
    router.push(`/brands?${newParams.toString()}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-6">
      {/* 🟣 Shop by Brands */}
      <ShopByBrands />

      {/* 🟪 Category Tabs */}
      <CategoryTabs
        categories={allCategories}
        selectedCategoryId={selectedCategoryId}
        onSelectCategory={handleCategoryChange}
      />

      {/* 🟩 Products Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
          {products.map((product) =>
            product.productvariants?.length > 0 ? (
              <NewProductCard
                key={product.productid}
                productId={product.productid.toString()}
              />
            ) : null
          )}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10">
          No products found in this category.
        </p>
      )}
    </div>
  );
}
