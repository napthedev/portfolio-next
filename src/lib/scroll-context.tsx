"use client";

import {
  createContext,
  useContext,
  useRef,
  useEffect,
  useState,
  useCallback,
  ReactNode,
  RefObject,
} from "react";
import { MotionValue, useMotionValue, useReducedMotion } from "framer-motion";

interface ScrollContextValue {
  scrollY: MotionValue<number>;
  viewportHeight: number;
  registerElement: (
    _id: string,
    _ref: RefObject<HTMLElement | null>,
  ) => () => void;
  getElementProgress: (_id: string) => number;
}

const ScrollContext = createContext<ScrollContextValue | null>(null);

interface ElementEntry {
  ref: RefObject<HTMLElement | null>;
  top: number;
  height: number;
}

interface ScrollProviderProps {
  children: ReactNode;
}

/**
 * ScrollProvider - A centralized scroll management system for parallax effects.
 *
 * Instead of each Parallax component creating its own scroll listener via useScroll,
 * this provider creates a single scroll listener that all Parallax components share.
 *
 * Benefits:
 * - Single scroll event listener instead of N listeners
 * - Single RAF loop for scroll updates
 * - Reduced memory overhead from fewer MotionValue subscriptions
 * - Better performance on scroll-heavy pages
 */
export function ScrollProvider({ children }: ScrollProviderProps) {
  const scrollY = useMotionValue(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const elementsRef = useRef<Map<string, ElementEntry>>(new Map());
  const prefersReducedMotion = useReducedMotion();

  // Update scroll position using RAF for smooth performance
  useEffect(() => {
    if (typeof window === "undefined") return;

    setViewportHeight(window.innerHeight);

    const updateScroll = () => {
      const currentScrollY = window.scrollY;
      scrollY.set(currentScrollY);
    };

    // Update scroll on scroll events
    window.addEventListener("scroll", updateScroll, { passive: true });

    // Initial update
    updateScroll();

    // Handle resize
    const handleResize = () => {
      setViewportHeight(window.innerHeight);

      // Update cached element positions on resize
      elementsRef.current.forEach((entry) => {
        if (entry.ref.current) {
          const rect = entry.ref.current.getBoundingClientRect();
          entry.top = rect.top + window.scrollY;
          entry.height = rect.height;
        }
      });
    };

    // Debounced resize handler
    let resizeTimeout: ReturnType<typeof setTimeout>;
    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 100);
    };

    window.addEventListener("resize", debouncedResize, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", debouncedResize);
      clearTimeout(resizeTimeout);
    };
  }, [scrollY]);

  // Register an element for parallax tracking
  const registerElement = useCallback(
    (id: string, ref: RefObject<HTMLElement | null>) => {
      // Calculate initial position after a short delay to ensure element is mounted
      const calculatePosition = () => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          elementsRef.current.set(id, {
            ref,
            top: rect.top + window.scrollY,
            height: rect.height,
          });
        }
      };

      // Use RAF to ensure DOM is ready
      requestAnimationFrame(calculatePosition);

      // Also recalculate after images/fonts might have loaded
      const timeoutId = setTimeout(calculatePosition, 500);

      // Return cleanup function
      return () => {
        elementsRef.current.delete(id);
        clearTimeout(timeoutId);
      };
    },
    [],
  );

  // Get the scroll progress for a specific element (0 = entering viewport, 1 = leaving viewport)
  const getElementProgress = useCallback(
    (id: string): number => {
      if (prefersReducedMotion) return 0.5; // No parallax effect

      const entry = elementsRef.current.get(id);
      if (!entry || viewportHeight === 0) return 0.5;

      const currentScrollY = scrollY.get();

      // Calculate when element enters and leaves viewport
      // Element enters when its top reaches bottom of viewport
      // Element leaves when its bottom reaches top of viewport
      const elementTop = entry.top;
      const elementHeight = entry.height;

      const startScroll = elementTop - viewportHeight; // Element starts entering
      const endScroll = elementTop + elementHeight; // Element finishes leaving

      const totalDistance = endScroll - startScroll;
      if (totalDistance === 0) return 0.5;

      const progress = (currentScrollY - startScroll) / totalDistance;

      // Clamp between 0 and 1
      return Math.max(0, Math.min(1, progress));
    },
    [scrollY, viewportHeight, prefersReducedMotion],
  );

  return (
    <ScrollContext.Provider
      value={{
        scrollY,
        viewportHeight,
        registerElement,
        getElementProgress,
      }}
    >
      {children}
    </ScrollContext.Provider>
  );
}

/**
 * Hook to access the scroll context
 */
export function useScrollContext() {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error("useScrollContext must be used within a ScrollProvider");
  }
  return context;
}

/**
 * Hook to check if ScrollProvider is available
 * Returns null if not within a ScrollProvider (useful for fallback behavior)
 */
export function useOptionalScrollContext() {
  return useContext(ScrollContext);
}
