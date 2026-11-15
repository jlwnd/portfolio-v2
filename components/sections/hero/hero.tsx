import { getHeroContent } from "@/lib/queries";
import { HeroMotion } from "./hero-motion";
import { NeuralNetwork } from "./neural-network";

export async function Hero({ locale }: { locale: string }) {
  const hero = await getHeroContent(locale);

  return (
    <section className="relative isolate min-h-screen flex items-center justify-center pt-16 bg-background overflow-hidden">
      <NeuralNetwork className="absolute inset-0 -z-10 h-full w-full [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_85%)]" />

      {/* Soft glow behind the content, keeps text readable over the network. */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,hsl(var(--primary)/0.18),hsl(var(--background)/0.85)_45%,transparent_70%)] blur-2xl"
        aria-hidden
      />

      {/* Fade into the next section. */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-background"
        aria-hidden
      />

      <HeroMotion hero={hero} />
    </section>
  );
}
