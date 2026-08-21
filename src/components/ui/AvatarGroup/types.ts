import type { User } from "@/types";

export interface AvatarGroupProps {
  users: User[];
  className?: string;
}

export interface AvatarGroupStyles {
  root: string;
  avatar: string;
  ring: string;
  more: string;
}
