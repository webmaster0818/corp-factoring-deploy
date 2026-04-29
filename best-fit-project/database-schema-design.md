# データベース設計 - BEST-FIT

**作成日:** 2026年3月26日  
**担当:** jiro（バックエンド・API）  
**プロジェクト:** bestfit-remake

---

## 📋 概要

BEST-FITサイトの `/gyms/list/` 動的ページ生成に必要なデータベーススキーマを設計します。

**目標:**
- 全国1,503市区町村のページを動的生成
- 1,000店舗以上のパーソナルジム情報を管理
- SEO最適化データ（タイトル、description、H1）を保持
- スケーラブルで保守性の高い設計

---

## 🗄️ データベース選択

### 推奨: **PostgreSQL**（または互換のSupabase）

**理由:**
1. Vercel無料プランと相性が良い（Vercel Postgres / Supabase）
2. リレーショナルデータベース（都市↔ジムの関連管理が容易）
3. JSON型サポート（柔軟なメタデータ保存）
4. 全文検索機能
5. Next.jsとの統合が簡単

**代替案:**
- Supabase（PostgreSQL互換、無料プラン月50MB）
- PlanetScale（MySQL互換、無料プラン月1GB）
- Prisma + Vercel Postgres

---

## 📊 スキーマ設計

### 1. Prefectures（都道府県テーブル）

| カラム名 | 型 | 制約 | 説明 |
|---------|-----|------|------|
| `id` | SERIAL | PRIMARY KEY | 都道府県ID（1-47） |
| `name` | VARCHAR(20) | NOT NULL, UNIQUE | 都道府県名（例: 東京都） |
| `slug` | VARCHAR(50) | NOT NULL, UNIQUE | URLスラッグ（例: tokyo） |
| `region` | VARCHAR(20) | NOT NULL | 地方区分（例: 関東） |
| `gym_count` | INTEGER | DEFAULT 0 | 都道府県内のジム総数 |
| `city_count` | INTEGER | DEFAULT 0 | 市区町村数 |
| `created_at` | TIMESTAMP | DEFAULT NOW() | 作成日時 |
| `updated_at` | TIMESTAMP | DEFAULT NOW() | 更新日時 |

**インデックス:**
```sql
CREATE INDEX idx_prefectures_slug ON prefectures(slug);
CREATE INDEX idx_prefectures_region ON prefectures(region);
```

**サンプルデータ:**
```sql
INSERT INTO prefectures (id, name, slug, region) VALUES
  (1, '北海道', 'hokkaido', '北海道'),
  (13, '東京都', 'tokyo', '関東'),
  (27, '大阪府', 'osaka', '近畿');
```

---

### 2. Cities（市区町村テーブル）

| カラム名 | 型 | 制約 | 説明 |
|---------|-----|------|------|
| `id` | SERIAL | PRIMARY KEY | 市区町村ID |
| `prefecture_id` | INTEGER | NOT NULL, FK → prefectures(id) | 都道府県ID |
| `name` | VARCHAR(50) | NOT NULL | 市区町村名（例: 渋谷区） |
| `full_name` | VARCHAR(100) | NOT NULL | 完全名称（例: 東京都渋谷区） |
| `slug` | VARCHAR(100) | NOT NULL, UNIQUE | URLスラッグ（例: tokyo-shibuya） |
| `gym_count` | INTEGER | DEFAULT 0 | 市区町村内のジム総数 |
| `population` | INTEGER | NULL | 人口（オプション） |
| `major_stations` | TEXT[] | NULL | 主要駅リスト（例: ['渋谷駅', '恵比寿駅']） |
| `latitude` | DECIMAL(10, 8) | NULL | 緯度（オプション） |
| `longitude` | DECIMAL(11, 8) | NULL | 経度（オプション） |
| `seo_title` | VARCHAR(200) | NULL | SEOタイトル |
| `seo_description` | TEXT | NULL | SEO description |
| `seo_h1` | VARCHAR(200) | NULL | SEO H1 |
| `priority` | VARCHAR(1) | DEFAULT 'C' | 優先度（A/B/C） |
| `content_length` | INTEGER | DEFAULT 0 | コンテンツ文字数 |
| `is_published` | BOOLEAN | DEFAULT FALSE | 公開状態 |
| `created_at` | TIMESTAMP | DEFAULT NOW() | 作成日時 |
| `updated_at` | TIMESTAMP | DEFAULT NOW() | 更新日時 |

