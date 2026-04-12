import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://gqggtthwmguzjrgsfblz.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

if (!supabaseAnonKey) {
  console.warn("Supabase anon key is missing from environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);