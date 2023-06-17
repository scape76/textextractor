import * as React from "react";

import { Menu, Burger, Flex } from "@mantine/core";
import { Icons } from "./Icons";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import type { User } from "@supabase/auth-helpers-nextjs";
import ThemeSwitch from "./ThemeSwitch";

interface UserNavProps {
  user: User | null;
}

const UserNav: React.FC<UserNavProps> = ({ user }) => {
  const [opened, { toggle }] = useDisclosure(false);
  const label = opened ? "Close navigation" : "Open navigation";
  return (
    <Menu shadow="md" width={200} onChange={toggle} position={"bottom-end"}>
      <Menu.Target>
        <Burger opened={opened} aria-label={label} />
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>
          <Flex justify={"space-between"}>
            Application <ThemeSwitch />
          </Flex>
        </Menu.Label>
        <Link href={"/extract"}>
          <Menu.Item icon={<Icons.extract size={14} />}>Extract</Menu.Item>
        </Link>
        {user && (
          <Link href="/collection">
            <Menu.Item icon={<Icons.group size={14} />}>Collection</Menu.Item>
          </Link>
        )}

        <Menu.Divider />

        {user ? (
          <>
            <Menu.Label>Danger zone</Menu.Label>
            <Menu.Item color="red" icon={<Icons.logout size={14} />}>
              Logout
            </Menu.Item>
          </>
        ) : (
          <>
            <Link href={"/login"}>
              <Menu.Item color="green" icon={<Icons.logout size={14} />}>
                Login
              </Menu.Item>
            </Link>
          </>
        )}
      </Menu.Dropdown>
    </Menu>
  );
};

export default UserNav;
