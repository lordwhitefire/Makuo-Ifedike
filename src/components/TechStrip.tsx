"use client";

import { useRef } from "react";

type Stack = { name: string; src: string };

/**
 * My Stack — reference treatment: a bare logo strip, no heading, no cards.
 * Five logos per view at desktop (2 / 3 / 4 / 5 across the reference's
 * breakpoints), 40px gaps, logos at 50% opacity, full on hover. Drag with the
 * mouse or swipe on touch to reach the remaining logos. No autoplay, no loop,
 * no dots — exactly like the reference's Swiper config.
 */
export default function TechStrip({ stacks }: { stacks: Stack[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, startLeft: 0 });

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return; // touch/pen use native scrolling
    const el = trackRef.current;
    if (!el) return;
    drag.current = { active: true, startX: e.clientX, startLeft: el.scrollLeft };
    el.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    if (!el || !drag.current.active) return;
    el.scrollLeft = drag.current.startLeft - (e.clientX - drag.current.startX);
  };

  const endDrag = () => {
    drag.current.active = false;
  };

  return (
    <div
      ref={trackRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      className="flex cursor-grab select-none gap-5 overflow-x-auto active:cursor-grabbing min-[576px]:gap-[30px] md:gap-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {stacks.map((s) => (
        <div
          key={s.name}
          title={s.name}
          className="group h-14 shrink-0 grow-0 basis-[calc((100%-20px)/2)] min-[576px]:basis-[calc((100%-60px)/3)] md:basis-[calc((100%-120px)/4)] lg:basis-[calc((100%-160px)/5)]"
        >
          <img
            src={`/logos/${s.src}.svg`}
            alt={s.name}
            width={56}
            height={56}
            draggable={false}
            className="h-14 w-14 opacity-50 transition-opacity duration-300 group-hover:opacity-100"
          />
        </div>
      ))}
    </div>
  );
}
