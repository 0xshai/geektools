import { getCategories, getTopTools, getRecentTools, getChangelog } from '@/lib/data';
import ChangelogPageClient from '@/components/ChangelogPageClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '更新日志 - 极客工具站',
  description: '极客工具站更新日志，查看每个版本的变更记录。',
};

export default function ChangelogPage() {
  const categories = getCategories();
  const topTools = getTopTools();
  const recentTools = getRecentTools();
  const changelog = getChangelog();
  return <ChangelogPageClient categories={categories} topTools={topTools} recentTools={recentTools} changelog={changelog} />;
}
