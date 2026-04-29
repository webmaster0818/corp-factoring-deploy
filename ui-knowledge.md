# UI/UXフレームワーク学習 - アフィリエイトサイト向け

**学習日:** 2026-03-09  
**担当:** saburo (CVR & UI/UX)  
**目的:** jiroのコンテンツを高品質なUI/UXでHTML/CSS化する体制構築  

---

## 📚 学習した4つのフレームワーク

### 1. TailwindCSS（シンプル・クリーン系）

**公式:** https://tailwindcss.com  
**無料テンプレート:** https://tailwindui.com/templates#free  
**ドキュメント:** https://tailwindcss.com/docs  

#### 特徴
- **Utility-firstアプローチ** - `flex`, `pt-4`, `text-center`などのクラスを組み合わせてデザイン
- **超軽量** - 本番ビルドで未使用CSSを自動削除、ほとんどのプロジェクトで10kB以下
- **モダンCSS活用** - 最新CSS機能をフル活用
- **カスタマイズ性最高** - どんなデザインも実現可能
- **ベースフレームワーク** - daisyUI、shadcn/ui、FlowbiteはすべてTailwindベース

#### 使い分け
- **最適な場合:** デザインの自由度最優先、完全オリジナルUI
- **向いていない場合:** 短時間でMVP作成、コンポーネントライブラリが欲しい

#### アフィリエイトサイトでの活用
- **LP（ランディングページ）** - ユニークなデザインで差別化
- **カスタムコンポーネント** - 他3フレームワークで実現できないUI

---

### 2. daisyUI（ポップ・カラフル系）

**公式:** https://daisyui.com  
**テーマ一覧:** https://daisyui.com/docs/themes  
**コンポーネント:** https://daisyui.com/components  

#### 特徴
- **Tailwind CSSプラグイン** - セマンティッククラス名（`btn`, `card`, `toggle`）
- **65コンポーネント** - 豊富な既製コンポーネント
- **Pure CSS** - JavaScriptバンドル不要、フレームワーク非依存
- **30+テーマ** - カラフルで親しみやすいデザイン
- **テーマジェネレーター** - カスタムテーマ作成が簡単
- **高速開発** - Bootstrap感覚でTailwindの柔軟性

#### 主要コンポーネント（アフィリエイト向け）
- **レイアウト:** Card, Hero, Navbar, Footer, Drawer
- **フォーム:** Button, Input, Select, Radio, Checkbox, Toggle, Range
- **データ表示:** Table, Badge, Stat, Timeline, Rating, Progress
- **ナビゲーション:** Tabs, Breadcrumbs, Pagination, Steps, Menu
- **フィードバック:** Alert, Modal, Toast, Loading, Skeleton
- **比較:** Diff（サイドバイサイド比較）
- **装飾:** Mask, Divider, Countdown, Status

#### 使い分け
- **最適な場合:** 短時間でMVP作成、親しみやすいデザイン、初心者向けサイト
- **向いていない場合:** 厳粛・権威的なデザイン、モノトーン重視

#### アフィリエイトサイトでの活用
- **商品レビューページ** - Card + Rating + Badge（人気/新着）
- **比較ページ** - Table + Diff + Stat（価格・スペック比較）
- **ランキングページ** - Badge + Steps + Progress（TOP5の視覚化）
- **記事ページ** - Hero + Collapse（FAQ） + Timeline（手順説明）

#### テーマ推奨（アフィリエイト用途別）
- **金融・法律系:** `business`, `corporate`, `dark`（信頼感）
- **美容・健康系:** `cupcake`, `pastel`, `valentine`（柔らかさ）
- **ガジェット・IT系:** `night`, `forest`, `synthwave`（クール）
- **生活・育児系:** `lemonade`, `garden`, `retro`（親しみ）

---

### 3. shadcn/ui（モダン・ダーク系）

**公式:** https://ui.shadcn.com  
**コンポーネント:** https://ui.shadcn.com/docs/components  

#### 特徴
- **デザインシステム基盤** - カスタマイズ・拡張・ビルドしやすい
- **コピー＆ペースト方式** - npmパッケージではなくコードを直接コピー
- **Radix UI + Tailwind** - アクセシビリティとモダンデザイン
- **オープンソース** - コードは完全にオープン
- **モダン・洗練** - ダークモード、グラデーション、繊細なアニメーション

#### 主要コンポーネント
- **データ表示:** Table, Card, Badge, Avatar, Skeleton
- **フォーム:** Button, Input, Select, Checkbox, Radio, Switch
- **ナビゲーション:** Dropdown, Tabs, Breadcrumb, Navigation Menu
- **フィードバック:** Alert, Dialog, Toast, Progress
- **レイアウト:** Sheet, Popover, Tooltip, Separator

