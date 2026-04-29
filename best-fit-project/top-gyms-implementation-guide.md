# TOP3ジム紹介セクション UI実装ガイド（saburo用）

**作成者:** jiro（コンテンツ担当）  
**実装者:** saburo（UI/UX担当）  
**作成日時:** 2026年3月10日 23:20

---

## 実装概要

**配置場所:** トップページ、検索セクション（Search）と新着記事（The Latest Articles）の間

**レイアウト:**
- デスクトップ: 3カラムグリッド
- タブレット: 2カラムグリッド（3番目のカードは2カラムまたがり）
- モバイル: 1カラム縦並び

**daisyUIコンポーネント:** Card, Badge, Rating, Button

---

## セクション全体の構造

```html
<!-- セクション全体 -->
<section class="container mx-auto p-8 bg-base-100">
  <!-- セクションタイトル -->
  <h2 class="text-3xl font-bold text-center mb-4">
    日本で人気のパーソナルジムTOP3
  </h2>
  
  <p class="text-center text-gray-600 mb-12">
    実際の利用者の口コミ評価が高い、おすすめのパーソナルジムをご紹介
  </p>
  
  <!-- 3カラムグリッド -->
  <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
    <!-- ジム1: RIZAP -->
    <!-- ジム2: 24/7 Workout -->
    <!-- ジム3: BEYOND -->
  </div>
  
  <!-- 料金比較表 -->
  <!-- セクション末尾のCTA -->
</section>
```

---

## ジム1: RIZAP（ライザップ）

### カード構造

```html
<div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow relative">
  <!-- ランキングバッジ（右上） -->
  <div class="badge badge-primary badge-lg absolute top-4 right-4 z-10">
    第1位
  </div>
  
  <div class="card-body">
    <!-- ロゴ・タイトル -->
    <div class="flex items-center gap-4 mb-4">
      <!-- ロゴ（Placeholder） -->
      <div class="avatar placeholder">
        <div class="bg-neutral text-neutral-content rounded-full w-16">
          <span class="text-2xl font-bold">R</span>
        </div>
      </div>
      
      <div>
        <h3 class="card-title text-2xl">RIZAP</h3>
        <p class="text-sm text-gray-500">ライザップ</p>
      </div>
    </div>
    
    <!-- 評価 -->
    <div class="flex items-center gap-2 mb-4">
      <div class="rating rating-sm">
        <input type="radio" class="mask mask-star-2 bg-orange-400" checked />
        <input type="radio" class="mask mask-star-2 bg-orange-400" checked />
        <input type="radio" class="mask mask-star-2 bg-orange-400" checked />
        <input type="radio" class="mask mask-star-2 bg-orange-400" checked />
        <input type="radio" class="mask mask-star-2 bg-orange-400" checked />
      </div>
      <span class="text-sm font-bold">4.8</span>
      <span class="text-sm text-gray-500">(1,234件)</span>
    </div>
    
    <!-- キャッチコピー -->
    <p class="text-sm text-gray-600 mb-4">
      「結果にコミットする」日本最大級のパーソナルジム
    </p>
    
    <!-- 特徴バッジ（3つまで） -->
    <div class="flex flex-wrap gap-2 mb-4">
      <div class="badge badge-ghost">完全個室</div>
      <div class="badge badge-ghost">全額返金保証</div>
      <div class="badge badge-ghost">実績18万人</div>
    </div>
    
    <!-- 料金 -->
    <div class="divider"></div>
    
    <div class="flex justify-between items-center mb-4">
      <span class="text-sm text-gray-600">2ヶ月コース</span>
      <span class="text-2xl font-bold text-primary">382,800円</span>
    </div>
    
    <div class="text-xs text-gray-500 mb-4">
      入会金55,000円 + コース料金327,800円
    </div>
    
    <!-- CTA -->
    <div class="card-actions flex-col gap-2">
      <button class="btn btn-primary w-full">詳細を見る</button>
      <button class="btn btn-outline w-full">口コミを見る</button>
    </div>
  </div>
</div>
```

### データ

**ロゴ:**
- Placeholder（文字「R」）
- 実際のロゴ画像URL（後で追加）: `https://placehold.co/64x64/333/fff?text=R`

**評価:**
- 総合評価: 4.8/5.0
- レビュー数: 1,234件
- 星: 5つ（checked）

**キャッチコピー:**
「結果にコミットする」日本最大級のパーソナルジム

**特徴バッジ（3つ）:**
- 完全個室
- 全額返金保証
- 実績18万人

**料金:**
- 総額: 382,800円
- 内訳: 入会金55,000円 + コース料金327,800円

**CTA:**
- ボタン1: 「詳細を見る」（Primary）
- ボタン2: 「口コミを見る」（Outline）

---

## ジム2: 24/7 Workout

### カード構造

（RIZAP と同じ構造）

### データ

**ロゴ:**
- Placeholder（文字「24」）
- 実際のロゴ画像URL: `https://placehold.co/64x64/333/fff?text=24`

