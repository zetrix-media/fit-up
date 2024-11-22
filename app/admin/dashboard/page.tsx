'use client';

import React from 'react';

const Dashboard = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h1>

      {/* Overview Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Card: Revenue */}
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-gray-600 font-medium">Total Revenue</h2>
          <p className="text-2xl font-bold text-gray-800 mt-2">$12,340</p>
        </div>

        {/* Card: Orders */}
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-gray-600 font-medium">Total Orders</h2>
          <p className="text-2xl font-bold text-gray-800 mt-2">235</p>
        </div>

        {/* Card: Customers */}
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-gray-600 font-medium">Total Customers</h2>
          <p className="text-2xl font-bold text-gray-800 mt-2">1,204</p>
        </div>

        {/* Card: Site Traffic */}
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-gray-600 font-medium">Site Visits</h2>
          <p className="text-2xl font-bold text-gray-800 mt-2">32,890</p>
        </div>
      </div>

      {/* Analytics and Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Site Traffic Analytics */}
        <div className="bg-white shadow rounded-lg p-6 col-span-2">
          <h2 className="text-gray-600 font-medium mb-4">Site Traffic Analytics</h2>
          <div className="bg-gray-100 h-48 flex justify-center items-center text-gray-500">
            {/* Placeholder for a traffic chart */}
            <span>Chart Placeholder</span>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-gray-600 font-medium mb-4">Top Products</h2>
          <ul className="space-y-3">
            <li className="flex justify-between items-center">
              <span>Product A</span>
              <span className="font-bold text-gray-800">$3,200</span>
            </li>
            <li className="flex justify-between items-center">
              <span>Product B</span>
              <span className="font-bold text-gray-800">$2,750</span>
            </li>
            <li className="flex justify-between items-center">
              <span>Product C</span>
              <span className="font-bold text-gray-800">$1,980</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white shadow rounded-lg p-6 mt-6">
        <h2 className="text-gray-600 font-medium mb-4">Recent Orders</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left border-b">
              <th className="pb-2">Order ID</th>
              <th className="pb-2">Customer</th>
              <th className="pb-2">Status</th>
              <th className="pb-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-2">#1001</td>
              <td>John Doe</td>
              <td>
                <span className="text-green-600 font-medium">Completed</span>
              </td>
              <td>$320.00</td>
            </tr>
            <tr className="border-b">
              <td className="py-2">#1002</td>
              <td>Jane Smith</td>
              <td>
                <span className="text-yellow-600 font-medium">Pending</span>
              </td>
              <td>$150.00</td>
            </tr>
            <tr>
              <td className="py-2">#1003</td>
              <td>Paul Wilson</td>
              <td>
                <span className="text-red-600 font-medium">Cancelled</span>
              </td>
              <td>$210.00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
