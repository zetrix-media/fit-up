import { Suspense } from 'react';

export default function BrandsLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div className="text-center">Loading...</div>}>
      {children}
    </Suspense>
  );
}
