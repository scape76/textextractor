"use client";

import { Button, Flex, Navbar, Select } from "@mantine/core";
import * as React from "react";
import type { User } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import supabase from "@/lib/supabase-browser";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface navbarProps {
  user: User | null;
}

const navbar: React.FC<navbarProps> = ({ user }) => {
  console.log(user);
  const router = useRouter();

  async function logout() {
    const { error } = await supabase.auth.signOut();

    if (error) toast.error(error.message);
    else router.refresh();
  }

  return (
    <Flex p={"sm"} justify={"space-between"}>
      {!user && (
        <Link href={"/login"}>
          <Button>Login</Button>
        </Link>
      )}
      {!!user && <Button onClick={logout}>Logout</Button>}
    </Flex>
  );
};

export default navbar;
