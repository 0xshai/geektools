'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Divider, Card, Time, Typewriter, Title } from 'animal-island-ui';
import AppLayout from '@/components/AppLayout';
import ToolCard from '@/components/ToolCard';
import type { Category, ToolItem } from '@/types';

// Feature cards data
const featureCards = [
  {
    icon: '🎯',
    title: '精挑细选',
    desc: '每个分类只保留最实用的工具，有更好的产品就淘汰旧的',
  },
  {
    icon: '🔒',
    title: '隐私优先',
    desc: '优先推荐开源、本地优先、端到端加密的工具',
  },
  {
    icon: '⚡',
    title: '极客极简',
    desc: '轻量、高效、无广告，让工具回归工具本身',
  },
];

// Category descriptions for typewriter effect
const categoryDescMap: Record<string, string> = {
  '编程工具': '提升开发效率的轻量工具，让代码更优雅',
  '浏览器': '注重隐私与速度的现代化浏览器',
  '图像处理': 'AI 驱动的图像编辑与处理工具',
  '下载工具': '高效稳定的下载管理工具',
  '视频处理': '专业级视频剪辑与后期处理',
  '视频播放': '轻量无广告的本地视频播放器',
  '设计': '开源免费的专业设计工具',
  '系统工具': '让系统更高效的实用工具',
  '翻译工具': '隐私友好的翻译与语言工具',
  '文件同步': '端到端加密的文件同步方案',
  '输入法': '隐私安全的输入法工具',
  '邮箱': '注重隐私的电子邮件服务',
  '密码管理': '安全可靠的密码管理工具',
  '双因素认证': '开源的两步验证工具',
  '办公': '轻量高效的办公工具',
  '笔记': '隐私优先的笔记应用',
  '加密云盘': '端到端加密的云存储方案',
  '效率工具': '提升工作效率的自动化工具',
  '学习工具': '帮助学习编程的互动平台',
  '本地 AI': '本地运行的 AI 工具，数据不离开你的设备',
  'AI 工具': '精选的 AI 辅助工具',
};

// Title color mapping for animal-island-ui Title component
const titleColorMap: Record<string, string> = {
  '编程工具': 'app-red',
  '浏览器': 'app-blue',
  '图像处理': 'app-orange',
  '下载工具': 'app-yellow',
  '视频处理': 'purple',
  '视频播放': 'app-blue',
  '设计': 'app-pink',
  '系统工具': 'app-green',
  '翻译工具': 'app-yellow',
  '文件同步': 'app-teal',
  '输入法': 'lime-green',
  '邮箱': 'app-orange',
  '密码管理': 'purple',
  '双因素认证': 'app-teal',
  '办公': 'app-red',
  '笔记': 'app-blue',
  '加密云盘': 'app-green',
  '效率工具': 'app-yellow',
  '学习工具': 'purple',
  '本地 AI': 'app-teal',
  'AI 工具': 'app-pink',
};

