import { getCategories, getTopTools, getRecentTools } from '@/lib/data';
import AboutPageClient from '@/components/AboutPageClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '关于 - 极客工具站',
  description: '了解极客工具站的推荐标准、淘汰标准和更新原则。',
};

export default function AboutPage() {
  const categories = getCategories();
  const topTools = getTopTools();
  const recentTools = getRecentTools();
  return <AboutPageClient categories={categories} topTools={topTools} recentTools={recentTools} />;
}
