"use client";

import { ReactNode, useRef } from "react";
import { m, useReducedMotion, useScroll, useTransform } from "framer-motion";

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
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    // Track from when element enters viewport to when it leaves
    offset: ["start end", "end start"],
  });

  // Calculate the pixel offset based on speed
  // When scrollYProgress is 0 (element entering from bottom), position is positive (down/right)
  // When scrollYProgress is 1 (element leaving at top), position is negative (up/left)
  const range = baseRange * speed;

  const transform = useTransform(scrollYProgress, [0, 1], [range, -range]);

  // If user prefers reduced motion, don't apply parallax transforms
  const style = prefersReducedMotion
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
