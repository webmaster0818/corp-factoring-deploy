# デプロイ手順書 - BEST-FIT

**対象環境:** Vercel（無料プラン）  
**フレームワーク:** Next.js 15.1.3  
**更新日:** 2026年3月11日

---

## 📋 デプロイ前の準備

### 1. ビルドの確認

```bash
# 本番用ビルドを実行
npm run build

# ビルドエラーがないことを確認
# ビルド成功時の出力:
# ✓ Compiled successfully
# ✓ Collecting page data
# ✓ Generating static pages (55/55)
# ✓ Finalizing page optimization
```

**確認項目:**
- ✅ ビルドエラーがない
- ✅ TypeScriptエラーがない
- ✅ Lint警告がない
- ✅ 静的ページ生成完了（47都道府県 + 8静的ページ）

---

### 2. 環境変数の確認

**必須環境変数:**

| 変数名 | 値 | 用途 |
|--------|-----|------|
| `NEXT_PUBLIC_SITE_URL` | `https://dunlopsportsclub.jp` | サイトURL（OGP、sitemap生成） |
| `NODE_ENV` | `production` | 本番環境フラグ |

**オプション環境変数:**

| 変数名 | 値 | 用途 |
|--------|-----|------|
| `NEXT_PUBLIC_GA_ID` | `G-XXXXXXXXXX` | Google Analytics 4（実装時） |

---

### 3. ファイルの最終確認

**必須ファイル:**
- ✅ `app/sitemap.ts` - sitemap.xml生成
- ✅ `app/robots.ts` - robots.txt生成
- ✅ `public/favicon.ico` - ファビコン
- ✅ `public/icon.png` - アイコン（512x512）
- ✅ `public/apple-icon.png` - Appleアイコン（180x180）
- ✅ `public/ogp-image.jpg` - OGP画像（1200x630）

**確認コマンド:**
```bash
ls -lh public/
# 出力例:
# favicon.ico
# icon.png
# apple-icon.png
# ogp-image.jpg
```

---

## 🚀 Vercelへのデプロイ手順

### ステップ1: Vercelアカウント作成

1. **Vercel公式サイトにアクセス**
   - https://vercel.com/signup

2. **GitHubアカウントでサインアップ**
   - 「Continue with GitHub」をクリック
   - GitHubアカウントで認証

3. **アカウント作成完了**
   - ダッシュボードにリダイレクト

---

### ステップ2: GitHubリポジトリの準備

1. **GitHubにリポジトリ作成**
   ```bash
   # ローカルでGitリポジトリ初期化
   cd bestfit-remake
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **GitHubにプッシュ**
   ```bash
   # GitHubでリポジトリ作成後
   git remote add origin https://github.com/your-org/bestfit-remake.git
   git branch -M main
   git push -u origin main
   ```

---

### ステップ3: Vercelにリポジトリ連携

1. **Vercelダッシュボードで「New Project」をクリック**

2. **GitHubリポジトリをインポート**
   - 「Import Git Repository」を選択
   - `your-org/bestfit-remake` を選択
   - 「Import」をクリック

3. **プロジェクト設定**
   - **Project Name**: `bestfit` または任意の名前
   - **Framework Preset**: `Next.js` （自動検出）
   - **Root Directory**: `.` （ルートディレクトリ）
   - **Build Command**: `npm run build` （自動設定）
   - **Output Directory**: `.next` （自動設定）

4. **環境変数設定**
   - 「Environment Variables」セクションで追加:
     - `NEXT_PUBLIC_SITE_URL`: `https://your-domain.vercel.app`

5. **デプロイ開始**
   - 「Deploy」をクリック
   - ビルド・デプロイ開始（約2-3分）

---

### ステップ4: デプロイ完了確認

1. **デプロイ成功確認**
   - ビルドログで `✓ Build Completed` を確認
   - デプロイログで `✓ Deployment Ready` を確認

2. **サイトアクセス**
   - `https://your-project.vercel.app` にアクセス
   - トップページが表示されることを確認

3. **主要ページの確認**
   - トップページ: `https://your-project.vercel.app/`
   - エリアページ: `https://your-project.vercel.app/areas/東京都`
   - 会社概要: `https://your-project.vercel.app/about`
   - お問い合わせ: `https://your-project.vercel.app/contact`

---

### ステップ5: カスタムドメイン設定（オプション）

1. **Vercelダッシュボードで「Settings」→「Domains」**

2. **カスタムドメイン追加**
   - 「Add」をクリック
   - ドメイン入力: `dunlopsportsclub.jp`
   - 「Add」をクリック

3. **DNS設定**
   - Vercelが指示するDNSレコードを追加:
     - **A レコード**: `76.76.21.21`
     - **CNAME レコード（www）**: `cname.vercel-dns.com`

4. **SSL証明書自動発行**
   - Vercelが自動的にSSL証明書を発行（Let's Encrypt）
   - 数分で `https://dunlopsportsclub.jp` でアクセス可能

5. **環境変数の更新**
   - `NEXT_PUBLIC_SITE_URL` を `https://dunlopsportsclub.jp` に変更
   - 再デプロイ

