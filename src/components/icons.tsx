import * as React from "react";

import {
  AtSign,
  Lock,
  User2,
  LogOut,
  FileType,
  Image,
  Upload,
  X,
  type Icon as LucideIcon,
  Loader2,
} from "lucide-react";

export type Icon = LucideIcon;

export const Icons = {
  at: AtSign,
  lock: Lock,
  profile: User2,
  logout: LogOut,
  extract: FileType,
  image: Image,
  upload: Upload,
  x: X,
  spinner: Loader2,
};
