import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const createClient = () =>
  createServerComponentClient({
    cookies,
  });
  
export default createClient;
