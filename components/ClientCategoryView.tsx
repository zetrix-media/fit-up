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
  productvariants: {
    mainimageurl: string;
    price: number;
    color: string;
  }[];
};

export default function ClientCategoryView({
  categories,
  defaultProducts,
}: {
  categories: Category[];
  defaultProducts: Product[];
}) {
  const [selectedCategoryId, setSelectedCategoryId] = useState(categories[0]?.categoryid);
  const [products, setProducts] = useState<Product[]>(defaultProducts);

  useEffect(() => {
    if (!selectedCategoryId) return;

    const fetchProducts = async () => {
      const { data } = await supabase
        .from('products')
        .select('productid, name, productvariants(mainimageurl, color, price)')
        .eq('categoryid', selectedCategoryId)
        .order('createdat', { ascending: false });

      if (data) setProducts(data as Product[]);
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
        {products.map((product) => {
          const mainVariant = product.productvariants?.[0];
          const colorVariants = product.productvariants?.map((v) => v.color) || [];

          return (
            <NewProductCard
              key={product.productid}
              id={product.productid.toString()}
              imageUrl={mainVariant?.mainimageurl || '/assets/placeholder.jpg'}
              name={product.name}
              price={mainVariant?.price || 0}
              colorVariants={colorVariants}
            />
          );
        })}
      </div>
    </>
  );
}
