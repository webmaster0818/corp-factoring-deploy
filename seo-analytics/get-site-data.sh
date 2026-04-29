#!/bin/bash
# サイト別データ取得スクリプト
# 使い方: ./get-site-data.sh [esta|etias|keta|uketa|france]

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR/scripts"

SITE_ID="$1"

if [ -z "$SITE_ID" ]; then
  echo "使い方: ./get-site-data.sh [esta|etias|keta|uketa|france]"
  exit 1
fi

# サイトIDの検証
case "$SITE_ID" in
  esta|etias|keta|uketa|france)
    ;;
  *)
    echo "エラー: 無効なサイトID: $SITE_ID"
    echo "有効な値: esta, etias, keta, uketa, france"
    exit 1
    ;;
esac

echo "📊 ${SITE_ID} のデータ取得開始"
echo "================================"
echo ""

# 環境変数設定（念のため）
export GOOGLE_APPLICATION_CREDENTIALS="$SCRIPT_DIR/../google-credentials.json"

echo "🔍 Search Console データ取得中..."
node fetch-search-console.js 2>&1 | grep -A 10 "🔍 ${SITE_ID^^}"

echo ""
echo "📈 GA4 データ取得中..."
node fetch-ga4.js 2>&1 | grep -A 10 "🔍 ${SITE_ID^^}"

echo ""
echo "================================"
echo "✅ ${SITE_ID} のデータ取得完了"
echo ""
echo "データ保存先:"
echo "  $SCRIPT_DIR/data/${SITE_ID}/"
