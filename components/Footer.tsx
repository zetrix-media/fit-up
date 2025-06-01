'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12 px-6 lg:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10">
        {/* Logo and Contact Info */}
        <div>
          <Image
            src="/assets/fitup_logo_dark_no_bg.png"
            alt="FitUp Logo"
            width={150}
            height={60}
            priority
          />
          <p className="mt-4 text-sm leading-relaxed">
            45 A St - Naif - Dubai Ground floor Shop No. 5<br />
            Burj Nahar Views Opt. of Nesto Hyper Market - Dubai
          </p>
          <p className="mt-2 text-sm">Tel.: 056 400 9967</p>

          {/* Social Icons */}
          <div className="flex mt-4 space-x-4">
            <Link href="#" aria-label="Facebook">
              <div className="w-10 h-10 border border-white rounded-full flex items-center justify-center hover:bg-white hover:text-black transition">
                <i className="fab fa-facebook-f" />
              </div>
            </Link>
            <Link href="#" aria-label="X">
              <div className="w-10 h-10 border border-white rounded-full flex items-center justify-center hover:bg-white hover:text-black transition">
                <i className="fab fa-x-twitter" />
              </div>
            </Link>
            <Link href="#" aria-label="Instagram">
              <div className="w-10 h-10 border border-white rounded-full flex items-center justify-center hover:bg-white hover:text-black transition">
                <i className="fab fa-instagram" />
              </div>
            </Link>
            <Link href="#" aria-label="Pinterest">
              <div className="w-10 h-10 border border-white rounded-full flex items-center justify-center hover:bg-white hover:text-black transition">
                <i className="fab fa-pinterest-p" />
              </div>
            </Link>
          </div>
        </div>

        {/* About Us */}
        <div>
          <h4 className="font-semibold text-lg mb-4">About Us</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="#">Our Story</Link></li>
            <li><Link href="#">Mission & Values</Link></li>
            <li><Link href="#">Meet the Team</Link></li>
            <li><Link href="#">Sustainability Efforts</Link></li>
            <li><Link href="#">Brand Partnerships</Link></li>
            <li><Link href="#">Influencer Collaborations</Link></li>
          </ul>
        </div>

        {/* Accessibility */}
        <div>
          <h4 className="font-semibold text-lg mb-4">Accessibility</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="#">Accessibility Statement</Link></li>
            <li><Link href="#">Site Map</Link></li>
            <li><Link href="#">Web Accessibility Options</Link></li>
            <li><Link href="#">ADA Compliance</Link></li>
            <li><Link href="#">Privacy Policy</Link></li>
            <li><Link href="#">Terms of Service</Link></li>
          </ul>
        </div>

        {/* Community */}
        <div>
          <h4 className="font-semibold text-lg mb-4">Join Our Community</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="#">VIP Membership</Link></li>
            <li><Link href="#">Loyalty Program</Link></li>
            <li><Link href="#">Customer Reviews</Link></li>
            <li><Link href="#">Style Forums</Link></li>
            <li><Link href="#">Job Openings</Link></li>
            <li><Link href="#">Culture and Values</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="font-semibold text-lg mb-4">Let’s get in touch</h4>
          <p className="text-sm mb-4">
            Sign up for our newsletter and receive 10% off your
          </p>
          <form className="flex items-center">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-2 text-black rounded-l-md outline-none"
            />
            <button
              type="submit"
              className="bg-white text-black px-4 py-2 rounded-r-md hover:bg-gray-200 transition"
            >
              →
            </button>
          </form>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-10 border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
        <p>© 2024 Fitup Uniforms All rights reserved.</p>
        <div className="flex items-center space-x-6 mt-4 md:mt-0">
          <Image src="/assets/amazon.png" alt="Amazon" width={50} height={20} />
          <Image src="/assets/amex.png" alt="American Express" width={50} height={20} />
          <Image src="/assets/paypal.png" alt="PayPal" width={50} height={20} />
          {/* <Image src="/assets/cod.png" alt="Cash on Delivery" width={50} height={20} /> */}
        </div>
      </div>
    </footer>
  )
}