**インデックス:**
```sql
CREATE INDEX idx_cities_prefecture_id ON cities(prefecture_id);
CREATE INDEX idx_cities_slug ON cities(slug);
CREATE INDEX idx_cities_priority ON cities(priority);
CREATE INDEX idx_cities_is_published ON cities(is_published);
```

**サンプルデータ:**
```sql
INSERT INTO cities (prefecture_id, name, full_name, slug, gym_count, major_stations, seo_title, seo_description, seo_h1, priority) VALUES
  (13, '渋谷区', '東京都渋谷区', 'tokyo-shibuya', 15, ARRAY['渋谷駅', '恵比寿駅'], 
   '渋谷区のパーソナルジム15選【2026年最新】料金・口コミを徹底比較｜BEST-FIT',
   '渋谷区のパーソナルジム全15店舗を徹底比較。RIZAP、24/7Workout、BEYONDなど人気ジムの料金・口コミ・アクセスを掲載。渋谷駅・恵比寿駅から通えるジムをお探しの方へ。',
   '渋谷区のパーソナルジム15選【2026年最新】',
   'A');
```

---

### 3. Gyms（ジムテーブル）

| カラム名 | 型 | 制約 | 説明 |
|---------|-----|------|------|
| `id` | SERIAL | PRIMARY KEY | ジムID |
| `city_id` | INTEGER | NOT NULL, FK → cities(id) | 市区町村ID |
| `brand_id` | INTEGER | NULL, FK → brands(id) | ブランドID（オプション） |
| `name` | VARCHAR(200) | NOT NULL | ジム名 |
| `slug` | VARCHAR(200) | NOT NULL, UNIQUE | URLスラッグ |
| `full_address` | TEXT | NOT NULL | 完全住所 |
| `postal_code` | VARCHAR(8) | NULL | 郵便番号 |
| `nearest_station` | VARCHAR(100) | NULL | 最寄り駅 |
| `access_info` | TEXT | NULL | アクセス情報 |
| `latitude` | DECIMAL(10, 8) | NULL | 緯度 |
| `longitude` | DECIMAL(11, 8) | NULL | 経度 |
| `phone` | VARCHAR(20) | NULL | 電話番号 |
| `website_url` | TEXT | NULL | 公式サイトURL |
| `price_min` | INTEGER | NULL | 最低料金（月額） |
| `price_max` | INTEGER | NULL | 最高料金（月額） |
| `price_avg` | INTEGER | NULL | 平均料金（月額） |
| `trial_available` | BOOLEAN | DEFAULT FALSE | 無料体験あり |
| `trial_price` | INTEGER | NULL | 体験料金 |
| `features` | TEXT[] | NULL | 特徴リスト（例: ['完全個室', '女性専用', '食事指導']） |
| `rating_avg` | DECIMAL(3, 2) | DEFAULT 0.00 | 平均評価（0.00-5.00） |
| `review_count` | INTEGER | DEFAULT 0 | レビュー数 |
| `description` | TEXT | NULL | 紹介文 |
| `seo_title` | VARCHAR(200) | NULL | SEOタイトル |
| `seo_description` | TEXT | NULL | SEO description |
| `image_url` | TEXT | NULL | メイン画像URL |
| `is_featured` | BOOLEAN | DEFAULT FALSE | おすすめ表示 |
| `is_published` | BOOLEAN | DEFAULT FALSE | 公開状態 |
| `display_order` | INTEGER | DEFAULT 999 | 表示順序 |
| `created_at` | TIMESTAMP | DEFAULT NOW() | 作成日時 |
| `updated_at` | TIMESTAMP | DEFAULT NOW() | 更新日時 |

