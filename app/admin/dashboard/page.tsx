"use client";

import React from 'react';
import { useAuth } from '@/hooks/useAuth';

const DashboardPage = () => {
  const { admin, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Welcome, {admin?.name}</h1>
      <p>This is your admin dashboard.</p>
    </div>
  );
};

export default DashboardPage;
