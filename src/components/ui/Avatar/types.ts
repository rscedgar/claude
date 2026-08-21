import type { User } from "@/types";

export interface AvatarProps {
  user: User;
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
}

export interface AvatarStyles {
  root: string;
  xs: string;
  sm: string;
  md: string;
  lg: string;
}
