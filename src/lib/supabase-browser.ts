import { createClient } from "@supabase/supabase-js";

const getSupabaseCredentials = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl) {
    throw new Error("Supabase connection url is not provided");
  }

  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseAnonKey) {
    throw new Error("Supabase anon key is not provided");
  }

  return {
    supabaseUrl,
    supabaseAnonKey,
  };
};

export const supabase = createClient(
  getSupabaseCredentials().supabaseUrl,
  getSupabaseCredentials().supabaseAnonKey
);
