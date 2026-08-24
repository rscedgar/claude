import { format, formatDistanceToNowStrict, isBefore, startOfDay } from "date-fns";
import { es } from "date-fns/locale";

export const formatShortDate = (iso: string): string =>
  format(new Date(iso), "d MMM", { locale: es });

export const formatFullDate = (iso: string): string =>
  format(new Date(iso), "d 'de' MMMM, yyyy", { locale: es });

export const formatRelativeTime = (iso: string): string =>
  formatDistanceToNowStrict(new Date(iso), { addSuffix: true, locale: es });

export const isOverdue = (iso: string | null): boolean => {
  if (!iso) return false;
  return isBefore(new Date(iso), startOfDay(new Date()));
};

export const isToday = (iso: string | null): boolean => {
  if (!iso) return false;
  return format(new Date(iso), "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd");
};
