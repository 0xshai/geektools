'use client';

import React, { useState } from 'react';
import { Card, Divider, Typewriter, Title } from 'animal-island-ui';
import AppLayout from '@/components/AppLayout';
import type { Category, ToolItem } from '@/types';

export default function AboutPageClient({
  categories,
  topTools,
  recentTools,
}: {
  categories: Category[];
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
      <Title size="large" color="app-teal">
        📖 关于 · 极客工具站的初心与标准
      </Title>

      {/* Description with typewriter */}
      <div className="category-desc-wrapper">
        <Typewriter key={typewriterKey} speed={50}>
          <span className="category-desc">不是导航站，而是精选工具百科。只收录真正值得长期使用的软件。</span>
        </Typewriter>
      </div>

      <div style={{ marginTop: 24 }}>
        <div className="section-box">
          <div className="section-title">为什么做极客工具站</div>
          <p style={{ fontSize: 14, color: '#725d42', lineHeight: 1.8 }}>
            极客工具站不是导航站。而是精选工具百科 + 极客工具推荐库。
            市面上的软件导航站收录了大量工具，用户反而陷入选择恐惧症。
            极客工具站只收录真正值得长期使用的软件，同类产品最多保留 3 个，首选推荐仅保留 1 个。
          </p>
        </div>

        <div className="section-box">
          <div className="section-title">推荐标准</div>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {['开源优先 — 源码可审计，无后门风险', '隐私优先 — 不收集用户数据，端对端加密', '长期维护 — 活跃开发，社区健康', '跨平台 — 支持 Windows / macOS / Linux', '简单可靠 — 界面简洁，功能专注'].map((item) => (
              <li key={item} style={{ padding: '4px 0', fontSize: 14, color: '#725d42', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ color: '#6fba2c', fontWeight: 700 }}>✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="section-box">
          <div className="section-title">淘汰标准</div>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {['出现更好的开源替代品', '隐私政策严重恶化', '商业化过度，免费功能大幅缩水', '项目长期停止维护', '安全漏洞长期不修复'].map((item) => (
              <li key={item} style={{ padding: '4px 0', fontSize: 14, color: '#725d42', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ color: '#e05a5a', fontWeight: 700 }}>✗</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="section-box">
          <div className="section-title">推荐等级说明</div>
          <div className="info-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
            <div className="info-item">
              <span className="badge badge-rating-s-plus">S+</span>
              <span className="value">行业最佳</span>
            </div>
            <div className="info-item">
              <span className="badge badge-rating">S</span>
              <span className="value">非常推荐</span>
            </div>
            <div className="info-item">
              <span className="badge badge-rating">A</span>
              <span className="value">推荐</span>
            </div>
            <div className="info-item">
              <span className="badge badge-rating">B</span>
              <span className="value">可选</span>
            </div>
          </div>
        </div>

        <div className="section-box">
          <div className="section-title">技术栈</div>
          <div className="info-grid">
            <div className="info-item">
              <span className="label">框架:</span>
              <span className="value">Next.js</span>
            </div>
            <div className="info-item">
              <span className="label">UI:</span>
              <span className="value">animal-island-ui</span>
            </div>
            <div className="info-item">
              <span className="label">数据:</span>
              <span className="value">YAML 驱动</span>
            </div>
            <div className="info-item">
              <span className="label">搜索:</span>
              <span className="value">Fuse.js</span>
            </div>
          </div>
        </div>
      </div>

      <div className="site-footer">
        <div>极客工具站 — 不收录最多，只收录最好</div>
      </div>
    </AppLayout>
  );
}
