import supabase from "@/lib/supabase-server";
import * as React from "react";

import CollectionFeed from "@/components/CollectionFeed";

const page = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from("extractions")
    .select()
    .eq("userId", user?.id);

  if (error) console.log(error);

  return <CollectionFeed extractions={data} />;
};

export default page;
