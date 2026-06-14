import { getRetiredTools, getCategories, getTopTools, getRecentTools } from '@/lib/data';
import RetiredPageClient from '@/components/RetiredPageClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '淘汰库 - 极客工具站',
  description: '曾经推荐但已被更好替代的工具。',
};

export default function RetiredPage() {
  const retired = getRetiredTools();
  const categories = getCategories();
  const topTools = getTopTools();
  const recentTools = getRecentTools();
  return <RetiredPageClient retiredTools={retired} categories={categories} topTools={topTools} recentTools={recentTools} />;
}
