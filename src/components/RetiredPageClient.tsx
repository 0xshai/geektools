'use client';

import React, { useState } from 'react';
import { Typewriter, Title } from 'animal-island-ui';
import AppLayout from '@/components/AppLayout';
import type { Category, RetiredTool, ToolItem } from '@/types';

export default function RetiredPageClient({
  categories,
  retiredTools,
  topTools,
  recentTools,
}: {
  categories: Category[];
  retiredTools: RetiredTool[];
  topTools: (ToolItem & { category: string; categoryIcon: string; slug: string })[];
  recentTools: (ToolItem & { category: string; categoryIcon: string; slug: string })[];
}) {
  const [typewriterKey] = useState(0);

  return (
    <AppLayout
      categories={categories}
      topTools={topTools}
      recentTools={recentTools}
    >
      <Title size="large" color="app-red">
        🗑️ 淘汰库 · {retiredTools.length} 个已淘汰
      </Title>

      {/* Description with typewriter */}
      <div className="category-desc-wrapper">
        <Typewriter key={typewriterKey} speed={50}>
          <span className="category-desc">曾经推荐但已被更好替代的工具。不收录最多，只收录最好。</span>
        </Typewriter>
      </div>

      {/* Retired tool list */}
      <div style={{ marginTop: 16 }}>
        {retiredTools.map((tool) => (
          <div key={tool.name} className="section-box" style={{ marginBottom: 12, padding: '16px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <span style={{ fontSize: 18, fontWeight: 800, color: '#725d42' }}>{tool.name}</span>
              <span style={{ fontSize: 12, padding: '2px 8px', borderRadius: 4, background: '#f87171', color: '#fff', fontWeight: 600 }}>已淘汰</span>
            </div>
            <div style={{ fontSize: 13, color: '#8a7b66', lineHeight: 1.6, marginBottom: 8 }}>
              <strong>替代:</strong> {tool.replaced_by}
            </div>
            {tool.reason && tool.reason.length > 0 && (
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {tool.reason.map((r, i) => (
                  <li key={i} style={{ fontSize: 13, color: '#a0936e', padding: '2px 0', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ color: '#f87171' }}>•</span> {r}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      <div className="site-footer">
        <p>极客工具站 — 不收录最多，只收录最好</p>
      </div>
    </AppLayout>
  );
}
