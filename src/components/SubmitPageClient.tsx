'use client';

import React, { useState } from 'react';
import { Button, Input, Card, Typewriter, Title } from 'animal-island-ui';
import AppLayout from '@/components/AppLayout';
import type { Category, ToolItem } from '@/types';

export default function SubmitPageClient({
  categories,
  topTools,
  recentTools,
}: {
  categories: Category[];
  topTools: (ToolItem & { category: string; categoryIcon: string; slug: string })[];
  recentTools: (ToolItem & { category: string; categoryIcon: string; slug: string })[];
}) {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [github, setGithub] = useState('');
  const [desc, setDesc] = useState('');
  const [reason, setReason] = useState('');
  const [category, setCategory] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [typewriterKey] = useState(0);

  const categoryOptions = categories.map((c) => c.category);

  function validate(): boolean {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = '请输入工具名称';
    if (!url.trim()) newErrors.url = '请输入官网 URL';
    if (!desc.trim()) newErrors.desc = '请输入一句话介绍';
    if (!reason.trim()) newErrors.reason = '请输入推荐理由';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit() {
    if (!validate()) return;

    const title = encodeURIComponent(`[工具推荐] ${name}`);
    const body = encodeURIComponent(
      [
        `## 工具名称`,
        name,
        '',
        `## 官网 URL`,
        url,
        '',
        github ? `## GitHub URL\n${github}\n` : '',
        `## 一句话介绍`,
        desc,
        '',
        `## 推荐理由`,
        reason,
        '',
        category ? `## 分类\n${category}\n` : '',
        '---',
        '*此 Issue 由极客工具站推荐表单自动生成*',
      ].join('\n')
    );

    window.open(
      `https://github.com/0xshai/geektool/issues/new?title=${title}&body=${body}`,
      '_blank'
    );
  }

  return (
    <AppLayout
      categories={categories}
      topTools={topTools}
      recentTools={recentTools}
    >
      <Title size="large" color="app-pink">
        💡 推荐工具 · 发现好工具？欢迎推荐
      </Title>

      {/* Description with typewriter */}
      <div className="category-desc-wrapper">
        <Typewriter key={typewriterKey} speed={50}>
          <span className="category-desc">分享你发现的好工具，帮助更多极客找到值得安装的软件</span>
        </Typewriter>
      </div>

      <Card color="app-yellow" pattern="none" style={{ padding: 24, marginTop: 16 }}>
        <div className="submit-form">
          <div className="form-field">
            <label className="form-label">
              工具名称 <span className="required">*</span>
            </label>
            <Input
              placeholder="例如：Obsidian"
              value={name}
              onChange={(e) => setName(e.target.value)}
              status={errors.name ? 'error' : undefined}
            />
            {errors.name && <span className="form-error">{errors.name}</span>}
          </div>

          <div className="form-field">
            <label className="form-label">
              官网 URL <span className="required">*</span>
            </label>
            <Input
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              status={errors.url ? 'error' : undefined}
            />
            {errors.url && <span className="form-error">{errors.url}</span>}
          </div>

          <div className="form-field">
            <label className="form-label">GitHub URL</label>
            <Input
              placeholder="https://github.com/user/repo（选填）"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
            />
          </div>

          <div className="form-field">
            <label className="form-label">
              一句话介绍 <span className="required">*</span>
            </label>
            <Input
              placeholder="用一句话描述这个工具"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              status={errors.desc ? 'error' : undefined}
            />
            {errors.desc && <span className="form-error">{errors.desc}</span>}
          </div>

          <div className="form-field">
            <label className="form-label">
              推荐理由 <span className="required">*</span>
            </label>
            <textarea
              className="form-textarea"
              placeholder="为什么推荐这个工具？它解决了什么问题？"
              rows={4}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
            {errors.reason && <span className="form-error">{errors.reason}</span>}
          </div>

          <div className="form-field">
            <label className="form-label">分类</label>
            <select
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">请选择分类（选填）</option>
              {categoryOptions.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="form-actions">
            <Button type="primary" size="large" onClick={handleSubmit}>
              提交推荐
            </Button>
          </div>

          <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 16 }}>
            点击提交后将跳转到 GitHub Issue 页面，无需注册即可提交。
          </p>
        </div>
      </Card>

      <div className="site-footer">
        <p>极客工具站 — 不收录最多，只收录最好</p>
      </div>

      <style jsx>{`
        .submit-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .form-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .form-label {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-primary);
        }
        .required {
          color: var(--color-red, #e74c3c);
        }
        .form-error {
          font-size: 12px;
          color: var(--color-red, #e74c3c);
        }
        .form-textarea {
          width: 100%;
          padding: 8px 12px;
          border: 2px solid var(--color-app-teal, #2dd4bf);
          border-radius: 8px;
          font-size: 14px;
          background: rgba(255, 255, 255, 0.85);
          outline: none;
          resize: vertical;
          font-family: inherit;
          transition: border-color 0.2s;
        }
        .form-textarea:focus {
          border-color: var(--color-app-yellow, #f59e0b);
        }
        .form-select {
          width: 100%;
          padding: 8px 12px;
          border: 2px solid var(--color-app-teal, #2dd4bf);
          border-radius: 8px;
          font-size: 14px;
          background: rgba(255, 255, 255, 0.85);
          outline: none;
          cursor: pointer;
          transition: border-color 0.2s;
        }
        .form-select:focus {
          border-color: var(--color-app-yellow, #f59e0b);
        }
        .form-actions {
          display: flex;
          gap: 12px;
          margin-top: 4px;
        }
      `}</style>
    </AppLayout>
  );
}
