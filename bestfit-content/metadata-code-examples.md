# メタデータ設定 コード例

**作成者:** jiro（コンテンツ担当）  
**作成日時:** 2026年3月11日 00:24

---

## 1. トップページ（`app/layout.tsx`）

```typescript
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BEST-FIT｜全国のパーソナルジム比較・検索サイト',
  description: '全国1,000店舗以上のパーソナルジムを比較・検索できます。料金、口コミ、エリアから最適なジムを見つけよう。無料診断で30秒であなたにぴったりのジムが見つかります。',
  keywords: 'パーソナルジム,比較,検索,料金,口コミ,おすすめ,ダイエット,筋トレ',
  metadataBase: new URL('https://dunlopsportsclub.jp'),
  openGraph: {
    title: 'BEST-FIT｜全国のパーソナルジム比較・検索サイト',
    description: '全国1,000店舗以上のパーソナルジムを比較・検索。無料診断で30秒であなたにぴったりのジムが見つかります。',
    url: 'https://dunlopsportsclub.jp/',
    siteName: 'BEST-FIT',
    images: [
      {
        url: '/ogp-image.jpg',
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
    images: ['/ogp-image.jpg'],
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
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        {/* 構造化データ: Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'BEST-FIT',
              url: 'https://dunlopsportsclub.jp/',
              logo: 'https://dunlopsportsclub.jp/logo.png',
              sameAs: [
                'https://twitter.com/bestfit',
                'https://www.facebook.com/bestfit',
                'https://www.youtube.com/@bestfit',
              ],
            }),
          }}
        />
        {/* 構造化データ: WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'BEST-FIT',
              url: 'https://dunlopsportsclub.jp/',
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://dunlopsportsclub.jp/search?q={search_term_string}',
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

---

## 2. エリアページ（`app/areas/[prefecture]/page.tsx`）

```typescript
import type { Metadata } from 'next';

// 動的メタデータ生成
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
          url: `/ogp-area-${prefectureName}.jpg`,
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
      images: [`/ogp-area-${prefectureName}.jpg`],
    },
    alternates: {
      canonical: `https://dunlopsportsclub.jp/areas/${prefectureName}`,
    },
  };
}

export default function AreaPage({ params }: { params: { prefecture: string } }) {
  const prefectureName = params.prefecture;

  return (
    <div>
      <head>
        {/* 構造化データ: BreadcrumbList */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'ホーム',
                  item: 'https://dunlopsportsclub.jp/',
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'エリア一覧',
                  item: 'https://dunlopsportsclub.jp/areas',
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: prefectureName,
                  item: `https://dunlopsportsclub.jp/areas/${prefectureName}`,
                },
              ],
            }),
          }}
        />
      </head>
      
      {/* ページコンテンツ */}
      <h1>パーソナルジム{prefectureName}おすすめ12選</h1>
      {/* ... */}
    </div>
  );
}
```

---

## 3. ブログ記事ページ（`app/blog/beginner-guide/page.tsx`）

```typescript
import type { Metadata } from 'next';

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
        url: '/blog-beginner-guide-ogp.jpg',
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
    images: ['/blog-beginner-guide-ogp.jpg'],
  },
  alternates: {
    canonical: 'https://dunlopsportsclub.jp/blog/beginner-guide',
  },
};

export default function BeginnerGuidePage() {
  return (
    <article>
      <head>
        {/* 構造化データ: Article */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Article',
              headline: '初心者向けパーソナルジムの選び方｜失敗しないための完全ガイド',
              description: '初心者が失敗しないパーソナルジムの選び方を5つのステップで解説。',
              image: 'https://dunlopsportsclub.jp/blog-beginner-guide-ogp.jpg',
              datePublished: '2026-03-10T00:00:00.000Z',
              dateModified: '2026-03-10T00:00:00.000Z',
              author: {
                '@type': 'Organization',
                name: 'BEST-FIT編集部',
              },
              publisher: {
                '@type': 'Organization',
                name: 'BEST-FIT',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://dunlopsportsclub.jp/logo.png',
                },
              },
            }),
          }}
        />
      </head>
      
      <h1>初心者向けパーソナルジムの選び方｜失敗しないための完全ガイド</h1>
      {/* 記事コンテンツ */}
    </article>
  );
}
```

---

## 4. お問い合わせページ（`app/contact/page.tsx`）

```typescript
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'お問い合わせ｜BEST-FIT',
  description: 'BEST-FITへのお問い合わせはこちら。パーソナルジムに関するご質問、サイトに関するご意見・ご要望をお気軽にお寄せください。',
  robots: {
    index: false, // お問い合わせページは検索結果に表示しない
    follow: true,
  },
};

export default function ContactPage() {
  return (
    <div>
      <h1>お問い合わせ</h1>
      {/* お問い合わせフォーム */}
    </div>
  );
}
```

---

## 5. プライバシーポリシー・利用規約（`app/privacy/page.tsx`）

```typescript
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'プライバシーポリシー｜BEST-FIT',
  description: 'BEST-FITのプライバシーポリシーです。個人情報の取り扱いについてご確認ください。',
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPage() {
  return (
    <div>
      <h1>プライバシーポリシー</h1>
      {/* プライバシーポリシー内容 */}
    </div>
  );
}
```

---

## 6. 実装手順

### ステップ1: `app/layout.tsx` にグローバルメタデータ設定

```bash
# ファイル編集
vi app/layout.tsx
```

- トップページのメタデータを追加
- favicon設定
- 構造化データ（Organization, WebSite）追加

---

### ステップ2: `app/sitemap.ts` 作成

```bash
# ファイル作成
touch app/sitemap.ts
vi app/sitemap.ts
```

- `sitemap-code.ts` の内容をコピー
- 47都道府県のエリアページを追加

---

### ステップ3: `app/robots.ts` 作成

```bash
# ファイル作成
touch app/robots.ts
vi app/robots.ts
```

- `robots-code.ts` の内容をコピー

---

### ステップ4: 各ページにメタデータ追加

**エリアページ:**
```bash
vi app/areas/[prefecture]/page.tsx
```
- `generateMetadata` 関数を追加
- OGP設定、Twitter Card設定
- 構造化データ（BreadcrumbList）追加

**ブログ記事:**
```bash
# 各ブログ記事ページを作成
mkdir -p app/blog/beginner-guide
mkdir -p app/blog/price-guide
mkdir -p app/blog/personal-vs-fitness

# メタデータ設定
vi app/blog/beginner-guide/page.tsx
vi app/blog/price-guide/page.tsx
vi app/blog/personal-vs-fitness/page.tsx
```

---

### ステップ5: favicon準備

```bash
# faviconファイルを app/ に配置
cp /path/to/favicon.ico app/favicon.ico
cp /path/to/icon.png app/icon.png
cp /path/to/apple-icon.png app/apple-icon.png
```

---

### ステップ6: OGP画像準備

```bash
# OGP画像を public/ に配置
mkdir -p public
cp /path/to/ogp-image.jpg public/ogp-image.jpg
cp /path/to/ogp-area-*.jpg public/
cp /path/to/blog-*-ogp.jpg public/
```

---

### ステップ7: 動作確認

```bash
# 開発サーバー起動
npm run dev

# sitemap.xml確認
open http://localhost:3000/sitemap.xml

# robots.txt確認
open http://localhost:3000/robots.txt

# OGP確認
# Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/
# Twitter Card Validator: https://cards-dev.twitter.com/validator
```

---

**実装準備完了。taro/saburoの技術実装を待ちます。**
