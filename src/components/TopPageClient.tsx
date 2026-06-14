'use client';

import React, { useState } from 'react';
import { Typewriter, Title } from 'animal-island-ui';
import AppLayout from '@/components/AppLayout';
import ToolCard from '@/components/ToolCard';
import type { Category, ToolItem } from '@/types';

export default function TopPageClient({
  categories,
  topTools,
  recentTools,
}: {
  categories: Category[];
  topTools: (ToolItem & { category: string; categoryIcon: string; slug: string })[];
  recentTools: (ToolItem & { category: string; categoryIcon: string; slug: string })[];
}) {
  const [typewriterKey] = useState(0);
  const [expandedTool, setExpandedTool] = useState<string | null>(null);

  const handleToggleTool = (toolName: string) => {
    setExpandedTool((prev) => (prev === toolName ? null : toolName));
  };

  return (
    <AppLayout
      categories={categories}
      topTools={topTools}
      recentTools={recentTools}
    >
      <Title size="large" color="app-yellow">
        ⭐ 推荐榜 · {topTools.length} 个精选工具
      </Title>

      {/* Description with typewriter */}
      <div className="category-desc-wrapper">
        <Typewriter key={typewriterKey} speed={50}>
          <span className="category-desc">评级 S+ 和 S 的工具，每个分类只保留最好的</span>
        </Typewriter>
      </div>

      {/* Tool list with accordion */}
      <div style={{ marginTop: 16 }}>
        {topTools.map((tool) => (
          <ToolCard
            key={tool.name}
            tool={tool}
            expanded={expandedTool === tool.name}
            onToggle={() => handleToggleTool(tool.name)}
          />
        ))}
      </div>

      <div className="site-footer">
        <p>极客工具站 — 不收录最多，只收录最好</p>
      </div>
    </AppLayout>
  );
}
