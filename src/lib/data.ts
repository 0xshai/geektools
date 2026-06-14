import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { slugify } from './utils';
import type { Category, ToolItem, RetiredTool, SiteStats, ChangelogEntry } from '@/types';

const yamlPath = path.join(process.cwd(), 'data', 'bookmarks.yaml');
const changelogPath = path.join(process.cwd(), 'data', 'changelog.yaml');

export function getCategories(): Category[] {
  const raw = fs.readFileSync(yamlPath, 'utf-8');
  const data = yaml.load(raw) as Category[] | { categories: Category[]; last_updated?: string };
  if (Array.isArray(data)) return data;
  return data.categories || [];
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

export function getDailyPick(): (ToolItem & { category: string; categoryIcon: string; slug: string }) | null {
  const topTools = getTopTools();
  if (topTools.length === 0) return null;
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
  return topTools[dayOfYear % topTools.length];
}

export function getRecentTools(count: number = 5): (ToolItem & { category: string; categoryIcon: string; slug: string })[] {
  const all = getAllTools();
  return all.slice(-count).reverse();
}

export function getRetiredTools(): RetiredTool[] {
  return [
    {
      name: 'Chrome',
      reason: ['隐私问题严重', 'Google 数据收集过度'],
      replaced_by: 'Brave',
    },
    {
      name: 'Evernote',
      reason: ['商业化严重', '免费功能大幅缩水'],
      replaced_by: 'Obsidian',
    },
    {
      name: 'Notion',
      reason: ['数据存储在云端', '隐私无法保障', '国内访问不稳定'],
      replaced_by: 'Notesnook',
    },
    {
      name: 'IDM',
      reason: ['闭源付费', '仅支持 Windows'],
      replaced_by: 'AB Download',
    },
    {
      name: 'Google Photos',
      reason: ['隐私担忧', '免费额度缩减'],
      replaced_by: 'Ente',
    },
    {
      name: 'LastPass',
      reason: ['多次安全事件', '免费版功能大幅缩减'],
      replaced_by: 'Bitwarden',
    },
    {
      name: 'Dropbox',
      reason: ['端对端加密需付费', '隐私政策不佳'],
      replaced_by: 'Syncthing',
    },
    {
      name: 'VS Code',
      reason: ['微软遥测收集', '启动慢内存占用高'],
      replaced_by: 'Zed',
    },
    {
      name: 'Google Authenticator',
      reason: ['无加密备份', '换手机迁移困难'],
      replaced_by: 'Aegis',
    },
    {
      name: 'CCleaner',
      reason: ['曾植入恶意软件', '闭源不透明'],
      replaced_by: 'WindowsCleaner',
    },
  ];
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
