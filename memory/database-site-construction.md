# データベース型サイト構築 完全ガイド

**作成日:** 2026-03-06
**対象:** BEST-FIT（パーソナルジムポータルサイト）
**前提:** SEO最優先、WordPress使用

---

## 推奨技術スタック

| レイヤー | Phase 1（今すぐ） | Phase 2（半年後） | Phase 3（1年後） |
|---------|----------------|----------------|----------------|
| **CMS** | WordPress | WordPress | Headless CMS |
| **フロントエンド** | WordPress（SSR） | Next.js（SSG/ISR） | Next.js（SSG/ISR） |
| **データベース** | MySQL | MySQL | PostgreSQL |
| **ホスティング** | レンタルサーバー | Vercel | Vercel Pro |
| **月額コスト** | 1,000円〜 | 2,000円〜 | 10,000円〜 |
| **対応ページ数** | 〜1,000 | 〜10,000 | 20万+ |

---

## Phase 1: WordPress構築（今すぐ）

### 1. 必要なプラグイン

1. **Advanced Custom Fields Pro** - カスタムフィールド管理
2. **Yoast SEO** - SEO最適化、sitemap.xml自動生成
3. **WP Super Cache** - ページキャッシュ
4. **Imagify** - 画像最適化

### 2. データベース設計

#### Custom Post Type

**gym（ジム情報）:**
```php
register_post_type('gym', array(
  'labels' => array('name' => 'ジム'),
  'public' => true,
  'has_archive' => true,
  'menu_icon' => 'dashicons-building',
  'supports' => array('title', 'editor', 'thumbnail'),
  'show_in_rest' => true
));
```

**カスタムフィールド:**
- gym_name（ジム名）
- price_2month（2ヶ月料金）
- access（アクセス）
- rating（評価）
- review_count（口コミ数）

---

**area_article（エリア記事）:**
```php
register_post_type('area_article', array(
  'labels' => array('name' => 'エリア記事'),
  'public' => true,
  'rewrite' => array('slug' => '%prefecture%/%area%'),
  'show_in_rest' => true
));
```

**カスタムフィールド:**
- prefecture（都道府県）
- area_name（エリア名）
- curated_gyms（厳選ジム17選）- relationship
- supervisor（監修者）
- update_date（更新日）

---

#### タクソノミー

```php
register_taxonomy('area', array('gym'), array('hierarchical' => true));
register_taxonomy('features', array('gym'), array('hierarchical' => false));
```

---

### 3. テンプレートファイル

**single-area_article.php（エリア記事）:**
- ヘッダー（h1タイトル、更新日）
- 監修者情報
- イントロ（会話調）
- 厳選ジム17選（foreach curated_gyms）
- こだわり別（WP_Query で料金順等）
- FAQ
- 構造化データ（Article型）

**single-gym.php（ジム詳細）:**
- パンくずリスト
- ヘッダー（h1タイトル、評価）
- 基本情報テーブル
- 口コミ
- 関連ジム
- 構造化データ（LocalBusiness型）

**archive-gym.php（ジム一覧）:**
- フィルターUI（料金、評価でソート）
- ジムリスト（WP_Query）
- ページネーション

---

### 4. SEO最適化

**構造化データ（自動生成）:**
```php
function add_schema_markup() {
  if (is_singular('area_article')) {
    $schema = array(
      '@context' => 'https://schema.org',
      '@type' => 'Article',
      'headline' => get_the_title(),
      'dateModified' => get_the_modified_date('c'),
      'author' => array('@type' => 'Person', 'name' => get_field('supervisor'))
    );
    echo '<script type="application/ld+json">' . json_encode($schema) . '</script>';
  }
}
add_action('wp_head', 'add_schema_markup');
```

**sitemap.xml（Yoast SEO）:**
- 設定 > XMLサイトマップ > 有効
- gym, area_article を有効化
- Google Search Console に登録

**メタタグ（自動生成）:**
```php
function auto_meta_tags() {
  if (is_singular('area_article')) {
    $area = get_field('area_name');
    echo '<meta name="description" content="' . $area . 'のパーソナルジムおすすめ17選。料金相場、選び方、口コミを徹底解説。">';
  }
}
add_action('wp_head', 'auto_meta_tags');
```

---

### 5. パフォーマンス最適化

**キャッシュ（WP Super Cache）:**
```php
// wp-config.php
define('WP_CACHE', true);
```
- 設定: ページキャッシュ有効、3600秒
- 効果: サーバー負荷95%削減

**データベース最適化:**
```sql
ALTER TABLE wp_postmeta ADD INDEX meta_key_value (meta_key, meta_value(10));
```
- 効果: クエリ速度10倍

