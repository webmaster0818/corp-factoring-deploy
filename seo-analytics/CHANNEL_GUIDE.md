# 📊 各サイトチャンネルでのデータ取得方法

各サイトのチャンネル（#esta、#etias、#k-eta、#uk-eta、#france）で、そのサイトのSEOデータを取得する方法です。

**重要:** 認証情報は既に設定済みです。追加の認証設定は不要です。

---

## 🚀 簡単な使い方

### 方法1: サイト専用スクリプト

各チャンネルで以下を実行：

```bash
cd ~/.openclaw/workspace/seo-analytics
./get-site-data.sh [サイトID]
```

**サイトID一覧:**
- `esta` - ESTAサイト
- `etias` - ETIASサイト
- `keta` - K-ETAサイト
- `uketa` - UK-ETAサイト
- `france` - フランスサイト

**例（#k-etaチャンネルで）:**
```bash
cd ~/.openclaw/workspace/seo-analytics
./get-site-data.sh keta
```

---

### 方法2: 個別スクリプト実行

**Search Consoleデータのみ:**
```bash
cd ~/.openclaw/workspace/seo-analytics/scripts
node fetch-search-console.js
```

**GA4データのみ:**
```bash
cd ~/.openclaw/workspace/seo-analytics/scripts
node fetch-ga4.js
```

**レポート生成:**
```bash
cd ~/.openclaw/workspace/seo-analytics/scripts
node generate-report.js
```

---

## 📋 各チャンネルでの推奨コマンド

### #esta チャンネル
```bash
cd ~/.openclaw/workspace/seo-analytics && ./get-site-data.sh esta
```

### #etias チャンネル
```bash
cd ~/.openclaw/workspace/seo-analytics && ./get-site-data.sh etias
```

### #k-eta チャンネル
```bash
cd ~/.openclaw/workspace/seo-analytics && ./get-site-data.sh keta
```

### #uk-eta チャンネル
```bash
cd ~/.openclaw/workspace/seo-analytics && ./get-site-data.sh uketa
```

### #france チャンネル
```bash
cd ~/.openclaw/workspace/seo-analytics && ./get-site-data.sh france
```

---

## 🔍 レポート確認

データ取得後、レポートを確認：

```bash
# 最新のMarkdownレポート
cat ~/.openclaw/workspace/seo-analytics/reports/[サイトID]_report_$(date +%Y-%m-%d).md

# 最新のJSONレポート
cat ~/.openclaw/workspace/seo-analytics/reports/[サイトID]_report_$(date +%Y-%m-%d).json
```

**例（K-ETAの場合）:**
```bash
cat ~/.openclaw/workspace/seo-analytics/reports/keta_report_$(date +%Y-%m-%d).md
```

---

## 📊 インサイト・推奨アクション確認

**インサイト:**
```bash
cat ~/.openclaw/workspace/seo-analytics/insights/insights_$(date +%Y-%m-%d).json
```

**推奨アクション:**
```bash
cat ~/.openclaw/workspace/seo-analytics/recommendations/recommendations_$(date +%Y-%m-%d).json
```

---

## ⚠️ トラブルシューティング

### 「認証エラー」が出る場合

認証情報のパスを明示的に設定：

```bash
export GOOGLE_APPLICATION_CREDENTIALS=~/.openclaw/workspace/google-credentials.json
cd ~/.openclaw/workspace/seo-analytics/scripts
node fetch-search-console.js
```

### 「ファイルが見つからない」エラー

ワーキングディレクトリを確認：

```bash
pwd
# /Users/takashi.hasegawa/.openclaw/workspace 以下にいることを確認
```

必要に応じて移動：

```bash
cd ~/.openclaw/workspace/seo-analytics
```

---

## 🤖 Bot（taro、jiro、saburo）への指示例

各チャンネルでbotに以下のように指示できます：

**K-ETAチャンネルで:**
```
@taro K-ETAのSEOデータを取得して最新レポートを投稿してください。
コマンド: cd ~/.openclaw/workspace/seo-analytics && ./get-site-data.sh keta && node scripts/generate-report.js
レポートは reports/keta_report_[日付].md にあります。
```

**または簡潔に:**
```
@taro ./seo-analytics/get-site-data.sh keta を実行して、最新レポートを投稿
```

---

## 📝 注意事項

- **認証情報は共有:** 全bot（tomomi、taro、jiro、saburo）が同じGoogle認証を使用
- **データは共有ディレクトリ:** `~/.openclaw/workspace/seo-analytics/data/` に保存
- **追加認証不要:** 既に設定済みなので、再度認証する必要はありません

---

## 🔄 自動実行スケジュール

手動実行しなくても、以下のスケジュールで自動実行されます：

- **日次:** 毎日 2:00 AM - データ収集のみ
- **週次:** 毎週月曜 9:00 AM - データ収集+分析+レポート投稿

自動実行の結果は各チャンネルに投稿されます。
