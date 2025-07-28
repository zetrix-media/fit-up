'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import {
  FiSettings,
  FiLogOut,
  FiHome,
  FiBox,
  FiLayers,
  FiImage,
  FiFileText,
  FiMessageSquare,
} from 'react-icons/fi';

const Sidebar = () => {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove('adminToken');
    router.push('/admin/login');
  };

  return (
    <div
      className="fixed top-0 left-0 h-screen w-64 bg-yellow-400 flex flex-col justify-between p-4 z-50"
      style={{ minWidth: '16rem' }}
    >
      <div>
        <div className="mb-8 flex flex-col items-center">
          <img src="/assets/fitup-logo.png" alt="FIT UP Logo" className="w-40 h-20 mb-2" />
        </div>

        <nav className="flex flex-col gap-4">
          <a
            href="/admin/dashboard"
            className="flex items-center gap-4 px-4 py-3 text-black rounded-lg hover:bg-yellow-300"
          >
            <FiHome />
            <span>Dashboard</span>
          </a>
          <a
            href="/admin/products"
            className="flex items-center gap-4 px-4 py-3 text-black rounded-lg hover:bg-yellow-300"
          >
            <FiBox />
            <span>Products</span>
          </a>
          <a
            href="/admin/categories"
            className="flex items-center gap-4 px-4 py-3 text-black rounded-lg hover:bg-yellow-300"
          >
            <FiLayers />
            <span>Categories</span>
          </a>
          <a
            href="/admin/gallery"
            className="flex items-center gap-4 px-4 py-3 text-black rounded-lg hover:bg-yellow-300"
          >
            <FiImage />
            <span>Gallery</span>
          </a>
          <a
            href="/admin/banner"
            className="flex items-center gap-4 px-4 py-3 text-black rounded-lg hover:bg-yellow-300"
          >
            <FiFileText />
            <span>Banner</span>
          </a>
          <a
            href="/admin/orders"
            className="flex items-center gap-4 px-4 py-3 text-black rounded-lg hover:bg-yellow-300"
          >
            <FiFileText />
            <span>Orders</span>
          </a>
          <a
            href="/admin/testimonials"
            className="flex items-center gap-4 px-4 py-3 text-black rounded-lg hover:bg-yellow-300"
          >
            <FiMessageSquare />
            <span>Testimonials</span>
          </a>
        </nav>
      </div>

      <div className="flex flex-col gap-4">
        <button
          onClick={() => router.push('/admin/settings')}
          className="flex items-center gap-4 px-4 py-3 text-black rounded-lg hover:bg-yellow-300"
        >
          <FiSettings />
          <span>Settings</span>
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center gap-4 px-4 py-3 text-black rounded-lg hover:bg-yellow-300"
        >
          <FiLogOut />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