**画像最適化:**
```php
// Lazy Load
function add_lazy_loading($content) {
  return str_replace('<img', '<img loading="lazy"', $content);
}
add_filter('the_content', 'add_lazy_loading');
```
- WebP変換（.htaccess）
- 効果: 画像サイズ70%削減

**CDN（Cloudflare）:**
- DNS設定、キャッシュ設定
- 効果: サーバー負荷80%削減

---

## Phase 2: WordPress + Next.js（半年後）

### アーキテクチャ

```
[WordPress] 管理画面・データ
    ↓ REST API
[Next.js] フロントエンド
    ↓ SSG + ISR
[静的HTML] 超高速配信
```

### Next.js 実装例

```javascript
// pages/[prefecture]/[area].js
export async function getStaticProps({ params }) {
  // WordPress REST API からデータ取得
  const res = await fetch(
    `https://best-fit.jp/wp-json/wp/v2/area_article?slug=${params.area}`
  );
  const data = await res.json();
  
  return {
    props: { data },
    revalidate: 3600 // 1時間ごとに再生成（ISR）
  };
}

export async function getStaticPaths() {
  const res = await fetch('https://best-fit.jp/wp-json/wp/v2/area_article');
  const areas = await res.json();
  
  const paths = areas.map(area => ({
    params: { prefecture: area.prefecture, area: area.slug }
  }));
  
  return { paths, fallback: 'blocking' };
}
```

---

## SEO最優先の原則

### やるべきこと ✅

1. **SSR/SSG使用** - 完全なHTMLを配信
2. **構造化データ** - Article, LocalBusiness
3. **sitemap.xml** - 自動生成・更新
4. **Core Web Vitals** - LCP < 2.5s, INP < 200ms, CLS < 0.1
5. **階層的URL** - /tokyo/shibuya/
6. **カノニカルURL** - パラメータ付きURLは正規化
7. **キャッシュ** - ページ、オブジェクト、CDN

### やってはいけないこと ❌

1. **CSR（Client-Side Rendering）** - JavaScriptのみでレンダリング
2. **URLパラメータ依存** - ?area=shibuya 形式
3. **画像テキスト** - テキストを画像化
4. **過度なJavaScript** - Core Web Vitals悪化
5. **重複コンテンツ** - canonical未設定

---

## pas0na.com から学んだ成功パターン

1. ✅ **WordPressで十分に成功できる**
2. ✅ **Custom Post Type + カスタムフィールド**
3. ✅ **SSRで完全なHTML配信**
4. ✅ **構造化データの自動生成**
5. ✅ **管理画面で簡単運用**
6. ✅ **会話調トーン**（UI/UX）
7. ✅ **監修者情報の明記**（E-E-A-T）

---

## 構築チェックリスト

### 環境構築
- [ ] レンタルサーバー契約
- [ ] WordPress インストール
- [ ] 必要プラグインのインストール
- [ ] テーマ作成

### データベース
- [ ] Custom Post Type 登録（gym, area_article）
- [ ] カスタムフィールド設定（ACF）
- [ ] タクソノミー登録（area, features）

### テンプレート
- [ ] single-area_article.php 作成
- [ ] single-gym.php 作成
- [ ] archive-gym.php 作成
- [ ] header.php, footer.php 作成

### SEO対策
- [ ] 構造化データ実装
- [ ] sitemap.xml 設定（Yoast SEO）
- [ ] メタタグ自動生成
- [ ] robots.txt 設定
- [ ] Google Search Console 登録

### パフォーマンス
- [ ] WP Super Cache 設定
- [ ] 画像最適化（Imagify）
- [ ] データベースインデックス追加
- [ ] Cloudflare CDN 設定

### コンテンツ
- [ ] テストデータ投稿（ジム10件）
- [ ] エリア記事作成（渋谷）
- [ ] 動作確認
- [ ] 本番データ投稿開始

---

## トラブルシューティング

### 問題: ページが遅い
- 原因: キャッシュ未設定、画像未最適化
- 解決: WP Super Cache有効化、Imagify導入

### 問題: Google にインデックスされない
- 原因: sitemap.xml未登録、robots.txt ブロック
- 解決: Yoast SEO設定確認、Google Search Console登録

### 問題: カスタムフィールドが表示されない
- 原因: ACF設定ミス、テンプレート記述ミス
- 解決: location設定確認、get_field() 記述確認

### 問題: URLが404エラー
- 原因: パーマリンク未更新
- 解決: 設定 > パーマリンク設定 > 保存

---

**更新日:** 2026-03-06
**次回更新予定:** Phase 2移行時
