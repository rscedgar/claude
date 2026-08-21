"use client";

import { cn } from "@/lib/cn";
import { styles } from "./styles";
import type { AvatarProps } from "./types";

const Avatar = ({ user, size = "md", className }: AvatarProps) => (
  <span
    role="img"
    aria-label={user.name}
    title={user.name}
    className={cn(styles.root, styles[size], className)}
    style={{ backgroundColor: `${user.avatarColor}33`, color: user.avatarColor }}
  >
    {user.initials}
  </span>
);

export default Avatar;
export type { AvatarProps };
