import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date, locale: string = "pl"): string {
  const localeMap: Record<string, string> = {
    en: "en-US",
    pl: "pl-PL",
  };

  return new Intl.DateTimeFormat(localeMap[locale] || "pl-PL", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}
