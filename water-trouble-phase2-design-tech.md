# 水のトラブル比較サイト - デザインコンセプト & 技術スタック（Phase 2）

**作成日:** 2026-04-04  
**担当:** jiro  

---

## デザインコンセプト

### ブランドアイデンティティ

**サイト名（案）:**
- 🌊 **水回りレスキュー比較ナビ**
- 🚰 **水トラブル解決ガイド**
- 💧 **水道修理比較NAVI**

**キャッチコピー:**
- 「緊急の水トラブルも安心！全国の水道修理業者を料金・口コミで比較」
- 「水のトラブル、すぐ解決。信頼できる業者が見つかる。」

---

### カラースキーム

**メインカラー:**
- 🔵 **プライマリー: 水色（#2196F3）** - 清潔感・信頼感・水のイメージ
- 🟠 **アクセント: オレンジ（#FF9800）** - 緊急性・行動を促す

**サブカラー:**
- ⚪ **ホワイト: #FFFFFF** - 清潔感・見やすさ
- ⚫ **グレー: #F5F5F5（背景）、#757575（テキスト）** - 落ち着き・読みやすさ
- 🟢 **グリーン: #4CAF50** - 安心・アフターフォロー
- 🔴 **レッド: #F44336** - 注意喚起・悪徳業者情報

**使用例:**
- ヘッダー: 水色背景 + 白文字
- CTAボタン: オレンジ背景 + 白文字
- 業者カード: 白背景 + グレー枠
- 評価星: 黄色（#FFC107）
- 注意情報: 薄い赤背景（#FFEBEE）

---

### タイポグラフィ

**フォント選定:**

❌ **使用禁止フォント:**
- Inter, Roboto, Arial, システムフォント（ありきたり）

✅ **推奨フォント（Google Fonts）:**
- **見出し: Noto Sans JP（Bold）** - 日本語に最適、視認性が高い
- **本文: Noto Sans JP（Regular）** - 統一感・読みやすさ
- **数字・料金: Poppins（SemiBold）** - 英数字がスタイリッシュ

**フォントサイズ:**
- H1: 32px（PC）/ 24px（スマホ）
- H2: 28px（PC）/ 22px（スマホ）
- H3: 24px（PC）/ 20px（スマホ）
- 本文: 16px（PC）/ 14px（スマホ）
- 小文字: 14px（PC）/ 12px（スマホ）

---

### デザインスタイル

**方向性:**
- ✅ **クリーン & モダン** - 余白を大胆に取る、シンプルで見やすい
- ✅ **信頼感重視** - 企業ロゴ・評価・料金を明確に表示
- ✅ **緊急性の訴求** - 電話ボタン・24時間対応を目立たせる
- ❌ **ありきたりなAIデザイン禁止** - 紫グラデーション×白背景は使わない

**レイアウトの特徴:**
- カード型デザイン（業者一覧、記事一覧）
- グリッドレイアウト（2カラム、3カラム）
- ホワイトスペースを効果的に活用
- アイコンを活用してビジュアル訴求

**参考サイト（デザイン）:**
- くらしのマーケット（カード型、清潔感）
- マイベスト（比較表、見やすさ）
- 生活110番（緊急性訴求）

---

### アイコン・イラスト

**アイコンライブラリ:**
- **Lucide Icons**（シンプル・モダン）
- **Heroicons**（クリーンなライン）

**使用アイコン例:**
- 🚽 トイレ
- 🚰 蛇口
- 🛁 浴槽
- 🚿 シャワー
- 🔥 給湯器
- ⭐ 評価
- 📞 電話
- 💰 料金
- 🕒 24時間

**イラスト:**
- undraw.co（無料イラスト、水道・修理関連）
- オリジナルイラスト（予算があれば外注）

---

### アニメーション

**基本方針:**
- 意味のある場所にだけ使用
- 過剰なアニメーションは避ける（読み込み速度重視）

**使用箇所:**
- ボタンホバー時: 色変化・影の変化
- スクロールアニメーション: フェードイン（AOS.js）
- ローディング: シンプルなスピナー

---

## 技術スタック選定

### 推奨構成（Next.js + Cloudflare Pages）

#### 1. フロントエンド

**フレームワーク:**
- ✅ **Next.js 15（App Router）** 
  - SSG（Static Site Generation）でSEO最適化
  - ISR（Incremental Static Regeneration）で更新も可能
  - 高速なページ表示
  - TypeScript標準対応

**スタイリング:**
- ✅ **Tailwind CSS**
  - ユーティリティファーストで開発速度が速い
  - レスポンシブ対応が簡単
  - カスタマイズ性が高い

**UIコンポーネント:**
- ✅ **shadcn/ui**
  - Tailwind CSSベース
  - アクセシブル
  - カスタマイズしやすい
  - ボタン、カード、アコーディオン、ドロップダウン等

