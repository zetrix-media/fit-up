import { Suspense } from 'react';
import Navbar from "@/components/Navbar";
import ShopPageWrapper from '@/components/ShopPageWrapper';
import Footer from "@/components/Footer";

export default function ShopPage() {
  return (
    <div className='bg-white'>
      <div className="min-h-screen">
        <Suspense fallback={<div className="text-center">Loading...</div>}>
          <Navbar />
          <div className="max-w-7xl mx-auto px-6 py-12">
            <h1 className="text-center text-3xl font-semibold mb-8">Shop by Category</h1>
            <ShopPageWrapper />
          </div>
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}
