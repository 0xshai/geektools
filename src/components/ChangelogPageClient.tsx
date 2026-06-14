'use client';

import React from 'react';
import { Title, Divider, Card } from 'animal-island-ui';
import AppLayout from '@/components/AppLayout';
import type { Category, ToolItem, ChangelogEntry } from '@/types';

export default function ChangelogPageClient({
  categories,
  topTools,
  recentTools,
  changelog,
}: {
  categories: Category[];
  topTools: (ToolItem & { category: string; categoryIcon: string; slug: string })[];
  recentTools: (ToolItem & { category: string; categoryIcon: string; slug: string })[];
  changelog: ChangelogEntry[];
}) {
  return (
    <AppLayout
      categories={categories}
      topTools={topTools}
      recentTools={recentTools}
    >
      <Title color="app-yellow" size="large">更新日志</Title>
      <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 24 }}>
        极客工具站的版本更新记录。
      </p>

      <Divider type="line-teal" />

      <div className="changelog-timeline">
        {changelog.map((entry, index) => (
          <React.Fragment key={entry.version}>
            <div className="changelog-entry">
              <div className="changelog-dot" />
              <Card
                color={index === 0 ? 'app-yellow' : 'default'}
                pattern="none"
                style={{ padding: 20 }}
              >
                <div className="changelog-header">
                  <span className="changelog-version">v{entry.version}</span>
                  <span className="changelog-date">{entry.date}</span>
                </div>
                <ul className="changelog-list">
                  {entry.changes.map((change, i) => (
                    <li key={i} className="changelog-item">
                      {change}
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
            {index < changelog.length - 1 && <Divider type="dashed-brown" />}
          </React.Fragment>
        ))}
      </div>

      <div className="site-footer">
        <p>极客工具站 — 不收录最多，只收录最好</p>
      </div>

      <style jsx>{`
        .changelog-timeline {
          margin-top: 16px;
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .changelog-entry {
          position: relative;
          padding-left: 24px;
        }
        .changelog-dot {
          position: absolute;
          left: 0;
          top: 24px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: var(--color-app-teal, #2dd4bf);
          border: 2px solid var(--color-app-yellow, #f59e0b);
          z-index: 1;
        }
        .changelog-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }
        .changelog-version {
          font-size: 18px;
          font-weight: 700;
          color: var(--text-primary);
        }
        .changelog-date {
          font-size: 13px;
          color: var(--text-secondary);
          background: rgba(0, 0, 0, 0.05);
          padding: 2px 8px;
          border-radius: 4px;
        }
        .changelog-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .changelog-item {
          font-size: 14px;
          color: var(--text-primary);
          padding-left: 16px;
          position: relative;
          line-height: 1.6;
        }
        .changelog-item::before {
          content: '+';
          position: absolute;
          left: 0;
          color: var(--color-app-teal, #2dd4bf);
          font-weight: 700;
        }
      `}</style>
    </AppLayout>
  );
}