**アイコン:**
- ✅ **Lucide Icons**
  - シンプル・モダン
  - Tree-shakable（必要なアイコンだけ読み込み）

---

#### 2. データ管理

**業者データの管理:**

**案A: CMS（推奨）**
- ✅ **microCMS**（日本製、使いやすい）
  - 業者情報をGUIで管理
  - API経由でNext.jsに取得
  - 更新が簡単（非エンジニアでも可）
  
**案B: Markdown + JSON**
- ✅ **Markdown + Frontmatter**
  - `/data/companies/qracian.md`
  - メタ情報（料金、評価、エリア等）をFrontmatterに記載
  - ビルド時に静的生成

**案C: Notion API**
- ✅ **Notion Database**
  - Notionで業者データを管理
  - Notion APIで取得してNext.jsに表示
  - チームで管理しやすい

**推奨: 案B（Markdown + JSON）**
- コスト: 無料
- 更新: Git経由（非エンジニアにはやや難）
- スピード: 高速（静的生成）
- 将来的にCMSに移行も可能

---

#### 3. ホスティング

**ホスティング先:**
- ✅ **Cloudflare Pages**
  - 無料（独自ドメインも可）
  - 高速なCDN
  - 自動デプロイ（GitHub連携）
  - Next.js対応

**代替案:**
- Vercel（Next.js公式、無料枠あり）
- Netlify（無料枠あり）

---

#### 4. SEO対策

**必須実装:**
- ✅ **next-seo** - OGP、Twitter Card、メタタグ管理
- ✅ **next-sitemap** - サイトマップ自動生成
- ✅ **Schema.org構造化データ** - LocalBusiness、Review、FAQPage
- ✅ **Googleアナリティクス（GA4）**
- ✅ **Google Search Console**

---

#### 5. アフィリエイトリンク管理

**リンク管理:**
- ✅ **環境変数で管理**
  - `.env.local` にアフィリエイトリンク・電話番号を記載
  - 一括変更が簡単

**トラッキング:**
- ✅ **UTMパラメータ**
  - `?utm_source=site&utm_medium=affiliate&utm_campaign=tokyo`
  - どのページから成約したか分析

---

### 技術構成図

```
┌─────────────────────────────────────────────────┐
│ ユーザー（ブラウザ）                               │
└────────────┬────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────┐
│ Cloudflare Pages（CDN）                           │
│ - 高速配信                                        │
│ - HTTPS自動                                       │
└────────────┬────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────┐
│ Next.js 15（App Router）                          │
│ - SSG（静的サイト生成）                           │
│ - ISR（増分静的再生成）                           │
│ - TypeScript                                      │
└────────────┬────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────┐
│ データソース                                       │
│ - Markdown（業者情報）                            │
│ - JSON（ランキング、料金相場）                    │
│ - 画像（Cloudflare Images or GitHub）            │
└─────────────────────────────────────────────────┘
```

---

### ディレクトリ構成（Next.js App Router）

```
/
├── app/
│   ├── layout.tsx                  # 全ページ共通レイアウト
│   ├── page.tsx                    # トップページ（/）
│   ├── area/
│   │   └── [prefecture]/
│   │       ├── page.tsx            # 都道府県ページ（/area/tokyo）
│   │       └── [city]/
│   │           └── page.tsx        # 市区町村ページ（/area/tokyo/shibuya）
│   ├── trouble/
│   │   └── [slug]/
│   │       └── page.tsx            # トラブル別ページ（/trouble/toilet-clog）
│   ├── company/
│   │   └── [slug]/
│   │       └── page.tsx            # 業者詳細ページ（/company/qracian）
│   ├── ranking/
│   │   └── [category]/
│   │       └── page.tsx            # ランキングページ（/ranking/nationwide）
│   ├── guide/
│   │   ├── price/
│   │   │   └── page.tsx            # 料金相場ページ
│   │   ├── how-to-choose/
│   │   │   └── page.tsx            # 業者の選び方
│   │   └── avoid-scam/
│   │       └── page.tsx            # 悪徳業者を避ける方法
│   ├── about/
│   │   └── page.tsx                # 運営者情報
│   ├── privacy/
│   │   └── page.tsx                # プライバシーポリシー
│   └── contact/
│       └── page.tsx                # お問い合わせ
│
├── components/
│   ├── Header.tsx                  # ヘッダーコンポーネント
│   ├── Footer.tsx                  # フッターコンポーネント
│   ├── CompanyCard.tsx             # 業者カード
│   ├── RankingTable.tsx            # ランキング表
│   ├── PriceTable.tsx              # 料金表
│   ├── FAQAccordion.tsx            # FAQ（アコーディオン）
│   ├── SearchBox.tsx               # エリア検索ボックス
│   └── CTAButton.tsx               # CTAボタン
│
├── data/
│   ├── companies/
│   │   ├── qracian.md              # クラシアンの情報
│   │   ├── esmile.md               # イースマイルの情報
│   │   └── ...
│   ├── rankings/
│   │   └── nationwide.json         # 全国ランキングデータ
│   ├── areas/
│   │   └── tokyo.json              # 東京都の情報
│   └── troubles/
│       └── toilet-clog.json        # トイレつまりの情報
│
├── lib/
│   ├── getCompanies.ts             # 業者データ取得関数
│   ├── getRankings.ts              # ランキングデータ取得関数
│   └── utils.ts                    # ユーティリティ関数
│
├── public/
│   ├── images/
│   │   ├── companies/              # 業者ロゴ
│   │   └── icons/                  # アイコン
│   └── favicon.ico
│
├── styles/
│   └── globals.css                 # グローバルスタイル（Tailwind CSS）
│
├── .env.local                      # 環境変数（アフィリエイトリンク等）
├── next.config.js                  # Next.js設定
├── tailwind.config.js              # Tailwind CSS設定
├── tsconfig.json                   # TypeScript設定
└── package.json
```

