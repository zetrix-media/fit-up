import { Suspense } from 'react';
import ShopPageWrapper from '@/components/ShopPageWrapper';

export default function ShopPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-center text-3xl font-semibold mb-8">Shop by Category</h1>
      <Suspense fallback={<div className="text-center">Loading...</div>}>
        <ShopPageWrapper />
      </Suspense>
    </div>
  );
}