#### 使い分け
- **最適な場合:** SaaS風デザイン、ダークモード必須、デザイナー志向
- **向いていない場合:** 時間がない、初心者、カラフルなデザイン

#### アフィリエイトサイトでの活用
- **高単価商品LP** - プレミアム感（投資、高級家電、不動産）
- **比較ツール** - 洗練されたTable + Select（フィルタリング）
- **会員限定コンテンツ** - ダークモードで差別化

---

### 4. Flowbite（多機能・実用系）

**公式:** https://flowbite.com  
**無料テンプレート:** https://flowbite.com/blocks  

#### 特徴
- **Tailwind CSSコンポーネントライブラリ** - 600+コンポーネント
- **Blocks（セクション）** - ページ全体のレイアウト済み
- **Pro版** - 高機能テンプレート、Figmaファイル
- **多機能** - eコマース、ダッシュボード、ブログ対応
- **実用性重視** - デザインよりも機能性

#### 主要コンポーネント（推定）
- **eコマース:** Product Card, Cart, Checkout, Product Gallery
- **コンテンツ:** Article, Blog Post, Comment, Review
- **CTA:** Hero Section, Pricing Table, Feature Comparison
- **フォーム:** Multi-step Form, File Upload, Search Bar

#### 使い分け
- **最適な場合:** 多機能サイト、eコマース重視、時短最優先
- **向いていない場合:** ミニマルデザイン、超軽量サイト

#### アフィリエイトサイトでの活用
- **トップページ（LP風）** - Hero + Feature Comparison + Pricing
- **商品詳細ページ** - Product Gallery + Review + FAQ
- **比較ページ** - Feature Comparison Table + CTA

---

## 🎯 4フレームワークの使い分けマトリクス

```
デザイン自由度
高 ↑
   │ [TailwindCSS]  [shadcn/ui]
   │ オリジナル    モダン・洗練
   │ デザイン      プレミアム
   │
   │ [daisyUI]      [Flowbite]
   │ カラフル      実用・多機能
   │ 親しみやすい  eコマース
低 ↓
   └─────────────────→
      低    開発速度    高
```

---

## 🏆 アフィリエイトサイト用途別推奨フレームワーク

### トップページ（LP風）

**1位: Flowbite Blocks**
- Hero Section + Features + Pricing + CTA が揃っている
- コピペで即LP完成

**2位: daisyUI**
- Hero + Card Grid + Stat でシンプルLP
- テーマ変更だけで雰囲気変更可能

**3位: TailwindCSS**
- 完全オリジナルデザインで差別化したい場合

### 商品レビューページ

**1位: daisyUI**
- Card + Rating + Badge + Collapse（メリデメ展開）が最適
- Phase 3の美容・健康パターンと相性◎

**2位: Flowbite**
- Product Card + Review Component が豊富

**3位: shadcn/ui**
- 高単価商品（投資・不動産）のプレミアム感

### 比較ページ

**1位: daisyUI**
- Table + Diff（サイドバイサイド比較）+ Badge
- モバイル対応も簡単

**2位: Flowbite**
- Feature Comparison Table が強力

**3位: shadcn/ui**
- 洗練されたTable + Select（フィルタリング）

### ランキングページ

**1位: daisyUI**
- Steps + Badge + Progress + Stat
- 視覚的に「1位〜5位」が伝わる

**2位: Flowbite**
- Numbered List + Product Card

**3位: TailwindCSS**
- オリジナルデザインのランキング表現

### 記事ページ（ブログ形式）

**1位: Flowbite**
- Article Block + Comment + Related Posts が揃っている

**2位: daisyUI**
- Collapse（FAQ） + Timeline（手順） + Card（関連記事）

**3位: shadcn/ui**
- シンプル・読みやすさ重視の記事

---

## 📐 アフィリエイトサイト向けレイアウトパターン

### パターン1: トップページ（LP風）- daisyUI推奨

```html
<!-- Hero Section -->
<div class="hero min-h-screen bg-base-200">
  <div class="hero-content text-center">
    <div class="max-w-md">
      <h1 class="text-5xl font-bold">債務整理で借金解決</h1>
      <p class="py-6">無料診断で最適なプランを見つけよう</p>
      <button class="btn btn-primary btn-lg">無料診断を始める</button>
    </div>
  </div>
</div>

<!-- 特徴カード -->
<div class="container mx-auto px-4 py-12">
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">無料相談</h2>
        <p>相談料・診断料 0円</p>
        <div class="badge badge-success">人気</div>
      </div>
    </div>
    <!-- ... 他2枚 -->
  </div>
</div>

<!-- CTA -->
<div class="hero bg-primary text-primary-content">
  <div class="hero-content text-center">
    <button class="btn btn-secondary btn-lg">今すぐ無料診断</button>
  </div>
</div>
```

