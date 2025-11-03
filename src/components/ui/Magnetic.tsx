import React, { useEffect, useRef, useState } from "react";
export default function Magnetic({ children }: { children: React.ReactElement }) {
  const ref = useRef<HTMLDivElement>(null);
  const [xy, set] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect(), mx = e.clientX - (r.left + r.width/2), my = e.clientY - (r.top + r.height/2);
      set({ x: mx * 0.2, y: my * 0.2 });
    };
    const out = () => set({ x: 0, y: 0 });
    el.addEventListener("mousemove", onMove); el.addEventListener("mouseleave", out);
    return () => { el.removeEventListener("mousemove", onMove); el.removeEventListener("mouseleave", out); };
  }, []);
  return <div ref={ref} style={{ display:"inline-block" }}>{React.cloneElement(children, { style:{ transform:`translate(${xy.x}px, ${xy.y}px)` }})}</div>;
}
