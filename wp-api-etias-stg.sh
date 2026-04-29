#!/bin/bash
# WordPress REST API - stg.etias-eutravel.com（ステージング）
# Application Password認証（サーバーBasic認証OFF）

SITE_URL="https://stg.etias-eutravel.com"
WP_USER="morimisaki"
WP_PASS="X2sZrWQWppfMloyYnJNMLNZm"  # Application Password (STG)

# 記事一覧取得
get_posts() {
  curl -s -u "${WP_USER}:${WP_PASS}" \
    "${SITE_URL}/wp-json/wp/v2/posts?per_page=${1:-10}"
}

# 記事作成
create_post() {
  curl -s -u "${WP_USER}:${WP_PASS}" \
    -H "Content-Type: application/json" \
    -X POST "${SITE_URL}/wp-json/wp/v2/posts" \
    -d "{\"title\":\"$1\",\"content\":\"$2\",\"status\":\"${3:-draft}\"}"
}

# 記事更新
update_post() {
  curl -s -u "${WP_USER}:${WP_PASS}" \
    -H "Content-Type: application/json" \
    -X POST "${SITE_URL}/wp-json/wp/v2/posts/$1" \
    -d "{\"title\":\"$2\",\"content\":\"$3\"}"
}

# 画像アップロード
upload_image() {
  curl -s -u "${WP_USER}:${WP_PASS}" \
    -H "Content-Disposition: attachment; filename=$(basename $1)" \
    --data-binary "@$1" \
    "${SITE_URL}/wp-json/wp/v2/media"
}

# 固定ページ一覧取得
get_pages() {
  curl -s -u "${WP_USER}:${WP_PASS}" \
    "${SITE_URL}/wp-json/wp/v2/pages?per_page=${1:-10}"
}

# 固定ページ更新
update_page() {
  curl -s -u "${WP_USER}:${WP_PASS}" \
    -H "Content-Type: application/json" \
    -X POST "${SITE_URL}/wp-json/wp/v2/pages/$1" \
    -d "{\"title\":\"$2\",\"content\":\"$3\"}"
}

# カテゴリ一覧取得
get_categories() {
  curl -s -u "${WP_USER}:${WP_PASS}" \
    "${SITE_URL}/wp-json/wp/v2/categories?per_page=100"
}