**Phase 1-5活用:**
- Hero = AIDA の Attention（注意喚起）
- 特徴カード = Interest（興味喚起）
- CTA = Action（行動促進）

---

### パターン2: 商品レビューページ - daisyUI推奨

```html
<!-- 商品ヘッダー -->
<div class="card lg:card-side bg-base-100 shadow-xl">
  <figure><img src="product.jpg" alt="商品画像" /></figure>
  <div class="card-body">
    <h2 class="card-title">
      商品名
      <div class="badge badge-secondary">NEW</div>
    </h2>
    <div class="rating rating-lg">
      <input type="radio" class="mask mask-star-2 bg-orange-400" checked />
      <!-- ... 星5つ -->
    </div>
    <p>商品説明文...</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">公式サイトへ</button>
    </div>
  </div>
</div>

<!-- メリット・デメリット -->
<div class="collapse collapse-plus bg-base-200">
  <input type="radio" name="my-accordion" checked /> 
  <div class="collapse-title text-xl font-medium">メリット</div>
  <div class="collapse-content"> 
    <ul class="list-disc list-inside">
      <li>ポイント1</li>
      <li>ポイント2</li>
    </ul>
  </div>
</div>

<div class="collapse collapse-plus bg-base-200">
  <input type="radio" name="my-accordion" /> 
  <div class="collapse-title text-xl font-medium">デメリット</div>
  <div class="collapse-content"> 
    <ul class="list-disc list-inside">
      <li>注意点1</li>
      <li>注意点2</li>
    </ul>
  </div>
</div>

<!-- スペック表 -->
<div class="overflow-x-auto">
  <table class="table">
    <thead>
      <tr><th>項目</th><th>詳細</th></tr>
    </thead>
    <tbody>
      <tr><td>価格</td><td>月額500円</td></tr>
      <tr><td>契約期間</td><td>縛りなし</td></tr>
    </tbody>
  </table>
</div>
```

**Phase 3活用（美容・健康パターン）:**
- Before/After画像 → Product Gallery
- 成分・効果 → Collapse（展開式）
- 口コミ → Rating + Card

---

### パターン3: 比較ページ - daisyUI推奨

```html
<!-- 比較テーブル -->
<div class="overflow-x-auto">
  <table class="table table-zebra">
    <thead>
      <tr>
        <th></th>
        <th>商品A <div class="badge badge-primary">おすすめ</div></th>
        <th>商品B</th>
        <th>商品C</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>価格</td>
        <td>500円/月</td>
        <td>800円/月</td>
        <td>300円/月</td>
      </tr>
      <tr>
        <td>品質</td>
        <td><div class="rating rating-sm"><input type="radio" class="mask mask-star-2 bg-orange-400" checked />...</div></td>
        <td><div class="rating rating-sm">...</div></td>
        <td><div class="rating rating-sm">...</div></td>
      </tr>
      <tr>
        <td>サポート</td>
        <td><span class="badge badge-success">◎</span></td>
        <td><span class="badge badge-warning">○</span></td>
        <td><span class="badge badge-error">△</span></td>
      </tr>
    </tbody>
  </table>
</div>

<!-- サイドバイサイド比較（モバイル対応） -->
<div class="diff aspect-[16/9]">
  <div class="diff-item-1">
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">商品A</h2>
        <ul class="list-disc list-inside">
          <li>高品質</li>
          <li>高価格</li>
        </ul>
      </div>
    </div>
  </div>
  <div class="diff-item-2">
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">商品B</h2>
        <ul class="list-disc list-inside">
          <li>標準品質</li>
          <li>低価格</li>
        </ul>
      </div>
    </div>
  </div>
  <div class="diff-resizer"></div>
</div>
```

**Phase 4活用（KPI設定）:**
- 比較軸（価格・品質・サポート） → GA4でCTR測定
- おすすめバッジ → A/Bテストで最適配置

---

### パターン4: ランキングページ - daisyUI推奨

