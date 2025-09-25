/**
 * Cache management utilities for ISR
 */

export const CACHE_TAGS = {
  PORTFOLIO_DATA: "portfolio-data",
  SKILLS: "skills",
  PROJECTS: "projects",
  SMALL_PROJECTS: "small-projects",
} as const;

export const REVALIDATION_INTERVALS = {
  SHORT: 30, // 30 seconds - for frequently updated content
  MEDIUM: 60, // 1 minute - default for portfolio content
  LONG: 300, // 5 minutes - for rarely updated content
  VERY_LONG: 3600, // 1 hour - for very stable content
} as const;

/**
 * Helper function to trigger revalidation via API
 * Useful for manual cache invalidation during development or testing
 */
export async function triggerRevalidation(
  tag: string,
  baseUrl?: string
): Promise<boolean> {
  try {
    const url = baseUrl || "";
    const response = await fetch(`${url}/api/revalidate?tag=${tag}`, {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Revalidation result:", result);
    return result.revalidated;
  } catch (error) {
    console.error("Error triggering revalidation:", error);
    return false;
  }
}

/**
 * Get cache configuration for different content types
 */
export function getCacheConfig(contentType: keyof typeof CACHE_TAGS) {
  const configs = {
    PORTFOLIO_DATA: {
      revalidate: REVALIDATION_INTERVALS.MEDIUM,
      tags: [CACHE_TAGS.PORTFOLIO_DATA],
    },
    SKILLS: {
      revalidate: REVALIDATION_INTERVALS.LONG,
      tags: [CACHE_TAGS.SKILLS, CACHE_TAGS.PORTFOLIO_DATA],
    },
    PROJECTS: {
      revalidate: REVALIDATION_INTERVALS.MEDIUM,
      tags: [CACHE_TAGS.PROJECTS, CACHE_TAGS.PORTFOLIO_DATA],
    },
    SMALL_PROJECTS: {
      revalidate: REVALIDATION_INTERVALS.MEDIUM,
      tags: [CACHE_TAGS.SMALL_PROJECTS, CACHE_TAGS.PORTFOLIO_DATA],
    },
  };

  return configs[contentType];
}
