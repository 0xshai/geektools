export interface Author {
  name: string;
  background: string;
}

export interface ToolItem {
  name: string;
  url: string;
  github?: string;
  desc: string;
  opensource?: boolean;
  license?: string;
  country?: string;
  platform?: string[];
  first_release?: string;
  added_date?: string;
  rating?: string;
  author?: Author;
  privacy?: number;
  usability?: number;
  china_access?: number;
  maintenance?: number;
  advantages?: string[];
  disadvantages?: string[];
  solves?: string[];
  install?: Record<string, string>;
  tips?: string[];
  alternatives?: string[];
  tags?: string[];
  blog_url?: string;
}

export interface Category {
  category: string;
  icon: string;
  desc?: string;
  color?: string;
  items: ToolItem[];
}

export interface RetiredTool {
  name: string;
  reason: string[];
  replaced_by: string;
}

export interface SiteStats {
  totalTools: number;
  openSourceTools: number;
  commercialTools: number;
  retiredTools: number;
  lastUpdated: string;
  categories: Category[];
  retired: RetiredTool[];
}

export interface ChangelogEntry {
  version: string;
  date: string;
  changes: string[];
}
