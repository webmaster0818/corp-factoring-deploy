#!/bin/bash
# 週次SEOレポート実行スクリプト（アラート機能付き）

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR/scripts"

echo "🚀 週次SEOレポートプロセス開始"
echo "========================================"
echo ""

# Step 1: データ収集
echo "📊 Step 1: Search Console データ取得"
node fetch-search-console.js
echo ""

echo "📈 Step 2: GA4 データ取得"
node fetch-ga4.js
echo ""

# Step 2: アラートチェック
echo "🚨 Step 3: アラートチェック"
node alert-system.js
echo ""

# Step 3: インサイト分析
echo "💡 Step 4: インサイト分析"
node insights-analyzer.js
echo ""

# Step 4: 推奨アクション生成
echo "🎯 Step 5: 推奨アクション生成"
node recommendations.js
echo ""

# Step 5: レポート生成
echo "📝 Step 6: レポート生成"
node generate-report.js
echo ""

# Step 6: Discord投稿データ準備
echo "📤 Step 7: Discord投稿データ準備"
node discord-reporter.js
echo ""

echo "========================================"
echo "✅ 全プロセス完了！"
echo ""
echo "次のステップ:"
echo "1. discord-posts.json を確認"
echo "2. alerts/ ディレクトリでアラートを確認"
echo "3. Discordへの投稿を実行"
