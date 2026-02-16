"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

export function LocaleSwitcher() {
  const t = useTranslations("localeSwitcher");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const nextLocale = locale === "en" ? "pl" : "en";

  const handleSwitch = () => {
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleSwitch}
      className="flex items-center gap-1.5 text-muted-foreground hover:text-primary"
      aria-label={t("label")}
    >
      <Globe className="h-4 w-4" />
      <span className="text-xs font-medium">{t(nextLocale)}</span>
    </Button>
  );
}