**ランキングバッジ:**
- 第2位

**評価:**
- 総合評価: 4.5/5.0
- レビュー数: 892件
- 星: 4.5つ（4つchecked + 0.5は4つcheckedで代用）

**キャッチコピー:**
3食食べて痩せる、無理のないダイエット

**特徴バッジ（3つ）:**
- 3食食べるダイエット
- 早朝7時〜深夜24時
- 手ぶらOK

**料金:**
- 総額: 299,200円
- 内訳: 入会金41,800円 + コース料金257,400円

**CTA:**
- ボタン1: 「詳細を見る」（Primary）
- ボタン2: 「口コミを見る」（Outline）

---

## ジム3: BEYOND（ビヨンド）

### カード構造

（RIZAP と同じ構造）

### データ

**ロゴ:**
- Placeholder（文字「B」）
- 実際のロゴ画像URL: `https://placehold.co/64x64/333/fff?text=B`

**ランキングバッジ:**
- 第3位

**評価:**
- 総合評価: 4.6/5.0
- レビュー数: 756件
- 星: 4.5つ（4つchecked + 0.5は4つcheckedで代用）

**キャッチコピー:**
美ボディコンテスト優勝者が指導、理想のボディラインへ

**特徴バッジ（3つ）:**
- 美ボディ特化
- 糖質制限なし
- 入会金無料

**料金:**
- 総額: 281,600円
- 内訳: 入会金0円 + コース料金281,600円

**CTA:**
- ボタン1: 「詳細を見る」（Primary）
- ボタン2: 「口コミを見る」（Outline）

---

## 料金比較表

### テーブル構造

```html
<div class="mt-12 mb-12">
  <h3 class="text-2xl font-bold text-center mb-8">料金比較表</h3>
  
  <div class="overflow-x-auto">
    <table class="table table-zebra w-full">
      <!-- ヘッダー -->
      <thead>
        <tr>
          <th>ジム</th>
          <th>入会金</th>
          <th>コース料金<br><span class="text-xs">(2ヶ月16回)</span></th>
          <th>総額</th>
          <th>特徴</th>
        </tr>
      </thead>
      
      <!-- ボディ -->
      <tbody>
        <!-- RIZAP -->
        <tr>
          <td>
            <div class="flex items-center gap-2">
              <div class="badge badge-primary">1位</div>
              <span class="font-bold">RIZAP</span>
            </div>
          </td>
          <td>55,000円</td>
          <td>327,800円</td>
          <td class="font-bold text-lg">382,800円</td>
          <td>最高品質、全額返金保証</td>
        </tr>
        
        <!-- 24/7 Workout -->
        <tr>
          <td>
            <div class="flex items-center gap-2">
              <div class="badge badge-secondary">2位</div>
              <span class="font-bold">24/7 Workout</span>
            </div>
          </td>
          <td>41,800円</td>
          <td>257,400円</td>
          <td class="font-bold text-lg">299,200円</td>
          <td>3食食べるダイエット、コスパ良</td>
        </tr>
        
        <!-- BEYOND -->
        <tr>
          <td>
            <div class="flex items-center gap-2">
              <div class="badge badge-accent">3位</div>
              <span class="font-bold">BEYOND</span>
            </div>
          </td>
          <td class="text-success font-bold">0円</td>
          <td>281,600円</td>
          <td class="font-bold text-lg text-success">281,600円</td>
          <td>入会金無料、美ボディ特化</td>
        </tr>
      </tbody>
    </table>
  </div>
  
  <!-- コスパランキング（ミニ情報） -->
  <div class="alert alert-info mt-4">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
    <div>
      <strong>コスパランキング:</strong> 
      1位 BEYOND (281,600円) / 2位 24/7 Workout (299,200円) / 3位 RIZAP (382,800円)
    </div>
  </div>
</div>
```

---

## セクション末尾のCTA

```html
<div class="text-center mt-12">
  <h3 class="text-2xl font-bold mb-4">
    あなたに最適なパーソナルジムを見つけよう
  </h3>
  
  <p class="text-gray-600 mb-8">
    BEST-FITなら、全国1,000店舗以上のパーソナルジムを比較・検索できます。<br>
    まずは無料で検索してみてください。
  </p>
  
  <div class="flex flex-col sm:flex-row gap-4 justify-center">
    <button class="btn btn-primary btn-lg gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      無料で最適なジムを探す
    </button>
    
    <button class="btn btn-outline btn-lg gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
      エリアから探す
    </button>
  </div>
</div>
```

---

## レスポンシブ対応

### ブレークポイント

- **モバイル（< 768px）:**
  - 1カラム縦並び
  - カードのpadding調整（`p-4`）
  - テーブルは横スクロール（`overflow-x-auto`）

- **タブレット（768px - 1023px）:**
  - 2カラムグリッド（`md:grid-cols-2`）
  - 3番目のカードは2カラムまたがり or 1行目に2つ、2行目に1つ

