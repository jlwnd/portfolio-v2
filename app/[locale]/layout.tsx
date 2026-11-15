import { ContactButton } from "@/components/contact-button";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { routing } from "@/i18n/routing";
import { getSiteSettings } from "@/lib/queries";
import { SITE_URL, localizedUrl } from "@/lib/site";
import type { Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const site = await getSiteSettings();

  return {
    metadataBase: new URL(SITE_URL),
    title: t("title"),
    description: t("description"),
    applicationName: site.name,
    authors: [{ name: site.name, url: SITE_URL }],
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: locale === "pl" ? "pl_PL" : "en_US",
      url: localizedUrl(locale),
      title: t("title"),
      description: t("description"),
      ...(site.ogImageUrl && {
        images: [{ url: site.ogImageUrl, width: 1200, height: 630 }],
      }),
    },
    twitter: {
      card: site.ogImageUrl ? "summary_large_image" : "summary",
      title: t("title"),
      description: t("description"),
    },
  };
}

export const viewport: Viewport = {
  initialScale: 1,
  width: "device-width",
  height: "device-height",
  maximumScale: 1,
  userScalable: false,
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "pl")) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();
  const site = await getSiteSettings();

  return (
    <html lang={locale}>
      <body className={`${inter.className} antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
          >
            <Navbar site={site} />
            <main>{children}</main>
            <Footer site={site} />
            <ContactButton site={site} />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
