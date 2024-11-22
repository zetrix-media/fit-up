'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaTrash, FaEdit, FaEye } from 'react-icons/fa';

const ProductPage = () => {
  // Mock product data (replace with API integration)
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    // Fetch product data (mock data for now)
    const mockData = Array.from({ length: 15 }, (_, i) => ({
      id: i + 1,
      image: '/placeholder.png', // Replace with actual URLs
      sku: '2356',
      title: 'Everybody Classic V',
      quantity: 900,
      price: 'AED 900',
    }));
    setProducts(mockData);
  }, []);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Product List</h1>
        {/* <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 flex items-center">
          <span className="text-lg font-bold mr-2">+</span>
          Add Product
        </button> */}
      <button
        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 flex items-center"
        onClick={() => window.location.href = '/admin/products/add'}
      >
        <span className="text-lg font-bold mr-2">+</span>
        Add Product
      </button>
      </div>

      {/* Product Table */}
      <table className="w-full border border-gray-300 rounded-lg overflow-hidden text-sm text-gray-700">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-center">Sl. No</th>
            <th className="border border-gray-300 px-4 py-2 text-center">Image</th>
            <th className="border border-gray-300 px-4 py-2">Product SKU</th>
            <th className="border border-gray-300 px-4 py-2">Products Title</th>
            <th className="border border-gray-300 px-4 py-2 text-center">Quantity</th>
            <th className="border border-gray-300 px-4 py-2 text-center">Price</th>
            <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((product, index) => (
            <tr key={product.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2 text-center">
                {indexOfFirstItem + index + 1}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <Image
                  src={product.image}
                  alt={product.title}
                  width={50}
                  height={50}
                  className="rounded-md"
                />
              </td>
              <td className="border border-gray-300 px-4 py-2">{product.sku}</td>
              <td className="border border-gray-300 px-4 py-2">{product.title}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{product.quantity}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{product.price}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <div className="flex justify-center items-center gap-3">
                  <button
                    className="text-blue-500 hover:text-blue-600"
                    onClick={() => console.log('View Product', product.id)}
                  >
                    <FaEye size={16} />
                  </button>
                  <button
                    className="text-yellow-500 hover:text-yellow-600"
                    onClick={() => console.log('Edit Product', product.id)}
                  >
                    <FaEdit size={16} />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-600"
                    onClick={() => console.log('Delete Product', product.id)}
                  >
                    <FaTrash size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <button
          className={`px-4 py-2 border rounded ${
            currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-black'
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
              className={`px-3 py-1 mx-1 border rounded ${
                currentPage === i + 1 ? 'bg-yellow-500 text-white' : 'text-black'
              }`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <button
          className={`px-4 py-2 border rounded ${
            currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-black'
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

export default ProductPage;
