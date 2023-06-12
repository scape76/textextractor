import * as React from "react";

import {
  AtSign,
  Lock,
  User2,
  LogOut,
  FileType,
  type Icon as LucideIcon,
} from "lucide-react";

export type Icon = LucideIcon;

export const Icons = {
  at: AtSign,
  lock: Lock,
  profile: User2,
  logout: LogOut,
  extract: FileType,
};