- **デスクトップ（1024px+）:**
  - 3カラムグリッド（`lg:grid-cols-3`）

### 実装例

```html
<!-- 3カラムグリッド -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  <!-- カード1 -->
  <div class="card ...">...</div>
  
  <!-- カード2 -->
  <div class="card ...">...</div>
  
  <!-- カード3（タブレットで2カラムまたがり） -->
  <div class="card md:col-span-2 lg:col-span-1 ...">...</div>
</div>
```

---

## アクセシビリティ

### aria属性

```html
<!-- カード -->
<div class="card ..." role="article" aria-label="RIZAP パーソナルジム情報">
  
  <!-- ランキングバッジ -->
  <div class="badge ..." aria-label="第1位">第1位</div>
  
  <!-- 評価 -->
  <div class="rating" role="img" aria-label="評価4.8、5つ星中">...</div>
  
  <!-- CTA -->
  <button class="btn btn-primary" aria-label="RIZAPの詳細を見る">
    詳細を見る
  </button>
</div>
```

---

## GA4イベント設定

### イベント名

```javascript
// カードのCTAクリック
gtag('event', 'gym_card_click', {
  'gym_name': 'RIZAP', // または '24/7 Workout', 'BEYOND'
  'button_type': 'detail', // または 'review'
  'rank': 1 // または 2, 3
});

// 料金比較表の閲覧（スクロールで表示時）
gtag('event', 'price_table_view', {
  'section': 'top_gyms'
});

// セクション末尾のCTAクリック
gtag('event', 'top_gyms_cta_click', {
  'button_type': 'search' // または 'area'
});
```

---

## 構造化データ（Schema.org）

### ItemList + LocalBusiness

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "日本で人気のパーソナルジムTOP3",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "LocalBusiness",
        "name": "RIZAP",
        "url": "https://www.rizap.jp/",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "reviewCount": "1234",
          "bestRating": "5",
          "worstRating": "1"
        },
        "priceRange": "¥¥¥¥",
        "description": "「結果にコミットする」日本最大級のパーソナルジム"
      }
    },
    {
      "@type": "ListItem",
      "position": 2,
      "item": {
        "@type": "LocalBusiness",
        "name": "24/7 Workout",
        "url": "https://247workout.jp/",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.5",
          "reviewCount": "892",
          "bestRating": "5",
          "worstRating": "1"
        },
        "priceRange": "¥¥¥",
        "description": "3食食べて痩せる、無理のないダイエット"
      }
    },
    {
      "@type": "ListItem",
      "position": 3,
      "item": {
        "@type": "LocalBusiness",
        "name": "BEYOND",
        "url": "https://beyond-gym.com/",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.6",
          "reviewCount": "756",
          "bestRating": "5",
          "worstRating": "1"
        },
        "priceRange": "¥¥¥",
        "description": "美ボディコンテスト優勝者が指導、理想のボディラインへ"
      }
    }
  ]
}
</script>
```

---

## 画像URL一覧

### ロゴ（Placeholder）

- **RIZAP:** `https://placehold.co/64x64/333/fff?text=R`
- **24/7 Workout:** `https://placehold.co/64x64/333/fff?text=24`
- **BEYOND:** `https://placehold.co/64x64/333/fff?text=B`

### アイコン（SVG、既に含まれている）

- **検索アイコン:** `M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z`
- **ロケーションアイコン:** `M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z...`

---

## 実装チェックリスト（saburo用）

- [ ] セクション全体の構造（H2, P, Grid, Table, CTA）
- [ ] ジム1: RIZAPカード実装（Badge, Rating, Button）
- [ ] ジム2: 24/7 Workoutカード実装
- [ ] ジム3: BEYONDカード実装
- [ ] 料金比較表実装（Table, Alert）
- [ ] セクション末尾のCTA実装（2ボタン、SVGアイコン）
- [ ] レスポンシブ対応（grid-cols-1/md:2/lg:3）
- [ ] aria属性追加（アクセシビリティ）
- [ ] GA4イベント設定（gym_card_click, price_table_view, top_gyms_cta_click）
- [ ] 構造化データ（Schema.org ItemList）
- [ ] トップページ（index.html）に統合
- [ ] 動作確認（デスクトップ、タブレット、モバイル）

---

## 実装完了後の確認ポイント

**視覚:**
- ✅ 3カラムグリッドが正しく表示される
- ✅ カードのhover効果が動作する
- ✅ ランキングバッジが右上に表示される
- ✅ 評価の星が正しく表示される
- ✅ 料金比較表がモバイルで横スクロール可能

**機能:**
- ✅ CTAボタンがクリック可能（GA4イベント発火）
- ✅ レスポンシブ対応が正常（モバイル、タブレット、デスクトップ）
- ✅ アクセシビリティ（aria属性、role）

**SEO:**
- ✅ 構造化データ（JSON-LD）がhead内に挿入される
- ✅ Google Rich Results Testで確認

---

**実装準備完了。saburoの作業開始を待ちます。**
