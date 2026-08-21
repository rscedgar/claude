"use client";

import { cn } from "@/lib/cn";
import { styles } from "./styles";
import type { AvatarGroupProps } from "./types";

const visibleCount = 3;

const AvatarGroup = ({ users, className }: AvatarGroupProps) => {
  const visible = users.slice(0, visibleCount);
  const remaining = users.length - visible.length;

  return (
    <div className={cn(styles.root, className)} title={users.map((u) => u.name).join(", ")}>
      {visible.map((user) => (
        <span
          key={user.id}
          role="img"
          aria-label={user.name}
          className={cn(styles.avatar, styles.ring)}
          style={{ backgroundColor: `${user.avatarColor}33`, color: user.avatarColor }}
        >
          {user.initials}
        </span>
      ))}
      {remaining > 0 && (
        <span className={cn(styles.avatar, styles.ring, styles.more)}>
          +{remaining}
        </span>
      )}
    </div>
  );
};

export default AvatarGroup;