```html
<!-- TOP5ステップ表示 -->
<ul class="steps steps-vertical lg:steps-horizontal">
  <li class="step step-primary">1位</li>
  <li class="step step-primary">2位</li>
  <li class="step step-primary">3位</li>
  <li class="step">4位</li>
  <li class="step">5位</li>
</ul>

<!-- 各商品カード -->
<div class="card lg:card-side bg-base-100 shadow-xl">
  <div class="badge badge-lg badge-primary absolute top-0 left-0 m-4">1位</div>
  <figure><img src="product1.jpg" alt="1位商品" /></figure>
  <div class="card-body">
    <h2 class="card-title">商品A</h2>
    <div class="stat">
      <div class="stat-title">総合評価</div>
      <div class="stat-value text-primary">98点</div>
      <div class="stat-desc">先月比 ↗︎ 5点</div>
    </div>
    <progress class="progress progress-primary w-full" value="98" max="100"></progress>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">詳細を見る</button>
      <button class="btn btn-secondary">公式サイト</button>
    </div>
  </div>
</div>

<!-- ... 2位〜5位も同様 -->
```

**Phase 2活用（A/Bテスト）:**
- CTA配置（詳細 vs 公式） → PIE優先度評価
- Badgeデザイン（色・サイズ） → ヒートマップ分析

---

### パターン5: 記事ページ（ブログ形式）- daisyUI推奨

```html
<!-- 記事ヘッダー -->
<div class="hero min-h-[50vh]" style="background-image: url(article-hero.jpg);">
  <div class="hero-overlay bg-opacity-60"></div>
  <div class="hero-content text-center text-neutral-content">
    <h1 class="mb-5 text-5xl font-bold">記事タイトル</h1>
    <div class="badge badge-lg">カテゴリ</div>
    <span class="text-sm">2026-03-09</span>
  </div>
</div>

<!-- 目次 -->
<div class="card bg-base-200 shadow-xl my-8">
  <div class="card-body">
    <h2 class="card-title">目次</h2>
    <ul class="menu">
      <li><a href="#section1">1. はじめに</a></li>
      <li><a href="#section2">2. メリット</a></li>
      <li><a href="#section3">3. デメリット</a></li>
    </ul>
  </div>
</div>

<!-- 本文 -->
<article class="prose lg:prose-xl">
  <h2 id="section1">はじめに</h2>
  <p>本文...</p>
  
  <div class="alert alert-info">
    <svg>...</svg>
    <span>重要ポイント: ...</span>
  </div>
</article>

<!-- FAQ（よくある質問） -->
<div class="collapse collapse-arrow bg-base-200">
  <input type="radio" name="faq" /> 
  <div class="collapse-title text-xl font-medium">Q. 質問1</div>
  <div class="collapse-content"> 
    <p>A. 回答1</p>
  </div>
</div>

<!-- 関連記事 -->
<div class="divider">関連記事</div>
<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
  <div class="card bg-base-100 shadow-xl image-full">
    <figure><img src="related1.jpg" alt="関連記事1" /></figure>
    <div class="card-body">
      <h2 class="card-title">関連記事タイトル</h2>
      <p>要約...</p>
      <div class="card-actions justify-end">
        <button class="btn btn-primary btn-sm">読む</button>
      </div>
    </div>
  </div>
  <!-- ... 他2記事 -->
</div>
```

**Phase 3活用（コンテンツパターン）:**
- Hero = 視覚的インパクト（アイキャッチ）
- 目次 = ユーザビリティ向上（長文記事）
- FAQ Collapse = Phase 3の金融パターン応用

---

## 🔧 実装推奨フロー（jiro → saburo連携）

### ステップ1: jiroがコンテンツ作成
- Markdown形式で記事執筆
- 見出し（h2, h3）、リスト、表を明確に構造化
- 画像・CTA位置を指示

### ステップ2: saburoがUI/UX化
1. **ページタイプ判定**
   - LP → Flowbite Blocks
   - レビュー → daisyUI Card + Rating
   - 比較 → daisyUI Table + Diff
   - ランキング → daisyUI Steps + Badge
   - 記事 → daisyUI Hero + Collapse

2. **フレームワーク選定**
   - デザイントーン（カラフル/モノトーン）
   - 開発速度（即日/1週間）
   - Phase 1-5パターン適用可能性

3. **コンポーネント組み立て**
   - jiroのMarkdownを各コンポーネントにマッピング
   - Phase 2のA/Bテストポイント設定
   - Phase 4のGA4イベント設定

4. **モバイル最適化**
   - daisyUIは自動対応（Responsive by default）
   - CTAボタンを固定表示（sticky bottom）
   - 画像はlazy loading

