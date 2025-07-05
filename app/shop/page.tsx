import { Suspense } from 'react';
import Navbar from "@/components/Navbar";
import ShopPageWrapper from '@/components/ShopPageWrapper';
import Footer from "@/components/Footer";

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-center text-3xl font-semibold mb-8">Shop by Category</h1>
        <Suspense fallback={<div className="text-center">Loading...</div>}>
          <ShopPageWrapper />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}
