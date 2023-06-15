import supabase from "@/lib/supabase-server";
import * as React from "react";

import CollectionFeed from "@/components/collection-feed";

const page = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from("extractions")
    .select()
    .eq("userId", user?.id)
    .order("created_at", { ascending: false });

  if (error) console.log(error);

  return <CollectionFeed extractions={data} />;
};

export default page;
