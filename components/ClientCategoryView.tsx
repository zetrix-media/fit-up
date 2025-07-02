// components/ClientCategoryView.tsx
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
  name: string;
};

export default function ClientCategoryView({
  categories,
}: {
  categories: Category[];
}) {
  const [selectedCategoryId, setSelectedCategoryId] = useState(categories[0]?.categoryid);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (!selectedCategoryId) return;

    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('productid, name')
        .eq('categoryid', selectedCategoryId)
        .order('createdat', { ascending: false });

      if (error) {
        console.error("Error fetching products by category:", error);
        return;
      }

      setProducts(data as Product[]);
    };

    fetchProducts();
  }, [selectedCategoryId]);

  return (
    <>
      <CategoryTabs
        categories={categories}
        selectedCategoryId={selectedCategoryId}
        onSelectCategory={setSelectedCategoryId}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
        {products
          .filter((p) => p.productid !== undefined && p.productid !== null)
          .map((product) => (
            <NewProductCard
              key={product.productid}
              productId={product.productid.toString()}
            />
          ))}
      </div>
    </>
  );
}
