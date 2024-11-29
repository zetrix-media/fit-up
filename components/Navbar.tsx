// components/Navbar.tsx
"use client";

import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          <img src="/assets/fitup_logo_dark_no_bg.png" alt="FitUp Logo" className="h-12 inline-block mr-2" />
        </Link>
        <ul className="flex space-x-6">
          <li>
            <Link href="/shop">
              Shop
            </Link>
          </li>
          <li>
            <Link href="/story">
              Our Story
            </Link>
          </li>
          <li>
            <Link href="/blog">
              Blog
            </Link>
          </li>
          <li>
            <Link href="/contact">
              Contact Us
            </Link>
          </li>
        </ul>
        <Link href="/login" className="bg-yellow-500 text-gray-900 px-4 py-2 rounded">
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
