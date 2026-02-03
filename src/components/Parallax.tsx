"use client";

import { ReactNode, useRef, useEffect, useId } from "react";
import {
  m,
  useReducedMotion,
  useTransform,
  useMotionValue,
} from "framer-motion";
import { useOptionalScrollContext } from "../lib/scroll-context";

interface ParallaxProps {
  children: ReactNode;
  /**
   * Parallax speed multiplier.
   * - Positive values: element moves up as you scroll down (appears to move faster)
   * - Negative values: element moves down as you scroll down (appears to move slower/lag)
   * - Typical range: -2 to 2
   *
   * Maps to Locomotive Scroll's data-scroll-speed behavior:
   * - speed="2" → element moves up faster
   * - speed="0.5" → element moves up slower
   * - speed="-0.6" → element moves down
   */
  speed?: number;
  /**
   * Direction of the parallax effect.
   * - "vertical": translateY (default)
   * - "horizontal": translateX
   */
  direction?: "vertical" | "horizontal";
  /**
   * Optional className for the wrapper element.
   */
  className?: string;
  /**
   * Base pixel range for the parallax effect.
   * The actual movement will be baseRange * speed pixels.
   * Default: 50
   */
  baseRange?: number;
}

/**
 * Parallax component that creates scroll-linked animations using Framer Motion.
 * Replaces Locomotive Scroll's data-scroll and data-scroll-speed attributes.
 *
 * This optimized version uses a shared ScrollProvider context instead of creating
 * individual useScroll hooks for each instance, significantly reducing the number
 * of scroll listeners and improving performance.
 *
 * Respects user's prefers-reduced-motion setting for accessibility.
 */
const Parallax = ({
  children,
  speed = 1,
  direction = "vertical",
  className = "",
  baseRange = 50,
}: ParallaxProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const uniqueId = useId();
  const prefersReducedMotion = useReducedMotion();
  const scrollContext = useOptionalScrollContext();

  // Create a motion value that we'll update based on scroll progress
  const progress = useMotionValue(0.5);

  // Calculate the pixel offset based on speed
  const range = baseRange * speed;

  // Transform progress (0-1) to pixel offset
  const transform = useTransform(progress, [0, 1], [range, -range]);

  // Register with scroll context and update progress on scroll
  useEffect(() => {
    if (!scrollContext || prefersReducedMotion) return;

    const { scrollY, registerElement, getElementProgress } = scrollContext;

    // Register this element
    const unregister = registerElement(uniqueId, ref);

    // Subscribe to scroll changes and update progress
    const unsubscribe = scrollY.on("change", () => {
      const elementProgress = getElementProgress(uniqueId);
      progress.set(elementProgress);
    });

    // Set initial progress
    requestAnimationFrame(() => {
      const elementProgress = getElementProgress(uniqueId);
      progress.set(elementProgress);
    });

    return () => {
      unregister();
      unsubscribe();
    };
  }, [scrollContext, uniqueId, progress, prefersReducedMotion]);

  // If user prefers reduced motion or no scroll context, don't apply parallax transforms
  const style =
    prefersReducedMotion || !scrollContext
      ? {}
      : direction === "vertical"
        ? { y: transform }
        : { x: transform };

  return (
    <m.div ref={ref} style={style} className={className}>
      {children}
    </m.div>
  );
};

export default Parallax;
