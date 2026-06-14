'use client';

import React from 'react';
import { Title, Button, Tabs, CodeBlock, Card, Divider, Cursor } from 'animal-island-ui';
import Sidebar from '@/components/Sidebar';
import type { ToolItem, Category } from '@/types';

function StarRating({ value, max = 5 }: { value: number; max?: number }) {
  return (
    <span className="star-rating">
      {Array.from({ length: max }, (_, i) => (
        <span key={i} className={`star ${i < value ? '' : 'empty'}`}>★</span>
      ))}
    </span>
  );
}

import { slugify } from '@/lib/utils';

interface ToolDetailPageProps {
  tool: ToolItem & { category: string; categoryIcon: string; slug: string };
  categories: Category[];
}

export default function ToolDetailPage({ tool, categories }: ToolDetailPageProps) {
  const ratingBadgeClass = tool.rating === 'S+' ? 'badge badge-rating-s-plus' : 'badge badge-rating';

  const overviewTab = (
    <div className="tool-detail-inner">
      <div className="detail-section">
        <div className="detail-section-title">📋 基础信息</div>
        <div className="info-grid">
          {tool.platform && (
            <div className="info-item">
              <span className="label">平台:</span>
              <span className="value">{tool.platform.join(', ')}</span>
            </div>
          )}
          {tool.license && (
            <div className="info-item">
              <span className="label">许可证:</span>
              <span className="value">{tool.license}</span>
            </div>
          )}
          {tool.country && (
            <div className="info-item">
              <span className="label">国家:</span>
              <span className="value">{tool.country}</span>
            </div>
          )}
          {tool.first_release && (
            <div className="info-item">
              <span className="label">首发:</span>
              <span className="value">{tool.first_release}</span>
            </div>
          )}
          <div className="info-item">
            <span className="label">分类:</span>
            <span className="value">{tool.categoryIcon} {tool.category}</span>
          </div>
        </div>
      </div>

      {tool.author && (
        <div className="detail-section">
          <div className="detail-section-title">👤 作者背景</div>
          <Card pattern="app-pink" style={{ padding: '12px 16px' }}>
            <div style={{ fontWeight: 700, color: '#a85565', fontSize: 14 }}>{tool.author.name}</div>
            <div style={{ fontSize: 13, color: '#a85565', marginTop: 4, opacity: 0.85 }}>
              {tool.author.background}
            </div>
          </Card>
        </div>
      )}

      {tool.advantages && tool.advantages.length > 0 && (
        <div className="detail-section">
          <div className="detail-section-title">✅ 推荐理由</div>
          <ul className="detail-list">
            {tool.advantages.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </div>
      )}

      {tool.disadvantages && tool.disadvantages.length > 0 && (
        <div className="detail-section">
          <div className="detail-section-title">❌ 缺点</div>
          <ul className="detail-list">
            {tool.disadvantages.map((d, i) => (
              <li key={i} className="negative">{d}</li>
            ))}
          </ul>
        </div>
      )}

      {tool.solves && tool.solves.length > 0 && (
        <div className="detail-section">
          <div className="detail-section-title">🎯 解决什么问题</div>
          <ul className="detail-list">
            {tool.solves.map((s, i) => (
              <li key={i} className="solve">{s}</li>
            ))}
          </ul>
        </div>
      )}

      {tool.tags && tool.tags.length > 0 && (
        <div className="detail-section">
          <div className="detail-section-title">🏷️ 标签</div>
          <div className="tag-list">
            {tool.tags.map((tag) => (
              <span key={tag} className="tag">#{tag}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const ratingsTab = (
    <div className="tool-detail-inner">
      <div className="detail-section">
        <div className="detail-section-title">📊 综合评分</div>
        <div className="info-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
          <Card pattern="app-teal" style={{ padding: '12px 16px' }}>
            <div style={{ fontSize: 12, color: '#186048', fontWeight: 600 }}>隐私保护</div>
            <div style={{ marginTop: 4 }}><StarRating value={tool.privacy || 0} /></div>
          </Card>
          <Card pattern="app-blue" style={{ padding: '12px 16px' }}>
            <div style={{ fontSize: 12, color: '#2030a0', fontWeight: 600 }}>易用性</div>
            <div style={{ marginTop: 4 }}><StarRating value={tool.usability || 0} /></div>
          </Card>
          <Card pattern="app-yellow" style={{ padding: '12px 16px' }}>
            <div style={{ fontSize: 12, color: '#8a6010', fontWeight: 600 }}>国内访问</div>
            <div style={{ marginTop: 4 }}><StarRating value={tool.china_access || 0} /></div>
          </Card>
          <Card pattern="app-green" style={{ padding: '12px 16px' }}>
            <div style={{ fontSize: 12, color: '#205020', fontWeight: 600 }}>维护活跃</div>
            <div style={{ marginTop: 4 }}><StarRating value={tool.maintenance || 0} /></div>
          </Card>
        </div>
      </div>
    </div>
  );

  const installTab = (
    <div className="tool-detail-inner">
      {tool.install && Object.keys(tool.install).length > 0 && (
        <div className="detail-section">
          <div className="detail-section-title">📦 安装方法</div>
          <div className="install-section">
            {Object.entries(tool.install).map(([platform, cmd]) => (
              <div key={platform} className="install-platform">
                <div className="install-platform-label">
                  {platform === 'mac' ? '🍎 macOS' : platform === 'windows' ? '🪟 Windows' : platform === 'web' ? '🌐 Web' : `💻 ${platform}`}
                </div>
                <CodeBlock code={cmd.trim()} />
              </div>
            ))}
          </div>
        </div>
      )}

      {tool.tips && tool.tips.length > 0 && (
        <div className="detail-section">
          <div className="detail-section-title">💡 使用建议</div>
          <ul className="detail-list">
            {tool.tips.map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  const alternativesTab = (
    <div className="tool-detail-inner">
      {tool.alternatives && tool.alternatives.length > 0 ? (
        <div className="detail-section">
          <div className="detail-section-title">🔄 替代品</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {tool.alternatives.map((alt) => (
              <a key={alt} href={`/tool/${slugify(alt)}`}>
                <Button type="default" size="small">{alt}</Button>
              </a>
            ))}
          </div>
        </div>
      ) : (
        <p style={{ fontSize: 13, color: '#a0936e' }}>暂无替代品信息</p>
      )}
    </div>
  );

  const tabItems = [
    { key: 'overview', label: '概览', children: overviewTab },
    { key: 'ratings', label: '评分', children: ratingsTab },
    { key: 'install', label: '安装', children: installTab },
    { key: 'alternatives', label: '替代品', children: alternativesTab },
  ];

  return (
    <Cursor>
      <div className="app-layout">
        <Sidebar categories={categories} activeCategory={tool.category} />
        <main className="main-content">
          <Title size="large" color="app-teal" style={{ marginBottom: 30, marginLeft: 18 }}>
            {tool.name}
          </Title>

          <div style={{ marginBottom: 24, marginLeft: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              {tool.rating && <span className={ratingBadgeClass}>{tool.rating}</span>}
              {tool.opensource !== undefined && (
                <span className={tool.opensource ? 'badge badge-opensource' : 'badge badge-commercial'}>
                  {tool.opensource ? '开源' : '商业'}
                </span>
              )}
            </div>
            <p style={{ fontSize: 16, color: '#8a7b66', marginBottom: 16 }}>{tool.desc}</p>
            <div style={{ display: 'flex', gap: 8 }}>
              <a href={tool.url} target="_blank" rel="noopener noreferrer">
                <Button type="primary" size="middle">访问官网</Button>
              </a>
              {tool.github && (
                <a href={tool.github} target="_blank" rel="noopener noreferrer">
                  <Button type="default" size="middle">GitHub</Button>
                </a>
              )}
            </div>
          </div>

          <Divider style={{ width: '100%', margin: '0 auto' }} />

          <div className="section-box" style={{ marginTop: 24 }}>
            <Tabs items={tabItems} defaultActiveKey="overview" />
          </div>

          <div className="site-footer">
            <div>极客工具站 — 不收录最多，只收录最好</div>
          </div>
        </main>

        <img
          src="/img/guide-bg-line.webp"
          alt=""
          loading="lazy"
          decoding="async"
          className="guide-bg-line"
        />
      </div>
    </Cursor>
  );
}
