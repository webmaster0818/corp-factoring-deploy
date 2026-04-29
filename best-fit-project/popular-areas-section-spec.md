# 「人気エリアから探す」セクション - 実装仕様書

**作成日:** 2026年3月26日  
**担当:** jiro（仕様）→ taro（実装）  
**対象:** bestfit-remake TOPページ

---

## 📋 概要

TOPページに主要都市へのリンクを集約した「人気エリアから探す」セクションを追加し、内部リンク最適化（戦略v3.0準拠）を実現する。

---

## 🎯 目的

1. ユーザーが主要都市のジム情報に素早くアクセスできる
2. 内部リンク強化によるSEO効果向上
3. クローラビリティ向上（主要ページへの導線確保）

---

## 📍 配置場所

**TOPページ（app/page.tsx）の配置順序:**

1. Hero（H1 + 検索バー）
2. Stats（実績・統計）
3. **← ここに挿入: 人気エリアから探す**
4. TOP3ジム紹介
5. FAQ
6. CTA

**理由:** ファーストビューとTOP3ジムの間に配置することで、ユーザーがエリア検索またはジム検索のどちらでもアクセスしやすい導線を確保。

---

## 🏗️ HTML/JSX構造

### セクション全体

```tsx
<section className="py-16 bg-base-100">
  <div className="container mx-auto px-4">
    {/* セクションヘッダー */}
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        人気エリアから探す
      </h2>
      <p className="text-lg text-base-content/70">
        主要都市のパーソナルジム情報をチェック
      </p>
    </div>

    {/* エリアグリッド */}
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
      {popularAreas.map((area) => (
        <a
          key={area.slug}
          href={area.url}
          className="card bg-base-200 hover:bg-base-300 transition-colors p-6 text-center group"
        >
          <div className="text-4xl mb-3">{area.icon}</div>
          <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">
            {area.name}
          </h3>
          <p className="text-sm text-base-content/60">
            {area.count}店舗
          </p>
        </a>
      ))}
    </div>

    {/* 全エリア一覧へのリンク */}
    <div className="text-center mt-10">
      <a 
        href="/areas" 
        className="btn btn-outline btn-primary"
      >
        全エリア一覧を見る
        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </a>
    </div>
  </div>
</section>
```

---

## 📊 必要なデータ

### popularAreas配列（TypeScript型定義）

```typescript
type PopularArea = {
  slug: string;      // URL用のスラッグ
  name: string;      // 表示名
  url: string;       // リンク先URL
  count: number;     // ジム件数
  icon: string;      // 絵文字アイコン
};

const popularAreas: PopularArea[] = [
  { slug: 'tokyo-shibuya', name: '東京・渋谷', url: '/gyms/list/tokyo-shibuya', count: 15, icon: '🗼' },
  { slug: 'tokyo-shinjuku', name: '東京・新宿', url: '/gyms/list/tokyo-shinjuku', count: 18, icon: '🏙️' },
  { slug: 'tokyo-minato', name: '東京・港区', url: '/gyms/list/tokyo-minato', count: 16, icon: '🌆' },
  { slug: 'yokohama', name: '横浜', url: '/gyms/list/yokohama', count: 20, icon: '⛵' },
  { slug: 'osaka', name: '大阪', url: '/gyms/list/osaka', count: 18, icon: '🏯' },
  { slug: 'nagoya', name: '名古屋', url: '/gyms/list/nagoya', count: 12, icon: '🏢' },
  { slug: 'fukuoka', name: '福岡', url: '/gyms/list/fukuoka', count: 14, icon: '🍜' },
  { slug: 'sapporo', name: '札幌', url: '/gyms/list/sapporo', count: 10, icon: '❄️' },
  { slug: 'sendai', name: '仙台', url: '/gyms/list/sendai', count: 8, icon: '🌲' },
  { slug: 'hiroshima', name: '広島', url: '/gyms/list/hiroshima', count: 9, icon: '⚾' },
];
```

**注:** 件数（count）はsaburoが作成した最適化案を参照。実データ導入時に更新。

---

## 🎨 スタイリング詳細

### レスポンシブ対応

