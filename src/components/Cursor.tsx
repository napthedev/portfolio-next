"use client";

import { FC, useEffect, useRef } from "react";

const Cursor: FC = () => {
  const isFirstMove = useRef(true);

  const cursorRef = useRef<HTMLDivElement>(null);

  const realMouse = useRef({
    x: 0,
    y: 0,
  });
  const displayedMouse = useRef({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        if (isFirstMove.current) {
          cursorRef.current.style.display = "block";
          displayedMouse.current.x = e.clientX;
          displayedMouse.current.y = e.clientY;
          isFirstMove.current = false;
        }

        realMouse.current.x = e.clientX;
        realMouse.current.y = e.clientY;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    let rafId: number | null = null;
    const updateMouse = () => {
      rafId = requestAnimationFrame(updateMouse);

      displayedMouse.current.x +=
        (realMouse.current.x - displayedMouse.current.x) * 0.1;
      displayedMouse.current.y +=
        (realMouse.current.y - displayedMouse.current.y) * 0.1;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${displayedMouse.current.x}px, ${displayedMouse.current.y}px, 0)`;
      }
    };

    updateMouse();

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="w-7 h-7 bg-transparent border border-white rounded-full fixed z-50 pointer-events-none hidden transition duration-75 will-change-transform top-0 left-0"
      style={{ marginLeft: "-14px", marginTop: "-14px" }}
    ></div>
  );
};

export default Cursor;