---

### 開発フロー

#### Phase 3: 開発・構築
1. **環境構築**
   - Next.js 15プロジェクト作成
   - Tailwind CSS + shadcn/ui セットアップ
   - GitHubリポジトリ作成

2. **共通コンポーネント作成**
   - Header, Footer
   - CompanyCard, RankingTable
   - SearchBox, CTAButton

3. **主要ページ実装**
   - トップページ
   - 全国ランキングページ
   - 東京都ページ（テンプレート）
   - トイレつまり修理ページ（テンプレート）

4. **データ投入**
   - 業者情報（Markdown形式）
   - ランキング（JSON形式）
   - 料金相場（JSON形式）

5. **デプロイ**
   - Cloudflare Pages連携
   - 独自ドメイン設定（例: water-rescue-navi.com）

---

### パフォーマンス目標

- ✅ Lighthouse Score: 90点以上（全項目）
- ✅ First Contentful Paint（FCP）: 1.0秒以内
- ✅ Largest Contentful Paint（LCP）: 2.5秒以内
- ✅ Cumulative Layout Shift（CLS）: 0.1以内
- ✅ 画像最適化: WebP形式、遅延読み込み

---

## デザインシステム（コンポーネント設計）

### ボタン

```tsx
// CTAButton.tsx（shadcn/ui ベース）
<Button variant="primary" size="lg">
  公式サイトへ →
</Button>

<Button variant="outline" size="md">
  📞 電話で問い合わせ
</Button>
```

**バリエーション:**
- primary: オレンジ背景 + 白文字（目立つCTA）
- secondary: 水色背景 + 白文字（補助CTA）
- outline: 白背景 + オレンジ枠（サブCTA）

---

### 業者カード

```tsx
// CompanyCard.tsx
<Card>
  <CardHeader>
    <Badge>🥇 1位</Badge>
    <Image src="logo.png" alt="クラシアン" />
  </CardHeader>
  <CardContent>
    <h3>クラシアン</h3>
    <StarRating rating={4.8} />
    <PriceTag>5,500円〜</PriceTag>
    <Features>
      <Feature>✓ 24時間対応</Feature>
      <Feature>✓ 見積もり無料</Feature>
    </Features>
  </CardContent>
  <CardFooter>
    <CTAButton>公式サイトへ →</CTAButton>
  </CardFooter>
</Card>
```

---

### ランキング表

```tsx
// RankingTable.tsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>順位</TableHead>
      <TableHead>業者名</TableHead>
      <TableHead>料金</TableHead>
      <TableHead>評価</TableHead>
      <TableHead>対応</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {companies.map((company, index) => (
      <TableRow key={company.id}>
        <TableCell>{index + 1}位</TableCell>
        <TableCell>{company.name}</TableCell>
        <TableCell>{company.price}</TableCell>
        <TableCell><StarRating rating={company.rating} /></TableCell>
        <TableCell>24時間</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

---

## Phase 3への移行準備

Phase 2完了内容:
- ✅ サイトマップ作成
- ✅ ワイヤーフレーム設計
- ✅ デザインコンセプト決定
- ✅ 技術スタック選定

**次のPhase 3で実施:**
1. Next.js 15プロジェクト作成
2. Tailwind CSS + shadcn/ui セットアップ
3. 共通コンポーネント実装
4. 主要6ページの実装（トップ、ランキング、東京、トイレつまり、料金相場、選び方）
5. Cloudflare Pagesデプロイ

Phase 3開始の準備が整いました！
