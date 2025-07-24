'use client';

import React, { useState, useEffect } from 'react';
import ButtonWithoutIcons from '@/components/ButtonWithoutIcons';
import ProductListItem from '@/components/ProductListItem';
import { supabase } from '@/utils/supabaseClient';

const ProductsPage = () => {
  const [productIds, setProductIds] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('productid')
        .order('productid', { ascending: true });

      if (error) {
        console.error('Error fetching product IDs:', error);
      } else {
        setProductIds((data ?? []).map((p) => p.productid));
      }
    };

    fetchProducts();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentIds = productIds.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(productIds.length / itemsPerPage);

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Product List</h1>
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <label htmlFor="itemsPerPage" className="text-sm font-medium text-gray-600">
              Show per page:
            </label>
            <select
              id="itemsPerPage"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="px-3 py-1.5 rounded-md border border-gray-300 bg-white text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-500 hover:border-gray-400 transition"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
          <ButtonWithoutIcons text="Add Product" url="/admin/products/add" />
        </div>
      </div>

      {/* Product Table */}
      <table className="w-full border border-gray-300 rounded-lg overflow-hidden text-sm text-gray-700">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Product</th>
            <th className="px-4 py-2 text-left">Price</th>
            <th className="px-4 py-2 text-left">Stock</th>
            <th className="px-4 py-2 text-left">Last 30 Days</th>
            <th className="px-4 py-2 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentIds.map((id) => (
            <ProductListItem key={id} productId={id} />
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <button
          className={`px-4 py-2 border rounded ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-black'
            }`}
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        >
          Previous
        </button>
        <div>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`px-3 py-1 mx-1 border rounded ${currentPage === i + 1 ? 'bg-yellow-500 text-white' : 'text-black'
                }`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <button
          className={`px-4 py-2 border rounded ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-black'
            }`}
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductsPage;
