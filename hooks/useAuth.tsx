"use client";

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export const useAuth = () => {
  const [admin, setAdmin] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchAdmin = async () => {
      const adminToken = Cookies.get('adminToken');

      if (!adminToken) {
        setLoading(false);
        router.push('/admin/login');
        return;
      }

      // Validate the token against the database
      const { data, error } = await supabase
        .from('administration')
        .select('*')
        .eq('id', adminToken);

      // Handle the response
      if (error) {
        setLoading(false);
        router.push('/admin/login');
      } else {
        setAdmin(data[0]);
        setLoading(false);
      }
    };

    fetchAdmin();
  }, [router]);

  return { admin, loading };
};
