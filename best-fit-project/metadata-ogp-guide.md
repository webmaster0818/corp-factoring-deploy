# メタデータ・OGP最適化 実装ガイド

**作成者:** jiro（コンテンツ担当）  
**作成日時:** 2026年3月11日 00:20

---

## 1. OGP（Open Graph Protocol）設定

### トップページ（`app/page.tsx` または `app/layout.tsx`）

```typescript
export const metadata: Metadata = {
  title: 'BEST-FIT｜全国のパーソナルジム比較・検索サイト',
  description: '全国1,000店舗以上のパーソナルジムを比較・検索できます。料金、口コミ、エリアから最適なジムを見つけよう。無料診断で30秒であなたにぴったりのジムが見つかります。',
  keywords: 'パーソナルジム,比較,検索,料金,口コミ,おすすめ,ダイエット,筋トレ',
  openGraph: {
    title: 'BEST-FIT｜全国のパーソナルジム比較・検索サイト',
    description: '全国1,000店舗以上のパーソナルジムを比較・検索。無料診断で30秒であなたにぴったりのジムが見つかります。',
    url: 'https://dunlopsportsclub.jp/',
    siteName: 'BEST-FIT',
    images: [
      {
        url: 'https://dunlopsportsclub.jp/ogp-image.jpg',
        width: 1200,
        height: 630,
        alt: 'BEST-FIT - パーソナルジム比較サイト',
      },
    ],
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BEST-FIT｜全国のパーソナルジム比較・検索サイト',
    description: '全国1,000店舗以上のパーソナルジムを比較・検索。無料診断で30秒であなたにぴったりのジムが見つかります。',
    images: ['https://dunlopsportsclub.jp/ogp-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code-here',
  },
};
```

---

### エリアページ（`app/areas/[prefecture]/page.tsx`）

```typescript
export async function generateMetadata({ params }: { params: { prefecture: string } }): Promise<Metadata> {
  const prefectureName = params.prefecture; // 例: 東京都
  
  return {
    title: `パーソナルジム${prefectureName}おすすめ12選｜2026年最新比較`,
    description: `${prefectureName}エリアで人気のパーソナルジム12選を徹底比較。実際の利用者の口コミ、料金、特徴、営業時間から最適なジムが見つかります。無料体験・カウンセリング情報も掲載。`,
    keywords: `パーソナルジム,${prefectureName},おすすめ,料金,口コミ,比較`,
    openGraph: {
      title: `パーソナルジム${prefectureName}おすすめ12選｜2026年最新比較`,
      description: `${prefectureName}エリアで人気のパーソナルジム12選を徹底比較。口コミ、料金、特徴から最適なジムが見つかります。`,
      url: `https://dunlopsportsclub.jp/areas/${prefectureName}`,
      siteName: 'BEST-FIT',
      images: [
        {
          url: `https://dunlopsportsclub.jp/ogp-area-${prefectureName}.jpg`,
          width: 1200,
          height: 630,
          alt: `${prefectureName}のパーソナルジム比較`,
        },
      ],
      locale: 'ja_JP',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `パーソナルジム${prefectureName}おすすめ12選｜2026年最新比較`,
      description: `${prefectureName}エリアで人気のパーソナルジム12選を徹底比較。口コミ、料金、特徴から最適なジムが見つかります。`,
      images: [`https://dunlopsportsclub.jp/ogp-area-${prefectureName}.jpg`],
    },
    alternates: {
      canonical: `https://dunlopsportsclub.jp/areas/${prefectureName}`,
    },
  };
}
```

---

### ブログ記事ページ

```typescript
export const metadata: Metadata = {
  title: '初心者向けパーソナルジムの選び方｜失敗しないための完全ガイド',
  description: '初心者が失敗しないパーソナルジムの選び方を5つのステップで解説。無料体験の活用法、見落としがちなチェックポイントも紹介。',
  keywords: 'パーソナルジム,選び方,初心者,失敗しない,無料体験',
  openGraph: {
    title: '初心者向けパーソナルジムの選び方｜失敗しないための完全ガイド',
    description: '初心者が失敗しないパーソナルジムの選び方を5つのステップで解説。',
    url: 'https://dunlopsportsclub.jp/blog/beginner-guide',
    siteName: 'BEST-FIT',
    images: [
      {
        url: 'https://dunlopsportsclub.jp/blog-beginner-guide-ogp.jpg',
        width: 1200,
        height: 630,
        alt: '初心者向けパーソナルジムの選び方',
      },
    ],
    locale: 'ja_JP',
    type: 'article',
    publishedTime: '2026-03-10T00:00:00.000Z',
    authors: ['BEST-FIT編集部'],
  },
  twitter: {
    card: 'summary_large_image',
    title: '初心者向けパーソナルジムの選び方｜失敗しないための完全ガイド',
    description: '初心者が失敗しないパーソナルジムの選び方を5つのステップで解説。',
    images: ['https://dunlopsportsclub.jp/blog-beginner-guide-ogp.jpg'],
  },
  alternates: {
    canonical: 'https://dunlopsportsclub.jp/blog/beginner-guide',
  },
};
```

---

## 2. favicon設定

### ファイル構成

```
app/
  favicon.ico          (32x32, ICO形式)
  icon.png             (512x512, PNG形式)
  apple-icon.png       (180x180, PNG形式)
