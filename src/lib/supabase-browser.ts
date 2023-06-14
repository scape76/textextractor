import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";

const createClient = createPagesBrowserClient<Database>();

export default createClient;
