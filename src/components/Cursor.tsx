"use client";

import { FC, useEffect, useRef } from "react";

// Threshold in pixels - if the difference between real and displayed position
// is below this, skip the update to save CPU cycles
const MOVEMENT_THRESHOLD = 0.1;

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

  // Track if animation is needed
  const isAnimating = useRef(false);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const updateMouse = () => {
      const dx = realMouse.current.x - displayedMouse.current.x;
      const dy = realMouse.current.y - displayedMouse.current.y;

      // Check if movement is significant enough to warrant an update
      if (
        Math.abs(dx) > MOVEMENT_THRESHOLD ||
        Math.abs(dy) > MOVEMENT_THRESHOLD
      ) {
        displayedMouse.current.x += dx * 0.1;
        displayedMouse.current.y += dy * 0.1;

        if (cursorRef.current) {
          cursorRef.current.style.transform = `translate3d(${displayedMouse.current.x}px, ${displayedMouse.current.y}px, 0)`;
        }

        // Continue animating
        rafId.current = requestAnimationFrame(updateMouse);
      } else {
        // Snap to final position and stop animating
        displayedMouse.current.x = realMouse.current.x;
        displayedMouse.current.y = realMouse.current.y;

        if (cursorRef.current) {
          cursorRef.current.style.transform = `translate3d(${displayedMouse.current.x}px, ${displayedMouse.current.y}px, 0)`;
        }

        isAnimating.current = false;
        rafId.current = null;
      }
    };

    const startAnimation = () => {
      if (!isAnimating.current) {
        isAnimating.current = true;
        rafId.current = requestAnimationFrame(updateMouse);
      }
    };

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

        // Only start the animation loop if not already running
        startAnimation();
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
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
