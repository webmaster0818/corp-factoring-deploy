#!/bin/bash
# ETIAS専用実行スクリプト（認証情報パス完全指定）

export GOOGLE_APPLICATION_CREDENTIALS="/Users/takashi.hasegawa/.openclaw/workspace/google-credentials.json"
cd /Users/takashi.hasegawa/.openclaw/workspace/seo-analytics/scripts

echo "📊 ETIAS SEOデータ取得開始"
echo "認証: $GOOGLE_APPLICATION_CREDENTIALS"
echo ""

node fetch-search-console.js 2>&1 | grep -A 5 "ETIAS"
node fetch-ga4.js 2>&1 | grep -A 5 "ETIAS"
node generate-report.js

echo ""
echo "📄 最新レポート:"
cat ../reports/etias_report_$(date +%Y-%m-%d).md

echo ""
echo "✅ 完了"