function getTitleColor(category: string): string {
  return titleColorMap[category] || 'default';
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

export default function HomePage({
  categories,
  allTools,
  lastUpdated,
  dailyPick,
  topTools,
  recentTools,
}: {
  categories: Category[];
  allTools: (ToolItem & { category: string; categoryIcon: string; slug: string })[];
  lastUpdated: string;
  dailyPick: (ToolItem & { category: string; categoryIcon: string; slug: string }) | null;
  topTools: (ToolItem & { category: string; categoryIcon: string; slug: string })[];
  recentTools: (ToolItem & { category: string; categoryIcon: string; slug: string })[];
}) {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [typewriterKey, setTypewriterKey] = useState(0);

  // Handle URL hash for category navigation from other pages
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.startsWith('#cat=')) {
      const cat = decodeURIComponent(hash.replace('#cat=', ''));
      if (categories.some((c) => c.category === cat)) {
        setActiveCategory(cat);
        setTypewriterKey((k) => k + 1);
        // Clear hash after reading
        window.history.replaceState(null, '', window.location.pathname);
      }
    }
  }, [categories]);

  const openSourceCount = allTools.filter((t) => t.opensource).length;

  const displayedTools = activeCategory
    ? allTools.filter((t) => t.category === activeCategory)
    : [];

  const activeCatObj = activeCategory
    ? categories.find((c) => c.category === activeCategory)
    : null;

  const titleColor = activeCategory ? getTitleColor(activeCategory) : 'default';

  const handleCategoryClick = useCallback((category: string) => {
    setActiveCategory(category);
    setTypewriterKey((k) => k + 1);
  }, []);

  const categoryDesc = activeCategory ? (categoryDescMap[activeCategory] || '') : '';

  const [copied, setCopied] = useState(false);
  const handleCopyEmail = () => {
    navigator.clipboard.writeText('shaifx@hotmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Accordion: only one tool expanded at a time
  const [expandedTool, setExpandedTool] = useState<string | null>(null);
  const handleToggleTool = (toolName: string) => {
    setExpandedTool((prev) => (prev === toolName ? null : toolName));
  };

  return (
    <AppLayout
      categories={categories}
      activeCategory={activeCategory}
      onCategoryClick={handleCategoryClick}
      topTools={topTools}
      recentTools={recentTools}
    >
      {/* Category view with typewriter */}
      {activeCategory && activeCatObj ? (
        <div>
          {/* Title + Rating Legend */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
            <Title size="large" color={titleColor as any}>
              {activeCatObj.icon} {activeCatObj.category} · {activeCatObj.items.length} 个精选工具
            </Title>
            {/* Rating legend with labels */}
            <div className="rating-legend">
              <div className="rating-legend-item" title="行业最佳，强烈推荐">
                <span className="badge badge-rating-s-plus">S+</span>
                <span className="rating-legend-label">行业最佳</span>
              </div>
              <div className="rating-legend-item" title="非常推荐，同类首选">
                <span className="badge badge-rating">S</span>
                <span className="rating-legend-label">非常推荐</span>
              </div>
              <div className="rating-legend-item" title="推荐，值得尝试">
                <span className="badge badge-rating">A</span>
                <span className="rating-legend-label">推荐</span>
              </div>
              <div className="rating-legend-item" title="可选，有特定场景价值">
                <span className="badge badge-rating">B</span>
                <span className="rating-legend-label">可选</span>
              </div>
            </div>
          </div>

          {/* Category description with typewriter */}
          {categoryDesc && (
            <div className="category-desc-wrapper">
              <Typewriter key={typewriterKey} speed={50}>
                <span className="category-desc">{categoryDesc}</span>
              </Typewriter>
            </div>
          )}

          {/* Tool list with accordion */}
          <div style={{ marginTop: 16 }}>
            {displayedTools.map((tool) => (
              <ToolCard
                key={tool.name}
                tool={tool}
                expanded={expandedTool === tool.name}
                onToggle={() => handleToggleTool(tool.name)}
              />
            ))}
          </div>
        </div>
      ) : (
        <div>
          {/* Home Title */}
          <Title size="large" color="app-blue">
            🏠 极客工具站 · 不收录最多，只收录最好
          </Title>

          {/* Home content */}
          <div style={{ marginTop: 24 }}>
            {/* Time Module - centered with spacing */}
            <div className="time-module-wrapper">
              <Time />
            </div>

            {/* Feature Cards */}
            <div className="feature-cards">
              {featureCards.map((card) => (
                <div key={card.title} className="feature-card">
                  <div className="feature-icon">{card.icon}</div>
                  <h3 className="feature-title">{card.title}</h3>
                  <p className="feature-desc">{card.desc}</p>
                </div>
              ))}
            </div>

            {/* Daily Pick */}
            {dailyPick && (
              <div style={{ marginBottom: 24 }}>
                <div className="section-title" style={{ marginBottom: 12, marginLeft: 4 }}>
                  ⭐ 今日编辑推荐
                </div>
                <Card pattern="app-yellow" style={{ padding: '20px 24px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: 200 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                        <span style={{ fontSize: 22, fontWeight: 900, color: '#725d42' }}>{dailyPick.name}</span>
                        <RatingBadge rating={dailyPick.rating} />
                        <OpenSourceBadge opensource={dailyPick.opensource} />
                      </div>
                      <div style={{ fontSize: 14, color: '#8a7b66', lineHeight: 1.7, marginBottom: 10 }}>
                        {dailyPick.desc}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 12, color: '#a0936e', fontWeight: 600 }}>
                        <span>{dailyPick.categoryIcon} {dailyPick.category}</span>
                        {dailyPick.platform && (
                          <span>{dailyPick.platform.join(' / ')}</span>
                        )}
                        {dailyPick.license && (
                          <span>{dailyPick.license}</span>
                        )}
                      </div>
                    </div>
                    {dailyPick.advantages && dailyPick.advantages.length > 0 && (
                      <div style={{ flex: 1, minWidth: 200 }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: '#8a6010', marginBottom: 8 }}>核心优势</div>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                          {dailyPick.advantages.slice(0, 4).map((a, i) => (
                            <li key={i} style={{ padding: '3px 0', fontSize: 13, color: '#725d42', display: 'flex', alignItems: 'center', gap: 6 }}>
                              <span style={{ color: '#6fba2c', fontWeight: 700, flexShrink: 0 }}>✓</span>
                              {a}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  <div style={{ marginTop: 14, display: 'flex', gap: 8 }}>
                    <a href={dailyPick.url} target="_blank" rel="noopener noreferrer">
                      <Button type="primary" size="small">访问官网</Button>
                    </a>
                    {dailyPick.github && (
                      <a href={dailyPick.github} target="_blank" rel="noopener noreferrer">
                        <Button type="default" size="small">GitHub</Button>
                      </a>
                    )}
                  </div>
                </Card>
              </div>
            )}

            {/* Recent Tools */}
            {recentTools && recentTools.length > 0 && (
              <div style={{ marginBottom: 24 }}>
                <div className="section-title" style={{ marginBottom: 12, marginLeft: 4 }}>
                  🆕 最近收录
                </div>
                <div className="section-box" style={{ padding: '16px 20px' }}>
                  {recentTools.map((tool) => (
                    <div key={tool.name} className="recent-tool-item">
                      <div className="recent-tool-left">
                        <span className="recent-tool-name">{tool.name}</span>
                        <span className="recent-tool-desc">{tool.desc}</span>
                      </div>
                      <div className="recent-tool-badges">
                        <RatingBadge rating={tool.rating} />
                        <OpenSourceBadge opensource={tool.opensource} />
                        <span className="recent-tool-category">{tool.categoryIcon} {tool.category}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Divider style={{ width: '100%', margin: '0 auto' }} />

            {/* About */}
            <div className="section-box" style={{ marginTop: 24 }}>
              <div className="section-title">关于极客工具站</div>
              <p style={{ fontSize: 14, color: '#725d42', lineHeight: 1.8 }}>
                极客工具站不是导航站，而是精选工具百科。我们只收录真正值得长期使用的软件。
                所有推荐标准、淘汰标准和等级说明详见 <a href="/about" style={{ color: 'var(--primary)', fontWeight: 600 }}>关于页面</a>。
              </p>
            </div>

            {/* Stats */}
            <div className="section-box" style={{ padding: '16px 24px' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: 32,
                flexWrap: 'wrap',
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 22, fontWeight: 900, color: '#725d42' }}>{allTools.length}</div>
                  <div style={{ fontSize: 11, color: '#a0936e', fontWeight: 500 }}>收录工具</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 22, fontWeight: 900, color: '#725d42' }}>{openSourceCount}</div>
                  <div style={{ fontSize: 11, color: '#a0936e', fontWeight: 500 }}>开源工具</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 22, fontWeight: 900, color: '#725d42' }}>{categories.length}</div>
                  <div style={{ fontSize: 11, color: '#a0936e', fontWeight: 500 }}>工具分类</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 14, fontWeight: 900, color: '#725d42' }}>
                    {lastUpdated}
                  </div>
                  <div style={{ fontSize: 11, color: '#a0936e', fontWeight: 500 }}>最近更新</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer with email */}
      <div className="site-footer">
        <div>极客工具站 — 不收录最多，只收录最好</div>
        <div style={{ marginTop: 8, opacity: 0.7 }}>所有内容由 bookmarks.yaml 驱动，开源优先，持续淘汰落后产品</div>
        <div style={{ marginTop: 12 }}>
          <button
            onClick={handleCopyEmail}
            style={{
              background: 'none',
              border: 'none',
              color: '#5a4a32',
              fontWeight: 600,
              fontSize: 13,
              cursor: 'pointer',
              padding: 0,
              fontFamily: 'inherit',
            }}
          >
            📬 shaifx@hotmail.com {copied ? '✓ 已复制' : '(点击复制)'}
          </button>
          <span style={{ margin: '0 8px', color: '#a0936e' }}>|</span>
          <span style={{ fontSize: 12, color: '#a0936e' }}>发现好用的工具？欢迎推荐</span>
        </div>
      </div>
    </AppLayout>
  );
}
