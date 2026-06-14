'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Input, Icon } from 'animal-island-ui';
import { useRouter } from 'next/navigation';
import Fuse from 'fuse.js';
import type { ToolItem } from '@/types';

type ToolWithMeta = ToolItem & { category: string; categoryIcon: string; slug: string };

interface HeaderProps {
  allTools: ToolWithMeta[];
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

export default function Header({ allTools }: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Initialize Fuse instance
  const fuse = useMemo(() => {
    return new Fuse(allTools, {
      keys: ['name', 'desc', 'category', 'tags'],
      threshold: 0.3,
      includeScore: true,
    });
  }, [allTools]);

  // Search results
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const results = fuse.search(searchQuery.trim());
    return results.slice(0, 8);
  }, [searchQuery, fuse]);

  const showDropdown = searchQuery.trim().length > 0;

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(e.target as Node)
      ) {
        setSearchQuery('');
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleResultClick = (tool: ToolWithMeta) => {
    router.push(`/tool/${tool.slug}`);
    setSearchQuery('');
  };

  return (
    <header className="site-header">
      <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
        <Icon item={29} size={36} />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: 16, fontWeight: 800, color: '#725d42', letterSpacing: '-0.3px', lineHeight: 1.2 }}>极客工具站</span>
          <span style={{ fontSize: 11, color: '#a0936e', fontWeight: 500, lineHeight: 1.2 }}>只推荐真正值得安装的软件</span>
        </div>
      </a>

      <div className="header-search" ref={searchRef} style={{ position: 'relative' }}>
        <Input
          placeholder="搜索工具..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          allowClear
          size="small"
          style={{ width: 220 }}
        />
        {showDropdown && (
          <div className="search-dropdown" ref={dropdownRef}>
            {searchResults.length > 0 ? (
              searchResults.map((result) => {
                const tool = result.item;
                return (
                  <div
                    key={tool.slug}
                    className="search-result-item"
                    onClick={() => handleResultClick(tool)}
                  >
                    <span className="search-result-name">{tool.name}</span>
                    <span className="search-result-desc">{tool.desc}</span>
                    <div className="search-result-meta">
                      <RatingBadge rating={tool.rating} />
                      <span>{tool.category}</span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="search-empty">未找到匹配的工具</div>
            )}
          </div>
        )}
      </div>

      {/* Hamburger menu button (mobile) */}
      <button
        className="mobile-menu-btn"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="菜单"
      >
        {mobileMenuOpen ? '✕' : '☰'}
      </button>

      <div className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        <Link href="/" className={pathname === '/' ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>
          首页
        </Link>
        <Link href="/top" className={pathname === '/top' ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>
          推荐榜
        </Link>
        <Link href="/retired" className={pathname === '/retired' ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>
          淘汰库
        </Link>
        <Link href="/submit" className={pathname === '/submit' ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>
          推荐工具
        </Link>
        <Link href="/about" className={pathname === '/about' ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>
          关于
        </Link>
      </div>

      <div className="header-actions">
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: 20, color: 'var(--text-body)', display: 'flex', alignItems: 'center' }}
        >
          ⭐
        </a>
      </div>
    </header>
  );
}
