// Category name to English slug mapping for URL routes
const categorySlugMap: Record<string, string> = {
  '编程工具': 'dev-tools',
  '浏览器': 'browsers',
  '图像处理': 'image-tools',
  '下载工具': 'download-tools',
  '视频处理': 'video-tools',
  '视频播放': 'video-players',
  '设计': 'design',
  '系统工具': 'system-tools',
  '翻译工具': 'translation',
  '文件同步': 'file-sync',
  '输入法': 'input-method',
  '邮箱': 'email',
  '密码管理': 'password-manager',
  '双因素认证': '2fa',
  '办公': 'office',
  '笔记': 'notes',
  '加密云盘': 'encrypted-cloud',
  '效率工具': 'productivity',
  '学习工具': 'learning',
  '本地 AI': 'local-ai',
  'AI 工具': 'ai-tools',
};

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fff]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Get English slug for category URL (falls back to pinyin-style slug)
export function getCategorySlug(category: string): string {
  if (categorySlugMap[category]) return categorySlugMap[category];
  // Fallback: transliterate Chinese to pinyin-like (simplified)
  return category
    .replace(/[\u4e00-\u9fff]/g, (ch) => {
      const map: Record<string, string> = {
        '编': 'bian', '程': 'cheng', '工': 'gong', '具': 'ju',
        '浏': 'liu', '览': 'lan', '器': 'qi',
        '图': 'tu', '像': 'xiang', '处': 'chu', '理': 'li',
        '下': 'xia', '载': 'zai',
        '视': 'shi', '频': 'pin', '播': 'bo', '放': 'fang',
        '设': 'she', '计': 'ji',
        '系': 'xi', '统': 'tong',
        '翻': 'fan', '译': 'yi',
        '文': 'wen', '件': 'jian', '同': 'tong', '步': 'bu',
        '输': 'shu', '入': 'ru', '法': 'fa',
        '邮': 'you', '箱': 'xiang',
        '密': 'mi', '码': 'ma', '管': 'guan',
        '双': 'shuang', '因': 'yin', '素': 'su', '认': 'ren', '证': 'zheng',
        '办': 'ban', '公': 'gong',
        '笔': 'bi', '记': 'ji',
        '加': 'jia', '云': 'yun', '盘': 'pan',
        '效': 'xiao', '率': 'lv',
        '学': 'xue', '习': 'xi',
        '本': 'ben', '地': 'di',
      };
      return map[ch] || ch;
    })
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Reverse lookup: slug -> category name
export function getCategoryFromSlug(slug: string): string | undefined {
  for (const [cat, s] of Object.entries(categorySlugMap)) {
    if (s === slug) return cat;
  }
  return undefined;
}
