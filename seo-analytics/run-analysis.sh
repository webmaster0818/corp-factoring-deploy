#!/bin/bash
# SEO分析実行スクリプト

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR/scripts"

echo "🚀 SEO分析プロセス開始"
echo "================================"
echo ""

echo "📊 Step 1: Search Console データ取得"
node fetch-search-console.js
echo ""

echo "📈 Step 2: GA4 データ取得"
node fetch-ga4.js
echo ""

echo "📝 Step 3: レポート生成"
node generate-report.js
echo ""

echo "================================"
echo "✅ 全プロセス完了！"
echo ""
echo "レポートは以下に保存されています:"
echo "$SCRIPT_DIR/reports/"
