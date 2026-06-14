'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getCategorySlug } from '@/lib/utils';
import type { Category } from '@/types';
import Image from 'next/image';

interface SidebarProps {
  categories: Category[];
  activeCategory?: string | null;
  onCategoryClick?: (category: string) => void;
}

const walletAddresses = [
  {
    chain: 'TRON',
    symbol: 'TRX',
    address: 'TYCjZ6hFbYRKx5UvUm1aJq2xykbtR1LxHc',
    icon: '/trx-logo.png',
  },
  {
    chain: 'Solana',
    symbol: 'SOL',
    address: '9k5kK9xLp1YPkT6Z42grsfPzo2v5frovyolDq5bv31hk',
    icon: '/sol-logo.png',
  },
  {
    chain: 'Arbitrum',
    symbol: 'ARB',
    address: '0xa46cb97bf2f41d7592d04f49fddbbb20b2eecea',
    icon: '/arb-logo.png',
  },
];

export default function Sidebar({ categories, activeCategory, onCategoryClick }: SidebarProps) {
  const [donateOpen, setDonateOpen] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const handleCopyAddress = (address: string, index: number) => {
    navigator.clipboard.writeText(address);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleCategoryClick = (category: string) => {
    // Use hash-based routing for static export compatibility
    if (pathname !== '/' && pathname !== '/index.html') {
      router.push(`/#cat=${encodeURIComponent(category)}`);
    } else {
      onCategoryClick?.(category);
    }
  };

  return (
    <>
      <aside className="sidebar">
        {/* Menu list */}
        <nav className="menu-list">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.category;
            return (
              <div
                key={cat.category}
                role="button"
                tabIndex={0}
                className={`menu-item ${isActive ? 'active' : ''}`}
                onClick={() => handleCategoryClick(cat.category)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCategoryClick(cat.category);
                  }
                }}
              >
                <span className="menu-label">
                  <span className="menu-icon">{cat.icon}</span>
                  {cat.category}
                </span>
                <span className="menu-count">{cat.items.length}</span>
              </div>
            );
          })}
        </nav>

        {/* Donate */}
        <div className="donate-section">
          <button className="coffee-btn" onClick={() => setDonateOpen(true)}>
            <span className="coffee-icon">☕</span>
            <span className="coffee-text">请我喝杯咖啡</span>
          </button>
        </div>
      </aside>

      {/* Donate Modal - custom overlay */}
      {donateOpen && (
        <div className="coffee-overlay" onClick={() => setDonateOpen(false)}>
          <div className="coffee-modal" onClick={(e) => e.stopPropagation()}>
            <div className="coffee-modal-header">
              <h2 className="coffee-modal-title">☕ 请我喝杯咖啡</h2>
              <button className="coffee-modal-close" onClick={() => setDonateOpen(false)}>✕</button>
            </div>
            <div className="coffee-modal-body">
              <p className="coffee-modal-desc">
                如果本站帮到了你，欢迎捐赠支持我继续维护更新。以下是虚拟货币收款地址：
              </p>
              <div className="crypto-list">
                {walletAddresses.map((w, i) => (
                  <div key={w.chain} className="crypto-item">
                    <div className="crypto-header">
                      <Image className="crypto-icon" src={w.icon} alt={w.symbol} width={24} height={24} />
                      <span className="crypto-name">{w.chain}</span>
                      <span className="crypto-symbol">{w.symbol}</span>
                    </div>
                    <div className="crypto-address-row">
                      <code className="crypto-address">{w.address}</code>
                      <button
                        className="copy-btn"
                        onClick={() => handleCopyAddress(w.address, i)}
                      >
                        {copiedIndex === i ? '✓ 已复制' : '复制'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <p className="coffee-modal-thanks">
                感谢你的支持！每一杯咖啡都是我持续更新的动力 ☕️
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
