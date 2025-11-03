import React, { useEffect, useRef } from "react";

export default function CursorHalo() {
  if (typeof window === "undefined") return null;
  const r = 48;
  const halo = useRef<HTMLDivElement>(null);
  const dots = Array.from({ length: 6 }).map(() => useRef<HTMLDivElement>(null));

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    let x = -999, y = -999;
    const onMove = (e: MouseEvent) => { x = e.clientX; y = e.clientY; };
    window.addEventListener("mousemove", onMove);

    let raf = 0; const lag = dots.map((_, i) => 0.15 + i * 0.06);
    const loop = () => {
      const H = halo.current; if (H) H.style.transform = `translate(${x - r}px, ${y - r}px)`;
      dots.forEach((ref, i) => {
        const el = ref.current; if (!el) return;
        const dx = x - el.offsetLeft, dy = y - el.offsetTop;
        el.style.transform = `translate(${el.offsetLeft + dx * lag[i]}px, ${el.offsetTop + dy * lag[i]}px)`;
      });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("mousemove", onMove); };
  }, []);

  return (
    <>
      <div ref={halo}
        className="pointer-events-none fixed z-50 size-24 -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-overlay opacity-30 blur-md border border-zinc-400/40 dark:border-zinc-600/30" />
      {dots.map((r,i)=>(
        <div key={i} ref={r} className="pointer-events-none fixed z-40 size-2 rounded-full bg-zinc-900/40 dark:bg-zinc-100/40" />
      ))}
    </>
  );
}
