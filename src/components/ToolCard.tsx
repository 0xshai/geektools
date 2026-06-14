'use client';

import React, { useState } from 'react';
import { Card, Button, Tabs, CodeBlock, Icon } from 'animal-island-ui';
import type { ToolItem } from '@/types';

function StarRating({ value, max = 5 }: { value: number; max?: number }) {
  return (
    <span className="star-rating">
      {Array.from({ length: max }, (_, i) => (
        <span key={i} className={`star ${i < value ? '' : 'empty'}`}>
          ★
        </span>
      ))}
    </span>
  );
}

function RatingBadge({ rating }: { rating?: string }) {
  if (!rating) return null;
  const isSPlus = rating === 'S+';
  return (
    <span className={isSPlus ? 'badge badge-rating-s-plus' : 'badge badge-rating'}>
      {rating}
    </span>
  );
}

function OpenSourceBadge({ opensource }: { opensource?: boolean }) {
  if (opensource === undefined) return null;
  return (
    <span className={opensource ? 'badge badge-opensource' : 'badge badge-commercial'}>
      {opensource ? '开源' : '商业'}
    </span>
  );
}

interface ToolCardProps {
  tool: ToolItem & { category: string; categoryIcon: string; slug: string };
  expanded: boolean;
  onToggle: () => void;
}

export default function ToolCard({ tool, expanded, onToggle }: ToolCardProps) {
  // Overview tab content
  const overviewContent = (
    <div className="tool-detail-inner">
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
        <div className="info-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))' }}>
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
              <Button key={alt} type="default" size="small">{alt}</Button>
            ))}
          </div>
        </div>
      ) : (
        <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>暂无替代品信息</p>
      )}
    </div>
  );

  const tabItems = [
    { key: 'overview', label: '概览', children: overviewContent },
    { key: 'ratings', label: '评分', children: ratingsTab },
    { key: 'install', label: '安装', children: installTab },
    { key: 'alternatives', label: '替代品', children: alternativesTab },
  ];

  return (
    <div className={`tool-card ${expanded ? 'tool-card-expanded' : ''}`}>
      <Card pattern="default" onClick={!expanded ? onToggle : undefined}>
        <div className="tool-card-header">
          <div className="tool-card-left">
            <span className="tool-card-name">{tool.name}</span>
            <span className="tool-card-desc">{tool.desc}</span>
          </div>
          <div className="tool-card-badges">
            <RatingBadge rating={tool.rating} />
            <OpenSourceBadge opensource={tool.opensource} />
            <button
              className="expand-toggle"
              onClick={(e) => { e.stopPropagation(); onToggle(); }}
              aria-label={expanded ? '收起' : '展开'}
            >
              <span className={`expand-icon ${expanded ? 'rotated' : ''}`}>
                <Icon item={490} size={20} />
              </span>
            </button>
          </div>
        </div>

        {/* Expanded details */}
        {expanded && (
          <div className="tool-card-details" onClick={(e) => e.stopPropagation()}>
            {/* Quick info */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 16, fontSize: 12 }}>
              {tool.category && (
                <span style={{ color: '#a0936e', fontWeight: 600 }}>
                  {tool.categoryIcon} {tool.category}
                </span>
              )}
              {tool.platform && (
                <span style={{ color: '#a0936e', fontWeight: 600 }}>
                  平台: {tool.platform.join(' / ')}
                </span>
              )}
              {tool.license && (
                <span style={{ color: '#a0936e', fontWeight: 600 }}>
                  许可: {tool.license}
                </span>
              )}
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
              <a href={tool.url} target="_blank" rel="noopener noreferrer">
                <Button type="primary" size="small">官网</Button>
              </a>
              {tool.github && (
                <a href={tool.github} target="_blank" rel="noopener noreferrer">
                  <Button type="default" size="small">GitHub</Button>
                </a>
              )}
            </div>

            {/* Tabs */}
            <Tabs items={tabItems} defaultActiveKey="overview" />
          </div>
        )}
      </Card>
    </div>
  );
}
