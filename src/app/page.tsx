import { getCategories, getAllTools, getLastUpdated, getDailyPick, getTopTools, getRecentTools } from '@/lib/data';
import HomePage from '@/components/HomePage';

export default async function Page() {
  const categories = getCategories();
  const allTools = getAllTools();
  const lastUpdated = getLastUpdated();
  const dailyPick = await getDailyPick();
  const topTools = getTopTools();
  const recentTools = getRecentTools();
  return <HomePage categories={categories} allTools={allTools} lastUpdated={lastUpdated} dailyPick={dailyPick} topTools={topTools} recentTools={recentTools} />;
}
