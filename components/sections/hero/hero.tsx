import { getHeroContent } from "@/lib/queries";
import { HeroMotion } from "./hero-motion";

export async function Hero({ locale }: { locale: string }) {
  const hero = await getHeroContent(locale);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 bg-background">
      <div
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(var(--foreground),0.15),transparent_50%)]"
        aria-hidden
      />

      <HeroMotion hero={hero} />
    </section>
  );
}
