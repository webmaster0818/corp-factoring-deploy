# ⚡ クイックスタート - 各チャンネル用

**重要:** Google API認証は既に完了しています。追加設定は不要です。

---

## 🚨 Bot（tomomi/taro/jiro/saburo）への指示

各サイトチャンネルでbotに依頼する時は、以下のコマンドを **そのまま実行** してもらってください：

### #esta チャンネル
```bash
cd ~/.openclaw/workspace/seo-analytics/scripts && node fetch-search-console.js && node fetch-ga4.js && node generate-report.js && cat ../reports/esta_report_$(date +%Y-%m-%d).md
```

### #etias チャンネル
```bash
cd ~/.openclaw/workspace/seo-analytics/scripts && node fetch-search-console.js && node fetch-ga4.js && node generate-report.js && cat ../reports/etias_report_$(date +%Y-%m-%d).md
```

### #k-eta チャンネル
```bash
cd ~/.openclaw/workspace/seo-analytics/scripts && node fetch-search-console.js && node fetch-ga4.js && node generate-report.js && cat ../reports/keta_report_$(date +%Y-%m-%d).md
```

### #uk-eta チャンネル
```bash
cd ~/.openclaw/workspace/seo-analytics/scripts && node fetch-search-console.js && node fetch-ga4.js && node generate-report.js && cat ../reports/uketa_report_$(date +%Y-%m-%d).md
```

### #france チャンネル
```bash
cd ~/.openclaw/workspace/seo-analytics/scripts && node fetch-search-console.js && node fetch-ga4.js && node generate-report.js && cat ../reports/france_report_$(date +%Y-%m-%d).md
```

---

## 📝 Bot指示の例文

**悪い例（これだとbotが新規セットアップを説明してしまう）:**
```
データを取得して
```

**良い例（具体的なコマンドを指示）:**
```
以下のコマンドを実行してレポートを投稿してください：
cd ~/.openclaw/workspace/seo-analytics/scripts && node fetch-search-console.js && node fetch-ga4.js && node generate-report.js && cat ../reports/esta_report_$(date +%Y-%m-%d).md
```

---

## ⚠️ 認証について

- **認証は完了済み:** `~/.openclaw/workspace/google-credentials.json` に保存済み
- **APIキーやOAuthは不要:** サービスアカウント認証を使用
- **全bot共通:** tomomi、taro、jiro、saburoは全て同じ認証を使用

---

## 🔧 トラブルシューティング

もしエラーが出る場合：

```bash
export GOOGLE_APPLICATION_CREDENTIALS=~/.openclaw/workspace/google-credentials.json
cd ~/.openclaw/workspace/seo-analytics/scripts
node fetch-search-console.js
```

---

## 📊 データ確認

最新のレポートを確認：

```bash
ls -lt ~/.openclaw/workspace/seo-analytics/reports/
```

レポートを表示：

```bash
cat ~/.openclaw/workspace/seo-analytics/reports/[サイトID]_report_[日付].md
```