```

### `app/layout.tsx` に追加

Next.js 13以降は、`app/` ディレクトリに配置するだけで自動認識されます。

追加設定が必要な場合:

```typescript
export const metadata: Metadata = {
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
};
```

---

## 3. sitemap.xml作成

### `app/sitemap.ts`

```typescript
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://dunlopsportsclub.jp';
  
  // 静的ページ
  const staticPages = [
    '',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
    '/blog/beginner-guide',
    '/blog/price-guide',
    '/blog/personal-vs-fitness',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));
  
  // エリアページ（動的生成）
  const prefectures = [
    '東京都', '神奈川県', '埼玉県', '千葉県', '大阪府', '愛知県',
    '福岡県', '北海道', '宮城県', '広島県', '京都府', '兵庫県',
    // ... 他の都道府県
  ];
  
  const areaPages = prefectures.map((prefecture) => ({
    url: `${baseUrl}/areas/${prefecture}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }));
  
  return [...staticPages, ...areaPages];
}
```

**生成されるsitemap.xml:**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://dunlopsportsclub.jp/</loc>
    <lastmod>2026-03-11</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://dunlopsportsclub.jp/areas/東京都</loc>
    <lastmod>2026-03-11</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <!-- ... -->
</urlset>
```

---

## 4. robots.txt作成

### `app/robots.ts`

```typescript
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        crawlDelay: 0,
      },
    ],
    sitemap: 'https://dunlopsportsclub.jp/sitemap.xml',
  };
}
```

**生成されるrobots.txt:**

```
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

User-agent: Googlebot
Allow: /
Crawl-delay: 0

