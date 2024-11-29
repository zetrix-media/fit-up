import { supabase } from "@/utils/supabaseClient";

export async function fetchCategories() {
  // Query the 'categories' table in Supabase
  const { data, error } = await supabase
    .from("categories")
    .select("categoryid, categoryname, productcount, categoryimage");

  if (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Unable to fetch categories");
  }

  // Return the fetched categories
//   console.log(data);

  return data || [];
}
