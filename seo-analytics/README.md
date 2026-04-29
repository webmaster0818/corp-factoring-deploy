# 📊 SEO Analytics System

5サイトのSEOデータを自動収集・分析するシステム

## 🎯 機能

### データ収集
- **Google Search Console**
  - 検索クエリ別パフォーマンス
  - ページ別パフォーマンス
  - 国別・デバイス別データ
  - クリック数、表示回数、CTR、掲載順位

- **Google Analytics 4**
  - トラフィックデータ（セッション、ユーザー、PV）
  - ランディングページ分析
  - トラフィックソース分析
  - デバイス・地域別分析
  - オーガニック検索トラフィック

### レポート生成
- サイト別サマリーレポート（Markdown + JSON）
- Search ConsoleとGA4のデータ統合
- トップクエリ・トップページのランキング
- トラフィックソース分析

## 📁 構成

```
seo-analytics/
├── data/              # 収集データ保存ディレクトリ
│   ├── esta/
│   ├── etias/
│   ├── keta/
│   ├── uketa/
│   └── france/
├── reports/           # 生成レポート保存ディレクトリ
├── scripts/           # 実行スクリプト
│   ├── fetch-search-console.js  # Search Consoleデータ取得
│   ├── fetch-ga4.js              # GA4データ取得
│   ├── generate-report.js        # レポート生成
│   └── post-to-discord.js        # Discord投稿
├── run-analysis.sh    # 一括実行スクリプト
└── README.md          # このファイル
```

## 🚀 使い方

### 手動実行

#### 1. 全プロセスを一括実行
```bash
cd ~/.openclaw/workspace/seo-analytics
./run-analysis.sh
```

#### 2. 個別実行

**Search Consoleデータ取得のみ:**
```bash
cd scripts
node fetch-search-console.js
```

**GA4データ取得のみ:**
```bash
cd scripts
node fetch-ga4.js
```

**レポート生成のみ:**
```bash
cd scripts
node generate-report.js
```

### Cron自動実行（設定済み✅）

**日次データ収集（毎日 2:00）**
- Search ConsoleとGA4のデータを自動収集
- エラー時のみ#全体進捗に報告

**週次レポート（毎週月曜 9:00）**
- 全データ収集・分析
- 各サイトチャンネルにレポート投稿
- #分析レポートにサマリー投稿

Cron設定状況の確認:
```bash
# OpenClawのCron一覧を確認
openclaw cron list
```

## 📊 対象サイト

1. **ESTA** (GA4: 524952658)
2. **ETIAS** (etias-eutravel.com, GA4: 457133650)
3. **K-ETA** (keta-travel.com, GA4: 457130558)
4. **UK-ETA** (GA4: 521222088)
5. **フランス** (eudiasporacouncil.org, GA4: 512434829)

## 🔧 設定ファイル

### sites-config.json
サイトの基本情報（ドメイン、GA4プロパティID等）

### google-credentials.json
Google API認証情報（サービスアカウント）

## 📈 レポート例

### Search Console
- 総クリック数、表示回数
- 平均CTR、掲載順位
- トップ検索クエリ（上位10件）
- トップページ（上位5件）

### Google Analytics
- 総セッション数、ユーザー数
- ページビュー、コンバージョン
- 平均セッション時間、直帰率
- トップトラフィックソース

## 🔄 データ更新頻度

- **現在:** 手動実行
- **今後:** 
  - 日次: 毎日夜間にデータ収集
  - 週次: 毎週月曜にレポート生成・Discord投稿
  - 月次: 毎月1日に月次レポート生成

## ✅ 実装済み機能

### データ収集
- ✅ Search Console API連携
- ✅ GA4 API連携
- ✅ 日次自動データ収集（毎日2:00）

### レポート
- ✅ サイト別詳細レポート（Markdown + JSON）
- ✅ 全体サマリーレポート
- ✅ Discord自動投稿
- ✅ 週次自動レポート（毎週月曜9:00）

### アラート機能
- ✅ 順位変動アラート（5位以上下落で警告、10位以上で重大）
- ✅ トラフィック異常検知（前週比20%減で警告）
- ✅ Search Consoleパフォーマンス低下検知
- ✅ ポジティブアラート（改善検知）

### インサイト分析
- ✅ キーワード機会分析（順位4-20位の改善余地あるクエリ）
- ✅ CTR改善提案（上位表示でもCTRが低いクエリ）
- ✅ トラフィックトレンド分析
- ✅ ページパフォーマンス分析

### 推奨アクション生成
- ✅ タイトル・メタディスクリプション最適化提案
- ✅ コンテンツ品質向上提案
- ✅ 内部リンク最適化提案
- ✅ モバイルUX改善提案
- ✅ テクニカルSEO最適化提案
- ✅ 優先度スコアリング（影響度 × 工数）

## 📝 今後の拡張案

- [ ] コンテンツギャップ分析（競合との比較）
- [ ] 競合サイト分析
- [ ] キーワードクラスタリング
- [ ] 季節性トレンド分析
- [ ] 予測モデリング（機械学習）
- [ ] A/Bテスト影響分析

## 🛠 トラブルシューティング

### エラー: "API が有効ではありません"
→ Google Cloud Platformで該当APIを有効化してください

### エラー: "権限がありません"
→ サービスアカウントに各サイトで権限付与されているか確認してください

### データが取得できない
→ `sites-config.json`のプロパティIDとSearch Console URLを確認してください
