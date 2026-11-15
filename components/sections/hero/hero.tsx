import { getHeroContent } from "@/lib/queries";
import { HeroMotion } from "./hero-motion";

export async function Hero({ locale }: { locale: string }) {
  const hero = await getHeroContent(locale);

  return (
    <section className="relative isolate min-h-screen flex items-center justify-center pt-16 bg-background overflow-hidden">
      {/* Fine grid, fading out towards the edges. */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,hsl(var(--foreground)/0.07)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--foreground)/0.07)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_45%,black_20%,transparent_100%)]"
        aria-hidden
      />

      {/* Small white backlight behind the avatar. */}
      <div
        className="hero-glow pointer-events-none absolute left-1/2 top-[42%] -z-10 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,hsl(0_0%_100%/0.14),hsl(0_0%_100%/0.04)_40%,transparent_70%)]"
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
