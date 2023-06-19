"use client";

import * as React from "react";
import type { User } from "@supabase/auth-helpers-nextjs";
import supabase from "@/lib/supabase-browser";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "@mantine/hooks";

import { Button, Flex, Header, Text, MediaQuery } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import UserNav from "@/components/UserNav";
import ThemeSwitch from "./ThemeSwitch";

interface NavProps {
  user: User | null;
}

const Nav: React.FC<NavProps> = ({ user }) => {
  const router = useRouter();
  const matches = useMediaQuery("(max-width: 768px)");

  async function logout() {
    const { error } = await supabase.auth.signOut();

    if (error) toast.error(error.message);
    else router.refresh();
  }

  return (
    <Header height={60} p="lg">
      <Flex justify={"space-between"} align={"center"} h={"100%"}>
        <Flex align={"center"} gap={"md"}>
          <Link href={"/"}>
            <Flex align={"center"} gap={"sm"}>
              <Image
                width={38}
                height={38}
                src="/android-chrome-512x512.png"
                alt="textextractor icon"
              />
              <Text size={"lg"}>Textextractor</Text>
            </Flex>
          </Link>
          {!matches && (
            <>
              <Link href="/extract">
                <Text size={"lg"}>Extract</Text>
              </Link>
              {user && (
                <Link href="/collection">
                  <Text size={"lg"}>Collection</Text>
                </Link>
              )}
            </>
          )}
        </Flex>
        <Flex gap={"lg"}>
          {matches ? (
            <UserNav user={user} />
          ) : (
            <>
              <ThemeSwitch size="lg" iconSize={18}/>
              {!user && (
                <Link href={"/login"}>
                  <Button>Login</Button>
                </Link>
              )}
              {!!user && <Button onClick={logout}>Logout</Button>}
            </>
          )}
        </Flex>
      </Flex>
    </Header>
  );
};

export default Nav;
