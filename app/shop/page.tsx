// app/shop/page.tsx
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
// import CategoryTabs from '@/components/CategoryTabs';
import ClientCategoryView from '@/components/ClientCategoryView';

export default async function ShopPage() {
  const supabase = createServerComponentClient({ cookies });

  const { data: categories } = await supabase
    .from('categories')
    .select('categoryid, categoryname')
    .order('categoryid');

  const defaultCategoryId = categories?.[0]?.categoryid;

  const { data: defaultProducts } = await supabase
    .from('products')
    .select('productid, name, productvariants(mainimageurl, color, price)')
    .eq('categoryid', defaultCategoryId)
    .order('createdat', { ascending: false });

  return (
    <>
    <Navbar />
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-center text-3xl font-semibold mb-8">Shop by Category</h1>
      <ClientCategoryView
        categories={categories ?? []}
        defaultProducts={defaultProducts ?? []}
      />
    </div>

    <Footer />
    </>
  );
}