| ブレークポイント | グリッド列数 | カードサイズ |
|-----------------|------------|------------|
| モバイル（~768px） | 2列 | 小 |
| タブレット（768px~1024px） | 3列 | 中 |
| デスクトップ（1024px~） | 5列 | 中 |

### カラー・エフェクト

- **通常状態:** `bg-base-200`（daisyUIのグレー背景）
- **ホバー状態:** `bg-base-300` + エリア名が `text-primary`
- **トランジション:** `transition-colors`（滑らかな色変化）

### アイコン

- 絵文字を使用（軽量・互換性高）
- サイズ: `text-4xl`（約48px相当）

---

## 🔗 URL構造

### 現在の構造（Phase 1）

```
/areas/[prefecture]  → 都道府県ページ（47都道府県）
例: /areas/tokyo, /areas/osaka
```

### 将来の構造（Phase 2以降）

```
/gyms/list/[city]  → 市区町村ページ（主要都市）
例: /gyms/list/tokyo-shibuya, /gyms/list/osaka
```

**実装時の判断:**
- Phase 1段階では `/areas/tokyo` 等にリンク
- Phase 2でページ作成後、`/gyms/list/tokyo-shibuya` に変更

**taro判断ポイント:** 現在bestfit-remakeに `/gyms/list/` ルートが実装されているか確認。未実装なら `/areas/[prefecture]` にリンク。

---

## ⚙️ 実装手順（taro向け）

### ステップ1: データ定義

`app/page.tsx`（またはコンポーネントファイル）の冒頭に`popularAreas`配列を定義。

### ステップ2: セクション挿入

既存のTOPページ（`app/page.tsx`）の`<Stats />`と`<TopGyms />`の間に上記セクションを挿入。

### ステップ3: リンク先確認

- `/gyms/list/[city]` ルートが存在するか確認
- 未実装なら `/areas/tokyo` 等の都道府県ページにフォールバック

### ステップ4: レスポンシブ確認

- モバイル（375px）、タブレット（768px）、デスクトップ（1280px）で表示確認

### ステップ5: ホバーエフェクト確認

- カードにマウスオーバーで色変化とエリア名の色変更を確認

---

## ✅ 完成イメージ

```
┌─────────────────────────────────────┐
│   人気エリアから探す                │
│   主要都市のパーソナルジム情報を    │
│   チェック                          │
└─────────────────────────────────────┘

┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐
│🗼  │ │🏙️  │ │🌆  │ │⛵  │ │🏯  │
│東京│ │東京│ │東京│ │横浜│ │大阪│
│渋谷│ │新宿│ │港区│ │    │ │    │
│15店│ │18店│ │16店│ │20店│ │18店│
└────┘ └────┘ └────┘ └────┘ └────┘

┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐
│🏢  │ │🍜  │ │❄️  │ │🌲  │ │⚾  │
│名古│ │福岡│ │札幌│ │仙台│ │広島│
│屋  │ │    │ │    │ │    │ │    │
│12店│ │14店│ │10店│ │8店 │ │9店 │
└────┘ └────┘ └────┘ └────┘ └────┘

      ┌──────────────────┐
      │ 全エリア一覧を見る →│
      └──────────────────┘
```

---

## 📝 注意事項

1. **URL構造の一貫性:** 将来的に `/gyms/list/` に統一する予定。実装時は現状に合わせて調整。
2. **件数の正確性:** saburoの最適化案に記載された件数を使用。実データ導入時に更新。
3. **アクセシビリティ:** リンクには適切な `aria-label` を追加推奨（例: `aria-label="東京・渋谷のパーソナルジム15店舗を見る"`）
4. **パフォーマンス:** 絵文字使用により画像読み込み不要。軽量。

---

## 🚀 完了条件

- [ ] セクションがTOPページに表示される
- [ ] 10都市のカードが正しく配置される
- [ ] リンクが正しく機能する
- [ ] レスポンシブ対応完了（モバイル/タブレット/デスクトップ）
- [ ] ホバーエフェクトが動作する
- [ ] 全エリア一覧リンクが機能する

---

**作成者:** jiro  
**実装担当:** taro  
**期限:** 今週末
