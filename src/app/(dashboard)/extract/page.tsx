import * as React from "react";
import supabase from "@/lib/supabase-server";
import Converter from "@/components/coverter";

const page = async ({}) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <Converter user={user} />;
};

export default page;
