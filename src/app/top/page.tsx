import { getTopTools, getCategories, getRecentTools } from '@/lib/data';
import TopPageClient from '@/components/TopPageClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '编辑推荐 TOP - 极客工具站',
  description: '极客工具站编辑精选推荐，S+ 和 S 级别的最佳工具。',
};

export default function TopPage() {
  const topTools = getTopTools();
  const categories = getCategories();
  const recentTools = getRecentTools();
  return <TopPageClient categories={categories} topTools={topTools} recentTools={recentTools} />;
}