**インデックス:**
```sql
CREATE INDEX idx_gyms_city_id ON gyms(city_id);
CREATE INDEX idx_gyms_brand_id ON gyms(brand_id);
CREATE INDEX idx_gyms_slug ON gyms(slug);
CREATE INDEX idx_gyms_is_published ON gyms(is_published);
CREATE INDEX idx_gyms_is_featured ON gyms(is_featured);
CREATE INDEX idx_gyms_display_order ON gyms(display_order);
CREATE INDEX idx_gyms_rating_avg ON gyms(rating_avg DESC);
```

**サンプルデータ:**
```sql
INSERT INTO gyms (city_id, brand_id, name, slug, full_address, nearest_station, price_avg, trial_available, features, rating_avg, review_count, is_featured) VALUES
  (1, 1, 'RIZAP 渋谷店', 'rizap-shibuya', '東京都渋谷区渋谷1-1-1', '渋谷駅', 327800, TRUE, ARRAY['完全個室', '食事指導', '返金保証'], 4.50, 120, TRUE);
```

---

### 4. Brands（ブランドテーブル）

| カラム名 | 型 | 制約 | 説明 |
|---------|-----|------|------|
| `id` | SERIAL | PRIMARY KEY | ブランドID |
| `name` | VARCHAR(100) | NOT NULL, UNIQUE | ブランド名（例: RIZAP） |
| `slug` | VARCHAR(100) | NOT NULL, UNIQUE | URLスラッグ（例: rizap） |
| `official_url` | TEXT | NULL | 公式サイトURL |
| `logo_url` | TEXT | NULL | ロゴ画像URL |
| `description` | TEXT | NULL | ブランド説明 |
| `nationwide_count` | INTEGER | DEFAULT 0 | 全国店舗数 |
| `avg_price` | INTEGER | NULL | 平均料金 |
| `seo_title` | VARCHAR(200) | NULL | SEOタイトル |
| `seo_description` | TEXT | NULL | SEO description |
| `is_major` | BOOLEAN | DEFAULT FALSE | 主要ブランド |
| `display_order` | INTEGER | DEFAULT 999 | 表示順序 |
| `created_at` | TIMESTAMP | DEFAULT NOW() | 作成日時 |
| `updated_at` | TIMESTAMP | DEFAULT NOW() | 更新日時 |

**インデックス:**
```sql
CREATE INDEX idx_brands_slug ON brands(slug);
CREATE INDEX idx_brands_is_major ON brands(is_major);
```

**サンプルデータ:**
```sql
INSERT INTO brands (name, slug, nationwide_count, avg_price, is_major, display_order) VALUES
  ('RIZAP', 'rizap', 120, 327800, TRUE, 1),
  ('24/7Workout', '24-7-workout', 80, 215600, TRUE, 2),
  ('BEYOND', 'beyond', 60, 281600, TRUE, 3);
```

---

### 5. Reviews（レビューテーブル）

| カラム名 | 型 | 制約 | 説明 |
|---------|-----|------|------|
| `id` | SERIAL | PRIMARY KEY | レビューID |
| `gym_id` | INTEGER | NOT NULL, FK → gyms(id) | ジムID |
| `user_name` | VARCHAR(100) | NOT NULL | 投稿者名 |
| `rating` | INTEGER | NOT NULL, CHECK (rating >= 1 AND rating <= 5) | 評価（1-5） |
| `title` | VARCHAR(200) | NULL | レビュータイトル |
| `content` | TEXT | NOT NULL | レビュー本文 |
| `pros` | TEXT | NULL | 良かった点 |
| `cons` | TEXT | NULL | 悪かった点 |
| `age_range` | VARCHAR(20) | NULL | 年齢層（例: 30代） |
| `gender` | VARCHAR(10) | NULL | 性別（男性/女性/その他） |
| `duration_months` | INTEGER | NULL | 利用期間（月数） |
| `verified` | BOOLEAN | DEFAULT FALSE | 認証済み |
| `is_published` | BOOLEAN | DEFAULT FALSE | 公開状態 |
| `created_at` | TIMESTAMP | DEFAULT NOW() | 投稿日時 |
| `updated_at` | TIMESTAMP | DEFAULT NOW() | 更新日時 |

