import { supabase } from "@/utils/supabaseClient";

export async function fetchProducts(limit = 1) {
    // Query the 'productvariants' table and join with 'products' table
    const { data, error } = await supabase
        .from("productvariants")
        .select(`
            *,
            products (
                name,
                description,
                categoryid,
                brandid
            )
        `)
        .limit(limit);

    if (error) {
        console.error("Error fetching products:", error);
        throw new Error("Unable to fetch products");
    }

    // Return the fetched products with joined product info
    return data || [];
}