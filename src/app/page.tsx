import ClientHomePage from "../components/ClientHomePage";
import { getPortfolioData } from "../lib/local-data";

export default function HomePage() {
  const data = getPortfolioData();
  return <ClientHomePage data={data} />;
}
