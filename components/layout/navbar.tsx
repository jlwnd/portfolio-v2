"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { usePathname } from "@/i18n/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "../ui/button";
import { LocaleSwitcher } from "../locale-switcher";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const t = useTranslations("nav");

  const navItems = [
    { href: "/", label: t("home") },
    { href: "/projects", label: t("projects") },
  ] as const;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
          scrolled
            ? "bg-card/95 backdrop-blur-md border-primary/15 shadow-lg shadow-black/20"
            : "bg-background/90 backdrop-blur-md border-primary/10 shadow-md shadow-black/10",
        )}
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="/images/Memoji-laptop.png"
                alt="Logo"
                width={64}
                height={64}
              />
            </motion.div>
            <span className="font-bold text-lg hidden sm:inline-block">
              Jakub Lewandowski
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.href
                    ? "text-foreground"
                    : "text-muted-foreground",
                )}
              >
                {item.label}
              </Link>
            ))}
            <LocaleSwitcher />
          </nav>

          <div className="flex items-center gap-1 md:hidden">
            <LocaleSwitcher />
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)}>
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 z-[60] md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              className="fixed inset-0 z-[70] md:hidden bg-[hsl(240,10%,3.9%)]"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="flex justify-end p-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close menu</span>
                </Button>
              </div>
              <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)] gap-8">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "text-2xl font-medium transition-colors hover:text-primary",
                        pathname === item.href
                          ? "text-foreground"
                          : "text-muted-foreground",
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
