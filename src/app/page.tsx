import ClientHomePage from "../components/ClientHomePage";
import { fetchPortfolioData } from "../lib/cms";

// This is now a Server Component that will be statically generated
export default async function HomePage() {
  try {
    const data = await fetchPortfolioData();
    return <ClientHomePage data={data} />;
  } catch (error) {
    console.error("Error fetching data:", error);
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-red-500">
          Error: Failed to fetch data. Please try again later.
        </div>
      </div>
    );
  }
}

// Generate static params and enable ISR
export const revalidate = 60; // Revalidate every 60 seconds
