import { getCategories, getTopTools, getRecentTools } from '@/lib/data';
import SubmitPageClient from '@/components/SubmitPageClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '推荐工具 - 极客工具站',
  description: '发现好用的工具？欢迎推荐收录到极客工具站。',
};

export default function SubmitPage() {
  const categories = getCategories();
  const topTools = getTopTools();
  const recentTools = getRecentTools();
  return <SubmitPageClient categories={categories} topTools={topTools} recentTools={recentTools} />;
}
