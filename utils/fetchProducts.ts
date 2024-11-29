import { supabase } from "@/utils/supabaseClient";

export async function fetchProducts() {
    // Query the 'productvariants' table in Supabase
    const { data, error } = await supabase
        .from("productvariants")
        .select("*");

    if (error) {
        console.error("Error fetching products:", error);
        throw new Error("Unable to fetch products");
    }

    // Return the fetched products
    return data || [];
}