**インデックス:**
```sql
CREATE INDEX idx_reviews_gym_id ON reviews(gym_id);
CREATE INDEX idx_reviews_rating ON reviews(rating);
CREATE INDEX idx_reviews_is_published ON reviews(is_published);
CREATE INDEX idx_reviews_created_at ON reviews(created_at DESC);
```

---

## 🔗 リレーション図

```
prefectures (1) ─────< cities (N)
                         │
                         │
                         │ (1)
                         │
                         ↓
                      gyms (N) >───── (N) brands (1)
                         │
                         │ (1)
                         │
                         ↓
                      reviews (N)
```

---

## 📐 データサイズ見積もり

### 想定レコード数

| テーブル | レコード数 | 備考 |
|---------|-----------|------|
| `prefectures` | 47 | 47都道府県 |
| `cities` | 1,503 | 全国市区町村 |
| `gyms` | 1,000〜5,000 | 初期1,000店舗 |
| `brands` | 50〜100 | 主要ブランド |
| `reviews` | 5,000〜50,000 | ジムあたり平均5-50件 |

### ストレージ見積もり

- **prefectures:** 47行 × 1KB = 約47KB
- **cities:** 1,503行 × 2KB = 約3MB
- **gyms:** 5,000行 × 5KB = 約25MB
- **brands:** 100行 × 3KB = 約300KB
- **reviews:** 50,000行 × 2KB = 約100MB

**合計:** 約130MB（十分に無料プランで収まる）

---

## 🚀 実装ステップ

### Phase 1: テーブル作成（今週）

1. **PostgreSQL/Supabase環境準備**
   - Supabaseプロジェクト作成（または Vercel Postgres）
   - 接続情報を環境変数に設定

2. **マイグレーションファイル作成**
   ```sql
   -- migrations/001_create_tables.sql
   CREATE TABLE prefectures (...);
   CREATE TABLE cities (...);
   CREATE TABLE brands (...);
   CREATE TABLE gyms (...);
   CREATE TABLE reviews (...);
   ```

3. **初期データ投入**
   - 47都道府県データ投入
   - saburoの最適化案から優先度A（5都市）データ作成
   - 主要ブランド（RIZAP、24/7Workout、BEYONDなど）登録

### Phase 2: API実装（来週）

1. **Next.js API Routes作成**
   - `GET /api/cities` - 都市一覧取得
   - `GET /api/cities/[slug]` - 都市詳細取得
   - `GET /api/gyms?city=[slug]` - 都市別ジム一覧取得
   - `GET /api/gyms/[slug]` - ジム詳細取得

2. **ORM導入（Prisma推奨）**
   ```prisma
   model City {
     id Int @id @default(autoincrement())
     prefectureId Int
     name String
     slug String @unique
     // ...
     prefecture Prefecture @relation(fields: [prefectureId], references: [id])
     gyms Gym[]
   }
   ```

### Phase 3: 動的ページ統合（2週目）

1. **`/gyms/list/[slug]/page.tsx` 実装**
   - `generateStaticParams()` で全1,503市区町村のパスを生成
   - API経由でデータ取得
   - saburoの最適化案（タイトル、description、H1）を反映

---

## ✅ 品質チェックリスト

- [ ] すべてのテーブルに `created_at`, `updated_at` が存在
- [ ] 外部キー制約が正しく設定されている
- [ ] 必要なインデックスが作成されている
- [ ] 全テーブルに適切な主キーが存在
- [ ] NULL許可/NOT NULL制約が適切
- [ ] データ型が適切（VARCHAR長、DECIMAL精度など）
- [ ] サンプルデータが正常に挿入できる
- [ ] リレーションが正しく機能する

---

## 📝 次のステップ

1. **tomomiレビュー** - このスキーマ設計の承認を得る
2. **環境準備** - Supabase/Vercel Postgres環境構築
3. **マイグレーション実行** - テーブル作成
4. **初期データ投入** - 47都道府県 + 優先度A 5都市
5. **API実装開始** - Phase 2へ

---

**作成者:** jiro  
**レビュー待ち:** tomomi  
**期限:** 今週末