Sitemap: https://dunlopsportsclub.jp/sitemap.xml
```

---

## 5. meta description最適化

### 最適化のポイント

1. **文字数:** 120文字程度（Googleは120文字前後を推奨）
2. **キーワード:** ターゲットキーワードを自然に含める
3. **CTA:** 行動を促す言葉（「無料診断」「比較してみよう」など）
4. **ユニーク性:** ページごとに異なるdescriptionを設定

---

### トップページ

```typescript
description: '全国1,000店舗以上のパーソナルジムを比較・検索できます。料金、口コミ、エリアから最適なジムを見つけよう。無料診断で30秒であなたにぴったりのジムが見つかります。'
```

**文字数:** 約100文字  
**キーワード:** パーソナルジム、比較、検索、料金、口コミ、無料診断  
**CTA:** 「無料診断で30秒であなたにぴったりのジムが見つかります」

---

### エリアページ（東京都の例）

```typescript
description: '東京都エリアで人気のパーソナルジム12選を徹底比較。実際の利用者の口コミ、料金、特徴、営業時間から最適なジムが見つかります。無料体験・カウンセリング情報も掲載。'
```

**文字数:** 約100文字  
**キーワード:** 東京都、パーソナルジム、比較、口コミ、料金、無料体験  
**CTA:** 「最適なジムが見つかります」

---

### ブログ記事（初心者向けガイド）

```typescript
description: '初心者が失敗しないパーソナルジムの選び方を5つのステップで解説。無料体験の活用法、見落としがちなチェックポイントも紹介。'
```

**文字数:** 約80文字  
**キーワード:** 初心者、パーソナルジム、選び方、無料体験  
**CTA:** 「失敗しない」「5つのステップで解説」

---

## 6. OGP画像作成ガイド

### 推奨サイズ

- **Facebook/OGP:** 1200px × 630px
- **Twitter Card:** 1200px × 675px（または1200px × 630px）

### デザインのポイント

1. **タイトル:** 大きく、読みやすく（40〜60文字程度）
2. **サブテキスト:** 簡潔な説明文（20〜30文字程度）
3. **ブランドロゴ:** 左上または右下に配置
4. **背景:** シンプルで視認性の高い色（グラデーション可）
5. **画像:** 関連性のある写真（ジム、トレーニング風景など）

### ファイル例

- `public/ogp-image.jpg` - トップページ用
- `public/ogp-area-東京都.jpg` - 東京都エリアページ用
- `public/blog-beginner-guide-ogp.jpg` - ブログ記事用

---

## 7. 構造化データ（JSON-LD）

### トップページ（Organization + WebSite）

```typescript
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "BEST-FIT",
  "url": "https://dunlopsportsclub.jp/",
  "logo": "https://dunlopsportsclub.jp/logo.png",
  "sameAs": [
    "https://twitter.com/bestfit",
    "https://www.facebook.com/bestfit",
    "https://www.youtube.com/@bestfit"
  ]
}
</script>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "BEST-FIT",
  "url": "https://dunlopsportsclub.jp/",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://dunlopsportsclub.jp/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
</script>
```

---

## 8. 実装チェックリスト

### OGP設定

- [ ] トップページにOGP設定（title, description, image, url）
- [ ] エリアページにOGP設定（動的生成）
- [ ] ブログ記事ページにOGP設定
- [ ] Twitter Card設定（summary_large_image）
- [ ] OGP画像（1200x630px）の準備

### meta description

- [ ] トップページ（120文字、キーワード含む、CTA含む）
- [ ] エリアページ（動的生成、120文字）
- [ ] ブログ記事ページ（80〜120文字）

### favicon

- [ ] favicon.ico（32x32）
- [ ] icon.png（512x512）
- [ ] apple-icon.png（180x180）

### sitemap.xml

- [ ] `app/sitemap.ts` 作成
- [ ] 静的ページ追加
- [ ] 動的ページ（エリア）追加
- [ ] changeFrequency、priority設定

### robots.txt

- [ ] `app/robots.ts` 作成
- [ ] User-agent設定
- [ ] Allow/Disallow設定
- [ ] Sitemap URL追加

### 構造化データ

- [ ] Organization（会社情報）
- [ ] WebSite（サイト情報 + 検索機能）
- [ ] BreadcrumbList（パンくずリスト）
- [ ] FAQPage（FAQ）

---

## 9. テスト・確認

### OGPテスト

- **Facebook Sharing Debugger:** https://developers.facebook.com/tools/debug/
- **Twitter Card Validator:** https://cards-dev.twitter.com/validator
- **LinkedIn Post Inspector:** https://www.linkedin.com/post-inspector/

### 構造化データテスト

- **Google Rich Results Test:** https://search.google.com/test/rich-results
- **Schema Markup Validator:** https://validator.schema.org/

### sitemap.xml確認

- ブラウザで `https://dunlopsportsclub.jp/sitemap.xml` にアクセス
- Google Search Console で送信

### robots.txt確認

- ブラウザで `https://dunlopsportsclub.jp/robots.txt` にアクセス
- Google Search Console の robots.txt テスターで確認

---

**実装準備完了。taro/saburoの技術実装を待ちます。**
