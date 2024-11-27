import React from 'react';
import { FaBoxOpen } from 'react-icons/fa';

const OrdersPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <FaBoxOpen className="text-6xl text-gray-400 mb-4" />
      <h1 className="text-2xl font-bold text-gray-700">No Orders...</h1>
    </div>
  );
};

export default OrdersPage;
