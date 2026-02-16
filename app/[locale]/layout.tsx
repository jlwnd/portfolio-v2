import { ContactButton } from "@/components/contact-button";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { routing } from "@/i18n/routing";
import type { Viewport } from "next";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
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

  return {
    title: t("title"),
    description: t("description"),
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

  const messages = (await import(`../../messages/${locale}.json`)).default;

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
            <Navbar />
            <main>{children}</main>
            <Footer />
            <ContactButton />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
