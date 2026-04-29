# BEST-FIT - パーソナルジム比較・検索サイト

**全国1,000店舗以上のパーソナルジムを比較・検索できる情報サイト**

[![Next.js](https://img.shields.io/badge/Next.js-15.1.3-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC)](https://tailwindcss.com/)
[![daisyUI](https://img.shields.io/badge/daisyUI-4-5A0EF8)](https://daisyui.com/)

---

## 📖 プロジェクト概要

BEST-FITは、ユーザーが自分に最適なパーソナルジムを見つけられる日本最大級の比較・検索サイトです。

### 主な機能

- ✅ **パーソナルジムの比較・検索**
  - 全国1,000店舗以上を掲載
  - エリア、料金、口コミ評価で絞り込み

- ✅ **無料診断サービス**
  - わずか30秒で最適なジムを診断
  - 目的、予算、エリアから提案

- ✅ **口コミ・レビュー**
  - 実際の利用者の声を掲載
  - トレーナーの質、施設、食事指導、コスパを評価

- ✅ **情報提供**
  - 初心者向けガイド
  - 料金相場
  - パーソナルジムとフィットネスジムの違い

---

## 🛠️ 技術スタック

### フレームワーク・ライブラリ

| 技術 | バージョン | 用途 |
|------|----------|------|
| **Next.js** | 15.1.3 | Reactフレームワーク、App Router使用 |
| **React** | 19 | UIライブラリ |
| **TypeScript** | 5 | 型安全性 |

### スタイリング

| 技術 | バージョン | 用途 |
|------|----------|------|
| **Tailwind CSS** | 4.0 | ユーティリティファーストCSS |
| **daisyUI** | 4 | UIコンポーネントライブラリ |

### SEO・アクセシビリティ

- **構造化データ（JSON-LD）**: Organization, WebSite, BreadcrumbList, FAQPage, ItemList, Article
- **OGP（Open Graph Protocol）**: Facebook, Twitter Card対応
- **sitemap.xml**: 自動生成（55ページ）
- **robots.txt**: クローラー制御
- **WCAG 2.1 AA準拠**: アクセシビリティ対応

### パフォーマンス最適化

- **Next.js Image**: 画像最適化（AVIF, WebP対応）
- **next/font**: フォント最適化（Noto Sans JP）
- **静的生成（SSG）**: 47都道府県ページを事前生成
- **gzip圧縮**: 転送サイズ削減

---

## 📁 ディレクトリ構成

```
bestfit-remake/
├── app/                      # Next.js App Router
│   ├── layout.tsx            # ルートレイアウト（グローバルメタデータ、フォント設定）
│   ├── page.tsx              # トップページ
│   ├── about/                # 会社概要ページ
│   ├── contact/              # お問い合わせページ
│   ├── privacy/              # プライバシーポリシー
│   ├── terms/                # 利用規約
│   ├── blog/                 # ブログ記事
│   │   ├── beginner-guide/   # 初心者向けガイド
│   │   ├── price-guide/      # 料金相場ガイド
│   │   └── personal-vs-fitness/ # パーソナルvsフィットネス
│   ├── areas/                # エリア別ページ
│   │   └── [prefecture]/     # 動的ルート（47都道府県）
│   ├── components/           # 共通コンポーネント
│   │   └── Footer.tsx        # フッター
│   ├── sitemap.ts            # sitemap.xml生成
│   └── robots.ts             # robots.txt生成
├── public/                   # 静的ファイル
│   ├── favicon.ico           # ファビコン
│   ├── icon.png              # アイコン（512x512）
│   ├── apple-icon.png        # Appleアイコン（180x180）
│   └── ogp-image.jpg         # OGP画像（1200x630）
├── 404.html                  # 404エラーページ
├── error.html                # 汎用エラーページ
├── robots.txt                # robots.txt
├── next.config.ts            # Next.js設定
├── tailwind.config.ts        # Tailwind CSS設定
├── package.json              # 依存関係
└── README.md                 # このファイル
```

---

## 🚀 セットアップ手順

### 前提条件

- **Node.js**: 18.17以上
- **npm**: 9以上

### インストール

```bash
# リポジトリをクローン
git clone https://github.com/your-org/bestfit-remake.git
cd bestfit-remake

# 依存関係をインストール
npm install
```

### 開発サーバー起動

```bash
npm run dev
```

ブラウザで `http://localhost:3000` にアクセス

### ビルド（本番環境）

```bash
# 本番用ビルド
npm run build

# 本番サーバー起動
npm start
```

---

## 🌐 デプロイ

### Vercel（推奨）

1. **Vercelアカウント作成**
   - https://vercel.com/signup

2. **リポジトリ連携**
   - GitHubリポジトリをVercelに連携

3. **環境変数設定**（オプション）
   - `NEXT_PUBLIC_SITE_URL`: サイトURL

4. **デプロイ**
   - Vercelが自動的にビルド・デプロイ

**無料プラン制限:**
- ビルド時間: 月100時間
- 帯域幅: 月100GB
- 関数実行時間: 月100時間

---

## 📊 パフォーマンス指標

### Google Lighthouse スコア（予測）

| 項目 | スコア | 評価 |
|------|--------|------|
| **Performance** | 90-95 | ✅ 優秀 |
| **Accessibility** | 95-100 | ✅ 完璧 |
| **Best Practices** | 95-100 | ✅ 完璧 |
| **SEO** | 95-100 | ✅ 完璧 |

### Core Web Vitals（予測）

| 指標 | 値 | 評価 |
|------|-----|------|
| **LCP**（Largest Contentful Paint） | 1.8-2.2秒 | ✅ Good |
| **INP**（Interaction to Next Paint） | 80-120ms | ✅ Good |
| **CLS**（Cumulative Layout Shift） | 0.04-0.06 | ✅ Good |

---

## 📄 実装済み機能

### ページ（11ページ）

1. **トップページ** (`/`)
   - Hero、検索バー、Stats、TOP3ジム、FAQ、CTA

2. **エリアページ** (`/areas/[prefecture]`)
   - 47都道府県対応（動的生成）
   - ジムリスト、FAQ、関連エリアリンク

3. **会社概要** (`/about`)
   - サービス内容、運営方針、運営会社情報、FAQ

4. **お問い合わせ** (`/contact`)
   - フォーム（名前、メール、電話、お問い合わせ内容）
   - クライアントサイドバリデーション

5. **プライバシーポリシー** (`/privacy`)
   - 個人情報の取り扱い、Cookie、アクセス解析

6. **利用規約** (`/terms`)
   - 9条（適用、定義、禁止事項、免責事項、著作権など）

7. **ブログ記事（3記事）**
   - 初心者向けガイド（4,800文字）
   - 料金相場ガイド（6,200文字）
   - パーソナルvsフィットネス（5,700文字）

8. **404エラーページ**
   - カスタムデザイン、おすすめジムTOP3、よくアクセスされるページリンク

9. **汎用エラーページ**
   - エラーの可能性リスト、お試しくださいカード、お問い合わせサポート

---

### SEO対策

- ✅ meta description（全ページ設定済み）
- ✅ OGP（主要ページ設定済み）
- ✅ Twitter Card（summary_large_image）
- ✅ 構造化データ（6種類実装）
- ✅ sitemap.xml（55ページ）
- ✅ robots.txt（クローラー制御）
- ✅ 内部リンク充実（トップ10本以上、エリア24本）

---

### アクセシビリティ

- ✅ WCAG 2.1 AA準拠
- ✅ セマンティックHTML
- ✅ aria属性
- ✅ キーボードナビゲーション
- ✅ スクリーンリーダー対応
- ✅ カラーコントラスト確認

---

## 🔧 カスタマイズ

### テーマカラー変更

`tailwind.config.ts` で daisyUI のテーマカラーを変更:

```typescript
daisyui: {
  themes: [
    {
      mytheme: {
        "primary": "#3b82f6",    // プライマリカラー
        "secondary": "#8b5cf6",  // セカンダリカラ
        "accent": "#06b6d4",     // アクセントカラー
        // ...
      },
    },
  ],
},
```

### サイト名・URL変更

`app/layout.tsx` と `next.config.ts` で変更:

```typescript
// app/layout.tsx
export const metadata: Metadata = {
  title: 'あなたのサイト名',
  description: 'あなたのサイト説明',
  metadataBase: new URL('https://your-domain.com'),
  // ...
};
```

---

## 📞 お問い合わせ

### 運営会社

- **会社名**: 株式会社BEST-FIT
- **所在地**: 〒150-0001 東京都渋谷区神宮前1-1-1
- **電話番号**: 03-1234-5678
- **メールアドレス**: info@dunlopsportsclub.jp
- **URL**: https://dunlopsportsclub.jp/

---

## 📝 ライセンス

このプロジェクトは MIT ライセンスの下で公開されています。

---

## 🙏 謝辞

このプロジェクトは、以下のオープンソースプロジェクトを使用しています:

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [daisyUI](https://daisyui.com/)

---

**© 2026 BEST-FIT Inc. All rights reserved.**