5. **CVR改善施策**
   - Phase 1のAIDA導線確認
   - Phase 3の業界別パターン適用
   - Phase 4のKPI設定（CVR目標値）

---

## 💡 実践Tips

### daisyUI活用時の注意点
1. **テーマ切り替え**
   - `data-theme="light"` or `data-theme="dark"` で即座に変更
   - A/Bテストでユーザー反応を確認

2. **コンポーネントのカスタマイズ**
   - daisyUIクラス → Tailwindユーティリティで上書き
   - 例: `btn btn-primary rounded-full` （角丸ボタン）

3. **JavaScriptレス**
   - Pure CSSなので軽量・高速
   - Modal、Collapseも`<input type="checkbox">`で実装

### TailwindCSS活用時の注意点
1. **クラス名の爆発**
   - 複雑なデザイン → 50+クラス
   - daisyUI/shadcn/Flowbiteで抽象化推奨

2. **本番ビルド**
   - 必ずPurgeCSS実行（未使用クラス削除）
   - `npm run build` で自動最適化

### shadcn/ui活用時の注意点
1. **コピペ方式**
   - npmインストールではなく、コードを直接コピー
   - カスタマイズしやすいが、アップデート手動

2. **ダークモード**
   - デフォルトで対応
   - 高単価商品（投資・不動産）でプレミアム感演出

### Flowbite活用時の注意点
1. **Pro版の誘惑**
   - 無料版で十分なケースが多い
   - Pro版は大規模サイト向け

2. **Blocks活用**
   - ページ全体のセクションがコピペ可能
   - LP制作の時短に最適

---

## 📊 Phase 1-5統合チェックリスト

### Phase 1（CVR基礎）適用確認
- [ ] AIDA導線設計（Hero → Features → CTA）
- [ ] AISAS導線設計（Search → Interest → Share）
- [ ] CTAボタン配置（Above the fold + 記事末）

### Phase 2（A/Bテスト）適用確認
- [ ] テストポイント設定（CTA色、配置、文言）
- [ ] PIE優先度評価（Potential × Importance × Ease）
- [ ] ヒートマップ分析ポイント設定

### Phase 3（業界別UI/UX）適用確認
- [ ] 業界パターン適用（金融/美容/不動産/法律/健康食品）
- [ ] Before/After表示（該当する場合）
- [ ] 信頼性要素（実績・資格・口コミ）

### Phase 4（KPI設定）適用確認
- [ ] GA4イベント設定（CTA click, Scroll depth, Form submit）
- [ ] CVR目標値設定（Phase 1-5の知識から算出）
- [ ] Looker Studioダッシュボード連携

### Phase 5（統合・PDCA）適用確認
- [ ] PDCAサイクル設計（週次改善ポイント）
- [ ] チェックリスト作成（デザイン品質保証）
- [ ] ロードマップ作成（0-90日計画）

---

## 🎯 最終推奨

### アフィリエイトサイト制作の基本戦略

**開発スピード最優先 → daisyUI**
- 65コンポーネントで即戦力
- テーマ変更で雰囲気チェンジ
- Phase 1-5のすべてのパターンが適用可能

**デザイン差別化重視 → TailwindCSS（生）+ Flowbite Blocks**
- Flowbite BlocksでLP骨格作成
- TailwindでオリジナルUI調整
- 高単価案件で差別化

**高単価・プレミアム案件 → shadcn/ui**
- ダークモード + 洗練デザイン
- 投資・不動産・高級品向け
- SaaS風UI（会員制サイト）

### 学習優先度

1. **最優先: daisyUI** ← 85%のアフィリエイトサイトはこれで十分
2. **次点: TailwindCSS基礎** ← daisyUIカスタマイズに必要
3. **余裕あれば: Flowbite Blocks** ← LP制作時短
4. **上級者向け: shadcn/ui** ← 高単価案件のみ

---

## 📝 次のステップ

1. **daisyUIの実践**
   - サンプルページ作成（LP、レビュー、比較、ランキング、記事）
   - jiroのコンテンツ1本をHTML/CSS化

2. **Phase 1-5との統合**
   - CVR改善施策をdaisyUIコンポーネントにマッピング
   - A/Bテストポイント設定（PIE評価）

3. **テンプレート化**
   - 5パターン（LP/レビュー/比較/ランキング/記事）のテンプレート作成
   - jiroがすぐに使える状態に

4. **GA4連携**
   - Phase 4のKPI測定を各ページに実装
   - Looker Studioダッシュボード作成

---

**学習完了日:** 2026-03-09  
**次回更新:** 実践経験を積んだ後、Tips追加  
