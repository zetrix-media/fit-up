'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabaseClient';
import CategoryTabs from './CategoryTabs';
import NewProductCard from './NewProductCard';

type Category = {
  categoryid: number;
  categoryname: string;
};

type Product = {
  productid: number;
  gender: string;
  categoryid: number;
  productvariants: {
    variantid: number;
  }[];
};

export default function ShopPageWrapper() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get query params
  const categoryFromUrl = Number(searchParams.get('category')) || 0;
  const genderParam = searchParams.get('gender')?.toLowerCase();
  const gender = genderParam === 'male' || genderParam === 'female' ? genderParam : null;

  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(categoryFromUrl);

  // Fetch categories once
  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('categoryid, categoryname')
        .order('categoryid');

      if (error) {
        console.error('❌ Error fetching categories:', error);
      }

      setCategories(data ?? []);
    };

    fetchCategories();
  }, []);

  // Fetch products on category/gender change
  useEffect(() => {
    const fetchProducts = async () => {
      let query = supabase
        .from('products')
        .select(`
          productid,
          Gender,
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
        query = query.eq('Gender', gender);
      }

      const { data, error } = await query;

      if (error) {
        console.error('❌ Supabase fetch error:', error);
      }

      // Normalize field names and enforce Product type
      const normalized: Product[] = (data ?? []).map((item) => ({
        productid: item.productid,
        gender: item.Gender?.toLowerCase?.() || '',
        categoryid: item.categoryid,
        productvariants: item.productvariants ?? [],
      }));

      setProducts(normalized);
    };

    fetchProducts();
  }, [selectedCategoryId, gender]);

  // Handle tab click and update the URL
  const handleCategoryChange = (categoryId: number) => {
    setSelectedCategoryId(categoryId);

    const newParams = new URLSearchParams();
    if (categoryId !== 0) newParams.set('category', categoryId.toString());
    if (gender) newParams.set('gender', gender);
    router.push(`/shop?${newParams.toString()}`);
  };

  const allCategories: Category[] = [{ categoryid: 0, categoryname: 'All' }, ...categories];

  return (
    <>
      <CategoryTabs
        categories={allCategories}
        selectedCategoryId={selectedCategoryId}
        onSelectCategory={handleCategoryChange}
      />

      {products.length > 0 ? (
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