---

## 🔄 継続的デプロイ（CI/CD）

Vercelは自動的にCI/CDを設定します。

### 自動デプロイフロー

1. **mainブランチにプッシュ**
   ```bash
   git add .
   git commit -m "Update content"
   git push origin main
   ```

2. **Vercelが自動的にデプロイ**
   - ビルド開始（約2-3分）
   - テスト実行
   - プロダクションデプロイ

3. **プレビューデプロイ**
   - プルリクエスト作成時、プレビュー環境が自動生成
   - `https://bestfit-[hash].vercel.app`

---

## 📊 デプロイ後の確認項目

### SEO確認

1. **sitemap.xml**
   - URL: `https://dunlopsportsclub.jp/sitemap.xml`
   - 55ページすべて含まれていることを確認

2. **robots.txt**
   - URL: `https://dunlopsportsclub.jp/robots.txt`
   - Sitemap URLが正しいことを確認

3. **OGP**
   - Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/
   - Twitter Card Validator: https://cards-dev.twitter.com/validator

4. **構造化データ**
   - Google Rich Results Test: https://search.google.com/test/rich-results

---

### パフォーマンス確認

1. **Google Lighthouse**
   - Chrome DevTools → Lighthouse → Generate report
   - 目標スコア:
     - Performance: 90-95
     - Accessibility: 95-100
     - Best Practices: 95-100
     - SEO: 95-100

2. **Core Web Vitals**
   - Google Search Console → Core Web Vitals
   - 目標:
     - LCP: 1.8-2.2秒（Good）
     - INP: 80-120ms（Good）
     - CLS: 0.04-0.06（Good）

3. **PageSpeed Insights**
   - https://pagespeed.web.dev/
   - デスクトップ・モバイルの両方を確認

---

### アクセシビリティ確認

1. **キーボードナビゲーション**
   - Tab キーですべてのリンク・ボタンにアクセス可能か確認

2. **スクリーンリーダー**
   - macOS VoiceOver またはNVDAで確認
   - 主要なコンテンツが読み上げられるか確認

3. **カラーコントラスト**
   - WCAG Contrast Checker で確認
   - すべてのテキストがAA基準（4.5:1）を満たすか確認

---

## 🛠️ トラブルシューティング

### ビルドエラーが発生する

**原因:**
- TypeScriptエラー
- Lintエラー
- 環境変数未設定

**対処法:**
```bash
# ローカルでビルド確認
npm run build

# TypeScriptエラー確認
npx tsc --noEmit

# Lintエラー確認
npm run lint
```

---

### 画像が表示されない

**原因:**
- `public/` フォルダに画像ファイルが存在しない

**対処法:**
```bash
# 画像ファイルを確認
ls -lh public/

# 画像ファイルを追加
cp /path/to/images/* public/
git add public/
git commit -m "Add images"
git push
```

---

### OGPが表示されない

**原因:**
- メタデータ設定ミス
- 画像URLが間違っている

**対処法:**
1. `app/layout.tsx` のメタデータを確認
2. OGP画像のパスを確認（`/ogp-image.jpg`）
3. Facebook Sharing Debugger でキャッシュクリア

---

### 404エラーが発生する

**原因:**
- 動的ルートの設定ミス
- `generateStaticParams` の実装ミス

**対処法:**
```bash
# ビルドログで静的ページ生成を確認
npm run build
# 出力:
# ✓ Generating static pages (55/55)
```

---

## 📞 サポート

### Vercel公式ドキュメント

- **Next.js デプロイガイド**: https://vercel.com/docs/frameworks/nextjs
- **カスタムドメイン**: https://vercel.com/docs/custom-domains
- **環境変数**: https://vercel.com/docs/environment-variables

### BEST-FIT開発チーム

- **Email**: dev@dunlopsportsclub.jp
- **GitHub**: https://github.com/your-org/bestfit-remake

---

## 📝 デプロイチェックリスト

### デプロイ前

- [ ] `npm run build` が成功する
- [ ] TypeScriptエラーがない
- [ ] Lintエラーがない
- [ ] 環境変数を設定した
- [ ] 画像ファイルを確認した（favicon, icon, apple-icon, ogp-image）

### デプロイ中

- [ ] Vercelアカウント作成完了
- [ ] GitHubリポジトリ作成・プッシュ完了
- [ ] Vercelにリポジトリ連携完了
- [ ] 環境変数設定完了
- [ ] デプロイ開始

### デプロイ後

- [ ] サイトアクセス確認（トップページ）
- [ ] 主要ページ確認（エリア、会社概要、お問い合わせ）
- [ ] sitemap.xml確認
- [ ] robots.txt確認
- [ ] OGP確認（Facebook Sharing Debugger）
- [ ] 構造化データ確認（Google Rich Results Test）
- [ ] Lighthouse スコア確認（90点以上）
- [ ] Core Web Vitals確認（すべてGood）
- [ ] アクセシビリティ確認（キーボード、スクリーンリーダー）

---

**デプロイ完了！🎉**

**© 2026 BEST-FIT Inc. All rights reserved.**
