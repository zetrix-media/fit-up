'use client';

import { usePathname } from 'next/navigation';
import Sidebar from '@/components/Sidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isLoginPage = pathname === '/admin/login';

  return (
    <div className="relative min-h-screen">
      {!isLoginPage && <Sidebar />}

      <main
        className={`${
          isLoginPage ? '' : 'ml-64'
        } h-screen overflow-y-auto p-4`}
      >
        {children}
      </main>
    </div>
  );
}
