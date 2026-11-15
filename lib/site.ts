import { routing } from "@/i18n/routing";

/** Canonical origin (the apex domain redirects to www). */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.jakub-lewandowski.dev"
).replace(/\/$/, "");

/** Absolute URL for a path in a locale; the default locale has no prefix. */
export const localizedUrl = (locale: string, path = "") => {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  return `${SITE_URL}${prefix}${path}` || SITE_URL;
};

/** hreflang alternates for a path that is the same in every locale. */
export const languageAlternates = (path = "") => ({
  ...Object.fromEntries(
    routing.locales.map((locale) => [locale, localizedUrl(locale, path)]),
  ),
  "x-default": localizedUrl(routing.defaultLocale, path),
});
