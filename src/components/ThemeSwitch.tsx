"use client";

import * as React from "react";
import {
  Flex,
  Switch,
  type SwitchProps,
  useMantineColorScheme,
} from "@mantine/core";
import { Icons } from "./Icons";

interface ThemeSwitchProps extends SwitchProps {
  iconSize?: number | string | null;
}

const ThemeSwitch: React.FC<ThemeSwitchProps> = ({ size, iconSize }) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Flex align={"center"}>
      <Switch
        color={colorScheme === "dark" ? "gray" : "dark"}
        onLabel={<Icons.moon size={iconSize ?? "14"} />}
        offLabel={<Icons.sun size={iconSize ?? "14"} />}
        size={size}
        onClick={() => toggleColorScheme()}
      />
    </Flex>
  );
};

export default ThemeSwitch;
