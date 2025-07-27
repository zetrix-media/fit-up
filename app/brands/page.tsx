import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BrandPageWrapper from '@/components/BrandPageWrapper';
import { Suspense } from 'react';

export default function BrandsPage() {
  return (
    <div className="bg-white">
      <div className="min-h-screen">
        <Suspense fallback={<div className="text-center">Loading...</div>}>
          <Navbar />
          <div className="max-w-7xl mx-auto px-6 py-12">
            <h1 className="text-center text-3xl font-semibold">Shop by Brands</h1>
            <BrandPageWrapper />
          </div>
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}
