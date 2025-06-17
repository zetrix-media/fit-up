'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  HiOutlineUser,
  HiOutlineSearch,
  HiOutlineHeart,
  HiOutlineShoppingBag,
  HiOutlineMenu,
  HiOutlineX
} from 'react-icons/hi'

const navLinks = [
  { label: 'Home', href: '/', active: true },
  { label: 'Men', href: '/men' },
  { label: 'Women', href: '/women' },
  { label: 'Best Sellers', href: '/best-sellers' },
  { label: 'Fitup', href: '/fitup' },
  { label: 'Brands', href: '/brands' },
  { label: 'contact us', href: '/contact' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="bg-[#1E1F23] text-white">
      <div className="w-full max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Left: Logo */}
          <Link href="/">
            <Image
              src="/assets/fitup_logo_dark_no_bg.png"
              alt="Logo"
              width={120}
              height={80}
              className="object-contain h-14 w-auto sm:h-16"
            />
          </Link>

          {/* Center: Nav Links */}
          <nav className="hidden md:flex space-x-6 text-sm font-semibold items-center">
            {navLinks.map(({ label, href, active }) => (
              <Link
                key={label}
                href={href}
                className={`hover:text-yellow-400 transition ${
                  active ? 'text-yellow-400' : 'text-gray-300'
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Right: Icons */}
          <div className="flex items-center space-x-4 text-2xl">
            <HiOutlineUser className="cursor-pointer hover:text-yellow-400" />
            <HiOutlineSearch className="cursor-pointer hover:text-yellow-400" />
            <HiOutlineHeart className="cursor-pointer hover:text-yellow-400" />
            <div className="relative">
              <HiOutlineShoppingBag className="cursor-pointer hover:text-yellow-400" />
              <span className="absolute -top-2 -right-2 text-xs bg-white text-black rounded-full w-4 h-4 flex items-center justify-center">
                0
              </span>
            </div>
            {/* Hamburger */}
            <div className="md:hidden">
              <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none">
                {menuOpen ? <HiOutlineX /> : <HiOutlineMenu />}
              </button>
            </div>
          </div>
        </div>

        {/* Animated Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            menuOpen ? 'max-h-[300px] opacity-100 scale-y-100' : 'max-h-0 opacity-0 scale-y-95'
          } transform origin-top`}
        >
          <nav className="flex flex-col space-y-3 text-sm pt-4 pb-4 border-t border-gray-700 px-2">
            {navLinks.map(({ label, href, active }) => (
              <Link
                key={label}
                href={href}
                className={`${
                  active ? 'text-yellow-400' : 'text-gray-300'
                } hover:text-yellow-400`}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}
