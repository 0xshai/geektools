'use client';

import React from 'react';
import Sidebar from './Sidebar';
import RightSidebar from './RightSidebar';
import type { Category, ToolItem } from '@/types';

interface AppLayoutProps {
  children: React.ReactNode;
  categories: Category[];
  activeCategory?: string | null;
  onCategoryClick?: (category: string) => void;
  topTools: (ToolItem & { category: string; categoryIcon: string; slug: string })[];
  recentTools: (ToolItem & { category: string; categoryIcon: string; slug: string })[];
}

export default function AppLayout({ children, categories, activeCategory, onCategoryClick, topTools, recentTools }: AppLayoutProps) {
  return (
    <div className="app-layout">
      <Sidebar categories={categories} activeCategory={activeCategory} onCategoryClick={onCategoryClick} />
      <main className="main-content">
        {children}
      </main>
      <RightSidebar topTools={topTools} recentTools={recentTools} />
      <img src="/img/guide-bg-line.webp" alt="" loading="lazy" decoding="async" className="guide-bg-line" />
    </div>
  );
}
