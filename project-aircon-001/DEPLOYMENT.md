# デプロイガイド - エアコンクリーニング比較ナビ

## ビルド成功 ✅

**総ページ数**: 69ページ（静的生成）

---

## Vercelへのデプロイ手順

### 1. Vercelアカウント作成
https://vercel.com にアクセスし、GitHubアカウントで登録

### 2. GitHubリポジトリ作成
```bash
# GitHubで新規リポジトリ作成: aircon-cleaning-navi
# ローカルでリモート追加
cd ~/.openclaw/workspace/project-aircon-001/aircon-site
git remote add origin https://github.com/YOUR_USERNAME/aircon-cleaning-navi.git
git branch -M main
git push -u origin main
```

### 3. Vercelでインポート
1. Vercelダッシュボードで "Add New Project"
2. GitHub連携でリポジトリ選択
3. フレームワーク: Next.js（自動検出）
4. ルートディレクトリ: aircon-site（変更不要）
5. "Deploy"ボタンをクリック

### 4. デプロイ完了
- 数分で自動デプロイ完了
- URLが発行される（例: https://aircon-cleaning-navi.vercel.app）

---

## Cloudflare Pagesへのデプロイ手順

### 1. ビルド
```bash
cd ~/.openclaw/workspace/project-aircon-001/aircon-site
npm run build
```

### 2. 出力ディレクトリ
- `.next/static` と `.next/server` が生成される
- Cloudflare Pagesは Next.js をサポート

### 3. Cloudflare Pagesで設定
1. Cloudflare Pagesダッシュボードで "Create a project"
2. GitHubリポジトリを連携
3. ビルド設定:
   - Build command: `npm run build`
   - Build output directory: `.next`
   - Framework preset: Next.js
4. "Save and Deploy"

---

## ドメイン設定

### おすすめドメイン名
- aircon-cleaning-navi.com
- aircon-hikaku.jp
- エアコンクリーニング比較.jp

### Vercelでのカスタムドメイン設定
1. Vercelプロジェクトの "Settings" > "Domains"
2. カスタムドメインを追加
3. DNSレコード設定（ドメインレジストラで設定）
   - A Record: `76.76.21.21`（Vercel IP）
   - または CNAME: `cname.vercel-dns.com`

### SSL証明書
- Vercel/Cloudflare Pagesは自動でSSL証明書を発行

---

## 環境変数（将来的に必要になる場合）

Vercel/Cloudflare Pagesの設定画面で追加：

```
# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# アフィリエイトASP API（将来的に）
A8_API_KEY=your_api_key
AFB_API_KEY=your_api_key
```

---

## デプロイ後の確認項目

### 1. ページ表示確認
- [ ] トップページが正しく表示される
- [ ] 業者詳細ページが正しく表示される
- [ ] ランキングページが正しく表示される
- [ ] 地域別ページが正しく表示される（東京、大阪など）
- [ ] お役立ちガイドページが正しく表示される

### 2. レスポンシブ確認
- [ ] モバイル（375px）で正しく表示される
- [ ] タブレット（768px）で正しく表示される
- [ ] デスクトップ（1024px以上）で正しく表示される

### 3. リンク確認
- [ ] 内部リンクが正しく動作する
- [ ] CTAボタンが正しく動作する
- [ ] パンくずリストが正しく動作する

### 4. SEO確認
- [ ] ページタイトルが正しく設定されている
- [ ] メタディスクリプションが正しく設定されている
- [ ] OGP画像が設定されている（将来的に）

---

## 次のステップ

### 1. Google Search Console登録
1. https://search.google.com/search-console にアクセス
2. プロパティを追加（ドメイン）
3. サイトマップを送信: `https://your-domain.com/sitemap.xml`

### 2. Google Analytics 4 設置
1. https://analytics.google.com でプロパティ作成
2. 測定IDを取得（G-XXXXXXXXXX）
3. Vercelの環境変数に追加
4. `app/layout.tsx`にGAタグを追加

### 3. アフィリエイトASP登録
- [ ] A8.net（https://www.a8.net/）
- [ ] afb（https://www.afi-b.com/）
- [ ] バリューコマース（https://www.valuecommerce.ne.jp/）

### 4. アフィリエイトリンク実装
- [ ] 各業者のアフィリエイトリンクを取得
- [ ] `data/companies.json`の`affiliateUrl`を実URLに差し替え
- [ ] Git commit & push でデプロイ

---

## トラブルシューティング

### ビルドエラーが発生する
```bash
# キャッシュをクリア
rm -rf .next
npm run build
```

### デプロイ後にページが404になる
- Next.jsの設定を確認（`next.config.ts`）
- 静的生成が正しく動作しているか確認

### 画像が表示されない
- `public/`ディレクトリに画像が配置されているか確認
- 画像パスが正しいか確認（`/images/xxx.png`）

---

## サポート

質問がある場合は、以下を確認：
- Next.js公式ドキュメント: https://nextjs.org/docs
- Vercelドキュメント: https://vercel.com/docs
- Cloudflare Pagesドキュメント: https://developers.cloudflare.com/pages

---

## まとめ

1. ✅ ビルド成功（69ページ）
2. ⏳ GitHubリポジトリ作成
3. ⏳ Vercel/Cloudflare Pagesへデプロイ
4. ⏳ カスタムドメイン設定
5. ⏳ Google Analytics設置
6. ⏳ ASP登録・アフィリエイトリンク実装

次の作業: GitHubリポジトリを作成し、デプロイを実行してください。
