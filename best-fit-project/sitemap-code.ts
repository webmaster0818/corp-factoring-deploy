// app/sitemap.ts
// BEST-FIT サイトマップ生成
// 作成者: jiro（コンテンツ担当）
// 作成日時: 2026年3月11日 00:22

import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://dunlopsportsclub.jp';
  const currentDate = new Date().toISOString();
  
  // 静的ページ
  const staticPages = [
    {
      route: '',
      priority: 1.0,
      changeFrequency: 'weekly' as const,
    },
    {
      route: '/about',
      priority: 0.5,
      changeFrequency: 'monthly' as const,
    },
    {
      route: '/contact',
      priority: 0.5,
      changeFrequency: 'monthly' as const,
    },
    {
      route: '/privacy',
      priority: 0.3,
      changeFrequency: 'yearly' as const,
    },
    {
      route: '/terms',
      priority: 0.3,
      changeFrequency: 'yearly' as const,
    },
    {
      route: '/blog/beginner-guide',
      priority: 0.8,
      changeFrequency: 'monthly' as const,
    },
    {
      route: '/blog/price-guide',
      priority: 0.8,
      changeFrequency: 'monthly' as const,
    },
    {
      route: '/blog/personal-vs-fitness',
      priority: 0.8,
      changeFrequency: 'monthly' as const,
    },
  ].map((page) => ({
    url: `${baseUrl}${page.route}`,
    lastModified: currentDate,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
  
  // エリアページ（47都道府県）
  const prefectures = [
    '北海道',
    '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県',
    '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県',
    '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県', '静岡県', '愛知県',
    '三重県', '滋賀県', '京都府', '大阪府', '兵庫県', '奈良県', '和歌山県',
    '鳥取県', '島根県', '岡山県', '広島県', '山口県',
    '徳島県', '香川県', '愛媛県', '高知県',
    '福岡県', '佐賀県', '長崎県', '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県',
  ];
  
  const areaPages = prefectures.map((prefecture) => ({
    url: `${baseUrl}/areas/${encodeURIComponent(prefecture)}`,
    lastModified: currentDate,
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }));
  
  return [...staticPages, ...areaPages];
}
