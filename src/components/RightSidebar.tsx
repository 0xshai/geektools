'use client';

import React from 'react';
import Link from 'next/link';
import { Card, Title, Divider } from 'animal-island-ui';
import type { ToolItem } from '@/types';

interface RightSidebarProps {
  topTools: (ToolItem & { category: string; categoryIcon: string; slug: string })[];
  recentTools: (ToolItem & { category: string; categoryIcon: string; slug: string })[];
}

export default function RightSidebar({ topTools, recentTools }: RightSidebarProps) {
  // Daily pick: use a deterministic pick based on day of year
  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000
  );
  const dailyPick = topTools.length > 0 ? topTools[dayOfYear % topTools.length] : null;

  // TOP10: take first 10 from topTools
  const top10 = topTools.slice(0, 10);

  return (
    <aside className="right-sidebar">
      {/* Daily Pick */}
      {dailyPick && (
        <div className="rs-section">
          <div className="rs-section-title">🔥 今日推荐</div>
          <Link href={`/tool/${dailyPick.slug}`} style={{ textDecoration: 'none' }}>
            <div className="rs-daily-card">
              <div className="rs-daily-name">
                {dailyPick.categoryIcon} {dailyPick.name}
              </div>
              <div className="rs-daily-desc">{dailyPick.desc}</div>
              <div className="rs-daily-meta">
                <span className={`rs-tool-badge ${dailyPick.rating === 'S+' ? 's-plus' : ''}`}>
                  {dailyPick.rating}
                </span>
                <span>{dailyPick.category}</span>
              </div>
            </div>
          </Link>
        </div>
      )}

      <Divider type="dashed-brown" />

      {/* TOP10 */}
      {top10.length > 0 && (
        <div className="rs-section">
          <div className="rs-section-title">🏆 TOP10</div>
          {top10.map((tool, index) => (
            <Link key={tool.slug} href={`/tool/${tool.slug}`} style={{ textDecoration: 'none' }}>
              <div className="rs-tool-item">
                <span className={`rs-tool-rank ${index < 3 ? 'top-3' : ''}`}>
                  {index + 1}
                </span>
                <span className="rs-tool-name">{tool.name}</span>
                <span className={`rs-tool-badge ${tool.rating === 'S+' ? 's-plus' : ''}`}>
                  {tool.rating}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}

      <Divider type="dashed-brown" />

      {/* Recent Tools */}
      {recentTools.length > 0 && (
        <div className="rs-section">
          <div className="rs-section-title">🆕 最近收录</div>
          {recentTools.map((tool) => (
            <Link key={tool.slug} href={`/tool/${tool.slug}`} style={{ textDecoration: 'none' }}>
              <div className="rs-tool-item">
                <span className="rs-tool-name">{tool.categoryIcon} {tool.name}</span>
                {tool.rating && (
                  <span className={`rs-tool-badge ${tool.rating === 'S+' ? 's-plus' : ''}`}>
                    {tool.rating}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}

      <Divider type="dashed-brown" />

      {/* Changelog */}
      <div className="rs-section">
        <div className="rs-section-title">📢 更新日志</div>
        <p style={{ fontSize: 12, color: '#a0936e', marginBottom: 8, lineHeight: 1.6 }}>
          持续收录优质工具，淘汰落后产品。
        </p>
        <Link href="/changelog" className="rs-changelog-link">
          查看完整更新日志 →
        </Link>
      </div>
    </aside>
  );
}
