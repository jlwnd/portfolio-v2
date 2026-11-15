"use client";

import { useEffect, useRef } from "react";

/**
 * Soft white glow that follows the cursor within the parent section and
 * slightly brightens the background grid around it. Only on devices with a
 * fine pointer (mouse/trackpad); invisible until the pointer enters.
 */
export function HeroSpotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const section = el?.parentElement;
    if (!el || !section) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let frame = 0;
    const move = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        el.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
        el.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
        el.style.opacity = "1";
      });
    };
    const leave = () => {
      cancelAnimationFrame(frame);
      el.style.opacity = "0";
    };

    section.addEventListener("pointermove", move);
    section.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(frame);
      section.removeEventListener("pointermove", move);
      section.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500"
      aria-hidden
    >
      {/* Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(320px_circle_at_var(--spot-x)_var(--spot-y),hsl(0_0%_100%/0.07),transparent_70%)]" />
      {/* Grid highlight */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--foreground)/0.14)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--foreground)/0.14)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(220px_circle_at_var(--spot-x)_var(--spot-y),black,transparent)]" />
    </div>
  );
}
