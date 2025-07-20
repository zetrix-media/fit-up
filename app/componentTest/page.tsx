'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabaseClient';
import ProductListItem from '@/components/ProductListItem';

const ProductsPage = () => {
  const [productIds, setProductIds] = useState<number[]>([]);

  useEffect(() => {
    const fetchIds = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('productid')
        .order('createdat', { ascending: false });

      if (error) console.error('Product ID error:', error);
      else setProductIds(data.map(p => p.productid));
    };

    fetchIds();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Products</h1>

      <div className="overflow-auto border rounded bg-white">
        <table className="min-w-full text-left">
          <thead className="text-sm text-gray-600 bg-gray-50">
            <tr>
              <th className="px-4 py-3 font-semibold">Product</th>
              <th className="px-4 py-3 font-semibold">Price</th>
              <th className="px-4 py-3 font-semibold">Stock</th>
              <th className="px-4 py-3 font-semibold">Orders (30d)</th>
              <th className="px-4 py-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {productIds.map(id => (
              <ProductListItem key={id} productId={id} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsPage;
