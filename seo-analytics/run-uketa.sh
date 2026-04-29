#!/bin/bash
# UK-ETA専用実行スクリプト（認証情報パス完全指定）

# 認証情報を環境変数で明示的に設定
export GOOGLE_APPLICATION_CREDENTIALS="/Users/takashi.hasegawa/.openclaw/workspace/google-credentials.json"

# スクリプトディレクトリに移動
cd /Users/takashi.hasegawa/.openclaw/workspace/seo-analytics/scripts

echo "📊 UK-ETA SEOデータ取得開始"
echo "================================"
echo "認証: $GOOGLE_APPLICATION_CREDENTIALS"
echo ""

# データ取得
node fetch-search-console.js 2>&1 | grep -A 5 "UK-ETA"
node fetch-ga4.js 2>&1 | grep -A 5 "UK-ETA"

# レポート生成
node generate-report.js

# レポート表示
echo ""
echo "📄 最新レポート:"
echo "================================"
cat ../reports/uketa_report_$(date +%Y-%m-%d).md

echo ""
echo "✅ 完了"
