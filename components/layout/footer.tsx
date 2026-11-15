import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { SiteSettings } from "@/types";

export const Footer = ({ site }: { site: SiteSettings }) => {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-primary/10 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            {site.githubUrl && (
              <Link
                href={site.githubUrl}
                target="_blank"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </Link>
            )}
            {site.linkedinUrl && (
              <Link
                href={site.linkedinUrl}
                target="_blank"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
            )}
            <Link
              href={`mailto:${site.email}`}
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label={t("emailLabel")}
            >
              <Mail className="h-5 w-5" />
            </Link>
          </div>

          <div className="text-sm text-muted-foreground text-center md:text-right">
            <p>{t("designedBy")}</p>
            <p>{t("allRightsReserved", { year: new Date().getFullYear() })}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
