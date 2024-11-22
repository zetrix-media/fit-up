'use client';

import { usePathname } from 'next/navigation';
import Sidebar from '@/components/Sidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Exclude Sidebar on the login page
  const isLoginPage = pathname === '/admin/login';

  return (
    <div className="flex">
      {!isLoginPage && <Sidebar />}
      <main className={`flex-1 ${isLoginPage ? '' : 'p-4'}`}>{children}</main>
    </div>
  );
}
