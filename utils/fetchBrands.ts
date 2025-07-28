// utils/fetchBrands.ts
import { supabase } from "@/utils/supabaseClient";

export const fetchBrands = async () => {
  const { data, error } = await supabase
    .from('brands')
    .select('brandid, brandname, brandimage');

  if (error) {
    console.error('❌ Supabase Error:', error.message);
    throw new Error('Unable to fetch brands');
  }

  return data;
};