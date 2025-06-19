// lib/supabaseServer.ts
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { type Database } from "@/types/supabase";

// 🔁 Make it a function you call inside the actual server component
export async function getSupabaseServerClient() {
  const cookieStore = cookies(); // ✅ now safe in Next 14.2+
  return createServerComponentClient<Database>({ cookies: () => cookieStore });
}
