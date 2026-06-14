import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { cache } from 'react';
import { unstable_cache } from 'next/cache';
import { slugify } from './utils';
import type { Category, ToolItem, RetiredTool, SiteStats, ChangelogEntry } from '@/types';

const yamlPath = path.join(process.cwd(), 'data', 'bookmarks.yaml');
const retiredPath = path.join(process.cwd(), 'data', 'retired.yaml');
const changelogPath = path.join(process.cwd(), 'data', 'changelog.yaml');

// Cached YAML reader to avoid repeated file reads
const getCategoriesCached = cache((): Category[] => {
  const raw = fs.readFileSync(yamlPath, 'utf-8');
  const data = yaml.load(raw) as Category[] | { categories: Category[]; last_updated?: string };
  if (Array.isArray(data)) return data;
  return data.categories || [];
});

export function getCategories(): Category[] {
  return getCategoriesCached();
}

export function getLastUpdated(): string {
  const raw = fs.readFileSync(yamlPath, 'utf-8');
  const data = yaml.load(raw) as Category[] | { categories: Category[]; last_updated?: string };
  if (Array.isArray(data)) return '2026-06-13';
  return data.last_updated || '2026-06-13';
}

export function getAllTools(): (ToolItem & { category: string; categoryIcon: string; slug: string })[] {
  const categories = getCategories();
  const tools: (ToolItem & { category: string; categoryIcon: string; slug: string })[] = [];
  for (const cat of categories) {
    for (const item of cat.items) {
      tools.push({
        ...item,
        category: cat.category,
        categoryIcon: cat.icon,
        slug: slugify(item.name),
      });
    }
  }
  return tools;
}

export function getToolBySlug(slug: string): (ToolItem & { category: string; categoryIcon: string; slug: string }) | undefined {
  return getAllTools().find((t) => t.slug === slug);
}

export function getToolsByCategory(categoryName: string): (ToolItem & { slug: string })[] {
  const categories = getCategories();
  const cat = categories.find((c) => c.category === categoryName);
  if (!cat) return [];
  return cat.items.map((item) => ({ ...item, slug: slugify(item.name) }));
}

export function getTopTools(): (ToolItem & { category: string; categoryIcon: string; slug: string })[] {
  return getAllTools().filter((t) => t.rating === 'S+' || t.rating === 'S');
}

// Daily pick with unstable_cache for build-time stability
export const getDailyPick = unstable_cache(
  async (): Promise<(ToolItem & { category: string; categoryIcon: string; slug: string }) | null> => {
    const topTools = getTopTools();
    if (topTools.length === 0) return null;
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
    return topTools[dayOfYear % topTools.length];
  },
  ['daily-pick'],
  { revalidate: 86400 } // Cache for 24 hours
);

// Sort by added_date descending, fallback to keeping original order for items without date
export function getRecentTools(count: number = 5): (ToolItem & { category: string; categoryIcon: string; slug: string })[] {
  const all = getAllTools();
  const sorted = [...all].sort((a, b) => {
    if (a.added_date && b.added_date) {
      return new Date(b.added_date).getTime() - new Date(a.added_date).getTime();
    }
    if (a.added_date) return -1;
    if (b.added_date) return 1;
    return 0;
  });
  return sorted.slice(0, count);
}

export function getRetiredTools(): RetiredTool[] {
  try {
    const raw = fs.readFileSync(retiredPath, 'utf-8');
    return yaml.load(raw) as RetiredTool[];
  } catch {
    return [];
  }
}

export function getSiteStats(): SiteStats {
  const categories = getCategories();
  const allTools = getAllTools();
  const retired = getRetiredTools();

  return {
    totalTools: allTools.length,
    openSourceTools: allTools.filter((t) => t.opensource).length,
    commercialTools: allTools.filter((t) => !t.opensource).length,
    retiredTools: retired.length,
    lastUpdated: getLastUpdated(),
    categories,
    retired,
  };
}

export function getChangelog(): ChangelogEntry[] {
  const raw = fs.readFileSync(changelogPath, 'utf-8');
  return yaml.load(raw) as ChangelogEntry[];
}
