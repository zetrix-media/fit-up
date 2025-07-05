'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabaseClient';
import CategoryTabs from './CategoryTabs';
import NewProductCard from './NewProductCard';

type Category = {
  categoryid: number;
  categoryname: string;
};

type Product = {
  productid: number;
  productvariants: {
    variantid: number;
  }[];
};

export default function ClientCategoryView({
  categories,
  defaultProducts,
  initialCategoryId,
  gender,
}: {
  categories: Category[];
  defaultProducts: Product[];
  initialCategoryId: number;
  gender: string | null;
}) {
  const allCategories: Category[] = [{ categoryid: 0, categoryname: 'All' }, ...categories];
  const [selectedCategoryId, setSelectedCategoryId] = useState(initialCategoryId);
  const [products, setProducts] = useState<Product[]>(defaultProducts);

  useEffect(() => {
    const fetchProducts = async () => {
      let query = supabase
        .from('products')
        .select(`
          productid,
          gender,
          categoryid,
          productvariants (
            variantid
          )
        `)
        .order('createdat', { ascending: false });

      if (selectedCategoryId !== 0) {
        query = query.eq('categoryid', selectedCategoryId);
      }

      if (gender) {
        query = query.eq('gender', gender);
      }

      const { data, error } = await query;

      console.log('📦 Supabase fetched products:', data);
      console.log('🐛 Supabase error:', error);

      setProducts(data ?? []);
    };

    fetchProducts();
  }, [selectedCategoryId, gender]);

  return (
    <>
      <CategoryTabs
        categories={allCategories}
        selectedCategoryId={selectedCategoryId}
        onSelectCategory={setSelectedCategoryId}
      />

      {products && products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
          {products.map((product) => {
            if (!product.productvariants || product.productvariants.length === 0) return null;

            return (
              <NewProductCard
                key={product.productid}
                productId={product.productid.toString()}
              />
            );
          })}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10">No products found in this category.</p>
      )}
    </>
  );
}
