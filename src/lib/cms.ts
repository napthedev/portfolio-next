import { allDataType } from "../shared/types";
import { CACHE_TAGS, REVALIDATION_INTERVALS } from "./cache";

const CMS_ENDPOINT =
  "https://api-ap-northeast-1.graphcms.com/v2/cl1ylp3cg1ase01xucbgc346j/master";

const PORTFOLIO_QUERY = `
  query {
    skills(stage: PUBLISHED) {
      image
      title
      link
    }
    projects(stage: PUBLISHED) {
      id
      title
      description
      demo
      github
      technologies
      image {
        url(
          transformation: {
            document: { output: { format: webp } }
            image: { resize: { width: 700 } }
            validateOptions: true
          }
        )
      }
    }
    smallProjects(stage: PUBLISHED) {
      id
      title
      description
      link
      icon {
        url(
          transformation: {
            document: { output: { format: webp } }
            image: { resize: { height: 40 } }
            validateOptions: true
          }
        )
      }
    }
  }
`;

interface GraphQLResponse {
  data: allDataType;
  errors?: Array<{ message: string }>;
}

export async function fetchPortfolioData(): Promise<allDataType> {
  try {
    const response = await fetch(CMS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: PORTFOLIO_QUERY,
      }),
      // ISR configuration
      next: {
        revalidate: REVALIDATION_INTERVALS.MEDIUM, // Revalidate every 60 seconds
        tags: [CACHE_TAGS.PORTFOLIO_DATA], // Cache tag for on-demand revalidation
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: GraphQLResponse = await response.json();

    if (result.errors && result.errors.length > 0) {
      throw new Error(`GraphQL error: ${result.errors[0].message}`);
    }

    if (!result.data) {
      throw new Error("No data received from CMS");
    }

    return result.data;
  } catch (error) {
    console.error("Error fetching portfolio data:", error);
    throw new Error("Failed to fetch portfolio data from CMS");
  }
}

// Function for on-demand revalidation (can be used in API routes)
export async function revalidatePortfolioData() {
  try {
    // This would typically be called from an API route or webhook
    const response = await fetch("/api/revalidate?tag=portfolio-data", {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error("Failed to revalidate");
    }

    return { success: true };
  } catch (error) {
    console.error("Error revalidating portfolio data:", error);
    return { success: false, error };
  }
}
