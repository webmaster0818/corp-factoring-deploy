# CLAUDE.md - OpenClaw Bot 統合学習知識ベース

**作成日:** 2026-04-08  
**作成者:** tomomi  
**目的:** 全Bot共通の学習知識・ルール・技術ノウハウの統合ドキュメント

---

## 📋 目次

1. [基本原則・行動規範](#1-基本原則行動規範)
2. [ワークスペース構造](#2-ワークスペース構造)
3. [Bot間通信・連携](#3-bot間通信連携)
4. [メモリ管理](#4-メモリ管理)
5. [SEO基礎知識](#5-seo基礎知識)
6. [WordPress操作](#6-wordpress操作)
7. [フロントエンド設計](#7-フロントエンド設計)
8. [プロジェクト管理](#8-プロジェクト管理)
9. [Discord運用](#9-discord運用)
10. [Tailscale SSH接続](#10-tailscale-ssh接続)

---

## 1. 基本原則・行動規範

### 1.1 SOUL.md 行動規範（絶対遵守）

**タスク実行の基本:**
1. タスクを引き受けたら**必ず実行し、完了報告すること**
2. 「やります」と言って放置しないこと
3. 5分以上かかるタスクは途中経過を報告すること
4. 実行できない場合はすぐに理由を報告すること
5. 黙って待機しないこと

**問題発生時の対応:**
6. 何をしたらいいかわからない場合は、すぐにMediaXAIに質問すること
7. エラーや問題が発生した場合は、放置せずすぐにMediaXAIに報告すること
8. 技術的な制約やアクセス権限の問題でタスクが実行できない場合は、何ができないのか・なぜできないのかを具体的に報告すること
9. 「できません」だけで終わらせず、代替案があれば提案すること
10. 判断に迷った場合は自己判断で放置せず、MediaXAIに確認すること

### 1.2 メンション対応ルール（最優先）

**以下の5人からのメンションは必ず確認し、即座に反応すること:**
1. **MediaXAI** (1477147915003760690) - 最優先
2. **okina** (1147443308788977664)
3. **mi26rock** (837853430738452480)
4. **matan0160** (836097412321640449)
5. **minori** (1485086294198452404)

**対応ルール:**
- どのチャンネルでも、この5人からのメンションを見逃さない
- メンションに気づいたら、すぐに応答（「確認しました」「対応します」等）
- 応答時間目標: 5分以内
- この5人のメッセージは最優先で処理

### 1.3 停止命令・待機ルール（全チャンネル共通・重要）

**停止命令を受けた際は、返答のメンションをせずに待機する**

- MediaXAIまたは管理者から「停止」「待機」の指示を受けた場合、即座に作業を停止
- 停止後は、**一切の返答・メンション・報告をしない**
- 返答するとループが発生し、何度もメッセージが送られる原因になる
- 次の明確な指示があるまで、静かに待機する
- このルールは**全てのチャンネル**で適用される
- 例外はない

**停止後にやってはいけないこと:**
- ❌ 「承知しました」などの返答メンション
- ❌ 「待機します」などの状態報告
- ❌ 追加の質問や確認
- ❌ 作業完了の報告（停止指示前に完了していても報告しない）

**停止後にやるべきこと:**
- ✅ 黙って待機
- ✅ 次の明確な指示を待つ

### 1.4 Budget & Cost Policy（費用制約）

**原則: お金がかからない運用をすること**

- サイト開発、インフラ構築、ツール導入など、すべての作業において**無料の選択肢を優先**する
- 有料サービス、サブスクリプション、課金が必要な機能は**使用しない**
- もし費用が必要になる場合は、**必ずMediaXAIに事前に相談**すること
- 相談なしに費用が発生する作業を進めないこと

**適用範囲:**
- サーバー費用、ドメイン費用
- 有料API、有料プラグイン
- 外部サービスの課金プラン
- その他すべての金銭的コスト

### 1.5 セキュリティ・認証情報の取扱い（絶対遵守）

**Discordに認証情報を絶対に記載しない:**
- GitHubトークン（`ghp_`で始まる文字列）
- APIキー、シークレットキー
- パスワード、アクセストークン
- 上記の一部でも省略形（`ghp_aVg...`等）でもNG

**理由:** GitHubのSecret Scanningが自動検知し、トークンが即座に無効化される。再発行の手間とセキュリティリスクが発生する。

**正しい伝え方:**
- ❌ 「トークンはghp_XXXXです」
- ❌ 「ghp_XXX...で認証確認しました」
- ✅ 「CLAUDE.mdセクション16のトークンで確認しました」
- ✅ 「トークンはwebmaster0818アカウントに紐づいています」

**このルールに例外はない。デバッグ目的でも禁止。**

---

## 2. ワークスペース構造

### 2.1 ワークスペースの場所

**各Botのワークスペース:**
- **tomomi:** `/Users/takashi.hasegawa/.openclaw/workspace/`
- **taro:** `/Users/taro.hasegawa/.openclaw/workspace/`
- **jiro:** `/Users/jiro.hasegawa/.openclaw/workspace/`
- **saburo:** `/Users/saburo.hasegawa/.openclaw/workspace/`

### 2.2 必須ファイル

**基本設定ファイル:**
- `AGENTS.md` - ワークスペースの基本ルール、セッション開始時の行動指針
- `SOUL.md` - Bot自身の人格・価値観・振る舞い方
- `USER.md` - ユーザー情報（名前・呼び方・タイムゾーン・プロジェクト）
- `IDENTITY.md` - Bot自身の名前・キャラクター・絵文字・アバター
- `TOOLS.md` - 環境固有の設定（カメラ名・SSH・TTS設定など）
- `HEARTBEAT.md` - 定期チェックタスクのリスト
- `BOOTSTRAP.md` - 初回起動時のセットアップガイド（初回後削除）

**メモリファイル:**
- `MEMORY.md` - 長期記憶（メインセッション限定、グループチャットでは読み込まない）
- `memory/YYYY-MM-DD.md` - 日次ログ（毎日作成）
- `memory/heartbeat-state.json` - ハートビートチェック状態管理

---

## 3. Bot間通信・連携

### 3.1 全Bot情報

| Bot | Discord ID | Tailscale IP | ユーザー名 | ホスト名 |
|-----|-----------|-------------|-----------|---------|
| **tomomi** | 1477900671482331258 | 100.68.144.128 | takashi.hasegawa | takashihasegawanoMac-mini.local |
| **taro** | 1479749249439629343 | 100.122.26.7 | taro.hasegawa | tarohasegawanoMac-mini.local |
| **jiro** | 1479755047289225399 | 100.112.156.89 | jiro.hasegawa | jirohasegawanoMac-mini.local |
| **saburo** | 1479756729867829319 | 100.82.52.10 | saburo.hasegawa | saburohasegawanoMac-mini.local |

### 3.2 Discordメンション方法

**✅ 正しいメンション形式:**
```
<@1477147915003760690> タスク完了しました
```

**❌ 間違った形式（動作しない）:**
```
@MediaXAI タスク完了しました
1477147915003760690 タスク完了しました
```

**重要人物のユーザーID:**
- MediaXAI: `<@1477147915003760690>`
- okina: `<@1147443308788977664>`
- mi26rock: `<@837853430738452480>`
- matan0160: `<@836097412321640449>`
- minori: `<@1485086294198452404>`

### 3.3 Bot間データ共有手順

他のBotが持つ学習データやファイルが必要な場合、**tomomiに依頼**して取得する。

**手順:**
1. 必要なデータがどのBotにあるか特定
2. Discordでtomomiにメンションして「○○のデータを取得して共有して」と依頼
3. tomomiがSSH経由で該当Botのデータを取得
4. tomomiがDiscordで依頼元のBotにデータを共有

**学習データの場所:**
- ワークスペース: `~/.openclaw/workspace/`
- SEO関連: `~/.openclaw/workspace/seo-fundamentals.md`
- ライティングテンプレート: `~/.openclaw/workspace/writing-templates.md`
- UI知識: `~/.openclaw/workspace/ui-knowledge.md`
- サイト設定: `~/.openclaw/workspace/sites-config.json`

---

## 4. メモリ管理

### 4.1 メモリの使い分け

**日次ログ (`memory/YYYY-MM-DD.md`):**
- 生のイベント記録
- その日の作業内容
- 学んだこと、ミス、問題点

**長期記憶 (`MEMORY.md`):**
- 蒸留された学び・重要な決定事項
- 繰り返し参照すべき知識
- **メインセッション限定で読み込む**（グループチャットでは読み込まない）

### 4.2 メモリ更新ルール

**「メンタルノート」は禁止:**
- メモリは限定的 → 覚えたいことはファイルに書く
- 「覚えておきます」→ `memory/YYYY-MM-DD.md` または関連ファイルに記録
- レッスン学習 → AGENTS.md、TOOLS.md、またはスキルを更新
- ミス → 文書化して将来の自分が繰り返さないように
- **テキスト > 頭** 📝

### 4.3 知識の永続化ルール

- 新しく学んだ重要な知識は必ず `~/.openclaw/workspace/knowledge.md` に追記すること
- タスクの中で得たノウハウや教訓も同様に記録すること
- 新しいセッションが始まったら、まず `knowledge.md` を読み込んで過去の学習内容を把握すること
- サーバーが違っても `knowledge.md` は共通なので、どのサーバーでも同じ知識が使える

---

## 5. SEO基礎知識

### 5.1 E-E-A-T（Experience, Expertise, Authoritativeness, Trustworthiness）

**Google公式の評価基準:**

**E（Experience: 経験）**
- 実際に使用した証拠を提示（写真、動画、スクリーンショット）
- Before/Afterの比較
- 具体的な使用期間・頻度の明記
- 実体験に基づく詳細な感想・気づき

**E（Expertise: 専門性）**
- 執筆者プロフィールの明記（経歴、資格、実績）
- Aboutページへのリンク
- 業界用語の正確な使用
- 深い洞察や分析の提供

**A（Authoritativeness: 権威性）**
- 他サイトからの被リンク獲得
- メディア掲載実績の明示
- 専門家からの推薦・引用
- 業界団体への所属

**T（Trustworthiness: 信頼性）**
- HTTPS化（SSL証明書）
- プライバシーポリシー・利用規約の掲載
- 運営者情報の明示（会社概要、連絡先）
- 正確な情報（ファクトチェック、引用元明記）
- 透明性（アフィリエイトリンクの開示）

### 5.2 検索意図の4分類

| 分類 | 意図 | 例 | 最適なページ種別 |
|------|------|-----|------------------|
| **Know（情報型）** | 知りたい | 「転職エージェントとは」 | まとめ記事、解説記事 |
| **Know Simple** | すぐに答えが欲しい | 「東京の天気」 | 強調スニペット向けFAQ |
| **Do（実行型）** | やりたい | 「転職エージェント 登録方法」 | ハウツー記事 |
| **Website** | 特定のサイトに行きたい | 「リクルート」 | ブランド名記事 |
| **Visit-in-person** | 実店舗に行きたい | 「近くのカフェ」 | ローカルSEO |

### 5.3 Core Web Vitals目標

| 指標 | 測定内容 | 目標値 |
|------|----------|--------|
| **LCP** | 最大コンテンツの表示速度 | 2.5秒以内 |
| **INP** | インタラクション応答速度 | 200ms以内 |
| **CLS** | 視覚的安定性 | 0.1以下 |

### 5.4 キーワード戦略

**ロングテールキーワード選定:**
- 2-4語の組み合わせ（例: 「パーソナルジム 東京 安い」）
- 検索ボリューム: 100-1,000/月（競合が少ない）
- 購買意図が明確（比較、おすすめ、ランキング、料金、口コミ）

**アフィリエイトで狙うべき:** Commercial（比較検討層）+ Transactional（購買層）

---

## 6. WordPress操作

### 6.1 etias-eutravel.com

**サイトURL:** https://etias-eutravel.com  
**REST APIエンドポイント:** https://etias-eutravel.com/wp-json/wp/v2/  
**操作スクリプト:** `~/.openclaw/workspace/wp-api-etias.sh`

**基本操作:**
```bash
# スクリプトを読み込む
source ~/.openclaw/workspace/wp-api-etias.sh

# 記事一覧取得
get_posts 10

# 記事作成（下書き）
create_post "タイトル" "本文HTML" "draft"

# 記事更新
update_post 記事ID "新タイトル" "新本文HTML"

# 画像アップロード
upload_image /path/to/image.jpg

# 固定ページ一覧
get_pages

# 固定ページ更新
update_page ページID "タイトル" "本文HTML"
```

**重要:**
- 記事は必ず `status: "draft"`（下書き）で作成
- 公開はMediaXAIの確認後に行うこと

### 6.2 stg.etias-eutravel.com（ステージング）

**サイトURL:** https://stg.etias-eutravel.com  
**操作スクリプト:** `~/.openclaw/workspace/wp-api-etias-stg.sh`  
**使い方:** 本番と同じ（source ~/.openclaw/workspace/wp-api-etias-stg.sh && 関数名）

### 6.3 keta-travel.com

**サイトURL:** https://keta-travel.com  
**操作スクリプト:** `~/.openclaw/workspace/wp-api-keta.sh`

### 6.4 stg.keta-travel.com（ステージング）

**サイトURL:** https://stg.keta-travel.com  
**操作スクリプト:** `~/.openclaw/workspace/wp-api-keta-stg.sh`

### 6.5 本番・ステージング運用ルール

- 新規記事やページ修正は、まずステージング（stg）で作成・確認する
- ステージングで問題なければ、MediaXAIの承認後に本番に反映する
- 本番に直接下書き作成する場合もstatus: "draft"必須
- 公開（publish）はMediaXAIの指示があった場合のみ行うこと

---

## 7. フロントエンド設計

### 7.1 デザインルール

**UIを作る前に必ず:**
- `~/.claude/skills/frontend-design/SKILL.md` を読み込むこと
- デザインは必ず独自の方向性を持つこと（ありきたりなAIデザインは禁止）

**禁止事項:**
- Inter、Roboto、Arial、システムフォントは使用禁止
- 紫グラデーション×白背景のありがちな配色は禁止

**推奨事項:**
- タイポグラフィはGoogle Fontsから個性的なフォントを選ぶこと
- 色は3色以内でコントラストを効かせること
- 余白は大胆に取ること
- アニメーションは意味のある場所にだけ使うこと
- 21st.devやshadcn/uiのコンポーネントを積極的に活用すること
- レスポンシブはモバイルファーストで設計すること

### 7.2 daisyUIパターン

**テーマ選定（用途別）:**
- **金融・法律系:** `business`, `corporate`, `dark`（信頼感）
- **美容・健康系:** `cupcake`, `pastel`, `valentine`（柔らかさ）
- **ガジェット・IT系:** `night`, `forest`, `synthwave`（クール）
- **生活・育児系:** `lemonade`, `garden`, `retro`（親しみ）

**主要コンポーネント:**
- Hero, Stats, Card, Badge, Rating, Button
- Collapse（FAQ）, Table, Alert, Avatar
- Divider, Footer, btm-nav（モバイル固定CTA）

### 7.3 パフォーマンス最適化

**画像最適化:**
- Next.js Image使用
- AVIF、WebP対応（JPEG比 -50～60%）
- width/height指定（CLS改善）
- Lazy Loading（Intersection Observer）

**フォント最適化:**
- next/font使用（Noto Sans JP推奨）
- display: 'swap'（FOUT防止）
- 必要なウェイトのみ（400、500、700）
- preload: true

**Lighthouse目標スコア:**
- Performance: 90以上
- Accessibility: 95以上
- Best Practices: 90以上
- SEO: 95以上

---

## 8. プロジェクト管理

### 8.1 デプロイ確認ルール

**サイトの修正後は必ず:**
1. GitHubにプッシュすること
2. Cloudflare Pagesでビルドが成功したか確認すること
3. ビルド済みデプロイ方式のサイトは、修正後に必ず:
   - ローカルで `npx next build`（または `npm run build`）
   - `out`ディレクトリ（または`dist`）の内容をデプロイ用リポジトリにコピー
   - デプロイ用リポジトリで `git add . && git commit -m "Update" && git push`
4. 「修正しました」と報告する前に、必ずプッシュまで完了していること
5. プッシュしていないのに完了報告をしないこと

### 8.2 キャッシュ対策

**HTML の head 内に以下のメタタグを追加すること（全サイト共通）:**
```html
<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="0">
```

### 8.3 コスト最適化ルール

**モデル切り替え:**
- 簡単なタスク（進捗確認、git操作、ファイル確認、定型作業）はHaikuモデルを使用
- 複雑なタスク（サイト構築、SEO分析、ライティング、デザイン）はSonnetモデルを使用

**切り替えコマンド:**
```
/model anthropic/claude-haiku-4-5-20251001
/model anthropic/claude-sonnet-4-5-20250929
```

---

## 9. Discord運用

### 9.1 サーバー情報

**メインサーバー（Guild ID: 1477901396732018781）:**
- 全Bot参加
- MediaXAI、okina、mi26rock、matan0160、minori参加

### 9.2 チャンネルマッピング

| 用途 | チャンネルID | チャンネル名 |
|------|-------------|------------|
| 全体進捗 | 1477901397532868701 | #general |
| トークンダッシュボード | 1483079524240457923 | #token-dashboard |
| SEO分析レポート | 1481647403902959728 | #分析レポート |

### 9.3 グループチャット対応

**応答すべき時:**
- 直接メンションされた、または質問された時
- 本当に価値を追加できる情報がある時
- 重要な誤情報を訂正する時
- 要約を求められた時

**沈黙すべき時（HEARTBEAT_OK）:**
- 人間同士のカジュアルな会話の時
- 誰かが既に質問に答えている時
- 「うん」や「いいね」だけの返信になる時
- 会話が既にうまく流れている時

**リアクションの活用:**
- 返信不要だが共感を示したい → 絵文字リアクション（👍❤️😂💡🤔など）
- 1メッセージにつき1リアクションまで

---

## 10. Tailscale SSH接続

### 10.1 全Bot Tailscale IP一覧

| Bot | Tailscale IP | ユーザー名 | ホスト名 |
|-----|-------------|-----------|---------|
| **tomomi** | 100.68.144.128 | takashi.hasegawa | takashihasegawanoMac-mini.local |
| **taro** | 100.122.26.7 | taro.hasegawa | tarohasegawanoMac-mini.local |
| **jiro** | 100.112.156.89 | jiro.hasegawa | jirohasegawanoMac-mini.local |
| **saburo** | 100.82.52.10 | saburo.hasegawa | saburohasegawanoMac-mini.local |

### 10.2 SSH接続方法

**tomomi から他のBotへ:**
```bash
# taro へ接続
ssh taro.hasegawa@100.122.26.7

# jiro へ接続
ssh jiro.hasegawa@100.112.156.89

# saburo へ接続
ssh saburo.hasegawa@100.82.52.10
```

**特徴:**
- ✅ パスワード不要（Tailscale SSHは自動認証）
- ✅ IP固定（Tailscale IPは変わらない）
- ✅ 外部アクセス（Tailscaleネットワーク経由でどこからでもアクセス可能）
- ✅ セキュア（暗号化された接続）

### 10.3 リモートコマンド実行

**ステータス確認:**
```bash
ssh taro.hasegawa@100.122.26.7 "openclaw status"
```

**ワークスペース確認:**
```bash
ssh jiro.hasegawa@100.112.156.89 "ls -la ~/.openclaw/workspace/"
```

**Gateway再起動:**
```bash
ssh saburo.hasegawa@100.82.52.10 "openclaw gateway restart"
```

### 10.4 ファイル転送

**tomomi から taro へファイル転送:**
```bash
scp /path/to/file taro.hasegawa@100.122.26.7:~/.openclaw/workspace/
```

**jiro から tomomi へファイル取得:**
```bash
scp jiro.hasegawa@100.112.156.89:~/.openclaw/workspace/file.md ./
```

---

## 11. ハートビート管理

### 11.1 ハートビート vs Cron

**ハートビート向き:**
- 複数チェックをバッチ処理（メール+カレンダー+通知を一度に）
- 会話コンテキストが必要
- タイミングが多少ずれても良い（30分ごと程度）
- APIコール削減のため定期チェックを統合

**Cron向き:**
- 正確な時刻指定（毎週月曜9時など）
- メインセッションから独立すべきタスク
- 別モデル・思考レベルを使いたい
- ワンショットリマインダー
- チャンネルに直接配信

### 11.2 定期チェック項目

**ローテーション（1日2-4回）:**
- メール - 未読の緊急メッセージ
- カレンダー - 今後24-48時間のイベント
- メンション - SNS通知
- 天気 - 外出の可能性がある場合

### 11.3 自律作業（許可不要）

- メモリファイルの整理
- プロジェクト確認（git statusなど）
- ドキュメント更新
- 自分の変更をコミット・プッシュ
- MEMORY.mdのレビュー・更新

---

## 12. 重要な参考資料

### 12.1 OpenClawドキュメント

- **ローカル:** `/opt/homebrew/lib/node_modules/openclaw/docs`
- **オンライン:** https://docs.openclaw.ai
- **GitHub:** https://github.com/openclaw/openclaw
- **Community:** https://discord.com/invite/clawd
- **スキル:** https://clawhub.com

### 12.2 スキルファイル

- **coding-agent:** `/opt/homebrew/lib/node_modules/openclaw/skills/coding-agent/SKILL.md`
- **discord:** `/opt/homebrew/lib/node_modules/openclaw/skills/discord/SKILL.md`
- **healthcheck:** `/opt/homebrew/lib/node_modules/openclaw/skills/healthcheck/SKILL.md`
- **skill-creator:** `/opt/homebrew/lib/node_modules/openclaw/skills/skill-creator/SKILL.md`
- **weather:** `/opt/homebrew/lib/node_modules/openclaw/skills/weather/SKILL.md`

---

## 13. まとめ

### 13.1 最も重要な3つの原則

**1. 実データで判断する**
- 仮定ではなく、実データで分析する
- APIで取得して確認する
- 表面的な分析では重要な問題を見逃す

**2. すぐに報告する**
- 5分詰まったら報告
- 「やります」と言ったら即実行
- 問題があれば即報告

**3. 知識を永続化する**
- 「メンタルノート」は禁止
- 重要な学びは必ずファイルに記録
- `knowledge.md`、`memory/YYYY-MM-DD.md`、`MEMORY.md`を活用

### 13.2 継続的改善

**新しい学びがあれば:**
1. `knowledge.md`に追記
2. tomomiに「知識更新あり、全Bot同期お願い」と報告
3. tomomiが全Botに配布

**このドキュメントは:**
- 全Bot共通の学習知識ベース
- 定期的に更新される生きた文書
- 新しいセッションで必ず参照すべき資料

---

## 14. リアクションルール

- メッセージを受信したら👀をつける
- 作業中は⚙️をつける
- 完了したら✅をつける
- エラーが起きたら❌をつける

---

## 15. 新サーバー（本番運用サーバー）

### サーバー情報
- **サーバーID:** 1481592468750204938
- **用途:** 本番運用
- **参加者:** MediaXAI、tomomi、taro、jiro、saburo（＋okina、mi26rock、minori追加済み）

### カテゴリ・チャンネル構成

**📋 プロジェクト管理**
- #全体進捗
- #タスク管理
- #議事録

**💻 開発**
- #開発議論
- #コードレビュー
- #デプロイ

**🔍 SEO**
- #seo戦略
- #キーワード調査
- #分析レポート (1481647403902959728)

**🌐 既存サイト**
- #esta (1481647405316440144)
- #etias (1481647474744492195)
- #k-eta (1481647476611092541)
- #uk-eta (1481647478259581039)
- #france (1481647479882780672)

**🚀 新規サイト**
- #新規開発-全般
- #サイト制作 (1488307231203000471) - okina・MediaXAI・tomomi限定
- #project-creditcard-001
- #project-factoring-002

**💬 一般**
- #general
- #token-dashboard (1483079524240457923)

### プロジェクト一覧

| プロジェクト | 担当Bot | クライアント | サイト |
|------------|--------|-----------|--------|
| House Cleaning | taro | - | site-001 |
| Pest Control | jiro | - | pest-control-001 |
| Pet Funeral | jiro/saburo | - | pet-funeral-navi |
| Factoring | saburo | MediaXAI | corp-factoring |
| Pilates | 全Bot | MediaXAI | pilates-biyori |
| Credit Card | saburo | - | project-creditcard-001 |
| VOD | taro | - | vod-site-001 |

### SEO分析対象サイト

| サイト | GA4 Property ID | チャンネル |
|--------|----------------|----------|
| ESTA | 524952658 | #esta |
| ETIAS | 457133650 | #etias |
| K-ETA | 457130558 | #k-eta |
| UK-ETA | 521222088 | #uk-eta |
| France | 512434829 | #france |

### OpenClaw設定
- **groupPolicy:** allowlist（全bot）
- **requireMention:** true
- **allowBots:** true（bot間メンション許可）

### 旧サーバーとの違い
- **旧サーバー (1477901396732018781):** 学習・開発用。okina、mi26rock、matan0160、minoriも参加。tomomi-2/taro-2/jiro-2/saburo-2も参加。
- **新サーバー (1481592468750204938):** 本番運用。プロジェクト管理・SEO分析・サイト開発の実務を集約。

---

## 16. サイト開発環境情報

### GitHubアカウント
- **アカウント:** webmaster0818
- **メール:** webmaster@mediax.biz
- **アクセストークン:** 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


### GitHubアカウント（サイト開発用）
- **アカウント:** mediaxsaburoai0818-design
- **メールアドレス:** mediax.saburo.ai0818@mediax.biz
- **アクセストークン:** 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
- **Cloudflareアカウント:** mediax.saburo.ai0818@mediax.biz

**用途:**
- 新規サイト開発のGitHub認証
- Cloudflare Pages連携
- リポジトリ作成・管理

**設定方法:**
```bash
# Git設定
git config --global user.name "mediaxsaburoai0818-design"
git config --global user.email "mediax.saburo.ai0818@mediax.biz"

# アクセストークン使用（HTTPS認証）
git clone https://mediaxsaburoai0818-design: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@github.com/<repository>.git
```

### 全サイト一覧

| サイト名 | GitHubリポジトリ | デプロイ先 | デプロイURL | 担当Bot | 技術スタック |
|---------|----------------|----------|-----------|--------|------------|
| ESTA | esta-travel-auth-site | Cloudflare Pages | - | tomomi | Next.js + TS |
| ETIAS (WP) | - | WordPress | etias-eutravel.com | tomomi | WordPress |
| ETIAS (STG) | - | WordPress | stg.etias-eutravel.com | tomomi | WordPress |
| K-ETA (WP) | - | WordPress | keta-travel.com | tomomi | WordPress |
| K-ETA (STG) | - | WordPress | stg.keta-travel.com | tomomi | WordPress |
| Pilates | pilates-biyori | Cloudflare Pages | pilates-biyori-deploy.pages.dev | 全Bot | Next.js 15 + TS + Tailwind |
| Pilates (deploy) | pilates-biyori-deploy | Cloudflare Pages | pilates-biyori-deploy.pages.dev | saburo | 静的HTML |
| BEST-FIT | BEST-FIT-remake | Cloudflare Pages | - | taro | Next.js + TS |
| Pest Control | pest-control-001 | Cloudflare Pages | pest-control-001.pages.dev | jiro | Next.js + TS |
| Pet Funeral | pet-funeral-navi | Cloudflare Pages | pet-funeral-navi.pages.dev | jiro/saburo | Next.js + TS |
| Factoring (ソース) | corp-factoring | - | - | jiro | Next.js + TS |
| Factoring (デプロイ) | corp-factoring-deploy | Cloudflare Pages | corp-factoring-deploy.pages.dev / corp-factoring.com | jiro | 静的HTML |
| Factoring (旧デプロイ※使用禁止) | okanenoerabikata | - | - | - | ※Cloudflare未接続。デプロイに使わないこと |
| VOD | vod-site-001 | Cloudflare Pages | - | saburo | Next.js + TS + microCMS |
| Aircon Cleaning | aircon-cleaning-navi | Cloudflare Pages | aircon-cleaning-navi-site.pages.dev | jiro | Next.js 16 + TS |

### SEO分析対象サイト（sites-config.json）

| サイトID | ドメイン | Search Console | GA4 Property ID | ステータス |
|---------|--------|---------------|----------------|----------|
| esta | shoenehou-online.jp | sc-domain:shoenehou-online.jp | 524952658 | active |
| etias | etias-eutravel.com | sc-domain:etias-eutravel.com | 457133650 | active |
| keta | keta-travel.com | sc-domain:keta-travel.com | 457130558 | active |
| uketa | 未確認 | 未確認 | 521222088 | active |
| france | eudiasporacouncil.org | https://www.eudiasporacouncil.org/ | 512434829 | active |

### WordPress API設定

| サイト | 操作スクリプト | REST API |
|--------|-------------|---------|
| etias-eutravel.com（本番） | wp-api-etias.sh | https://etias-eutravel.com/wp-json/wp/v2/ |
| stg.etias-eutravel.com（STG） | wp-api-etias-stg.sh | https://stg.etias-eutravel.com/wp-json/wp/v2/ |
| keta-travel.com（本番） | wp-api-keta.sh | https://keta-travel.com/wp-json/wp/v2/ |
| stg.keta-travel.com（STG） | wp-api-keta-stg.sh | https://stg.keta-travel.com/wp-json/wp/v2/ |

### デプロイ方式

**方式A: ソースコード直接デプロイ（Cloudflare Pages連携）**
- GitHubにpush → Cloudflare Pagesが自動ビルド＆デプロイ
- 対象: pest-control-001, pet-funeral-navi, aircon-cleaning-navi等

**方式B: ビルド済みデプロイ（-deployリポジトリ方式）**
1. ローカルで `npx next build`
2. `out/` の内容をデプロイ用リポジトリにコピー
3. デプロイ用リポジトリで `git push`
4. Cloudflare Pagesが自動デプロイ
- 対象: pilates-biyori-deploy, corp-factoring-deploy等

**⚠️ 重要: デプロイリポジトリの対応関係（間違えないこと）**
| ソースリポジトリ | デプロイリポジトリ | Cloudflare Pages URL |
|---|---|---|
| corp-factoring | **corp-factoring-deploy** | corp-factoring-deploy.pages.dev |
| ohana-delivery | **ohana-delivery-deploy** | ohana-delivery-deploy.pages.dev |
| pilates-biyori | **pilates-biyori-deploy** | pilates-biyori-deploy.pages.dev |
| kottouhin-biyori (※kotto-kaitori-biyori) | **kotto-kaitori-biyori-deploy** | kotto-kaitori-biyori-deploy.pages.dev |
| okanenoerabikata (先払い買取) | **okanenoerabikata-deploy** | okanenoerabikata-deploy.pages.dev |
※ corp-factoringとokanenoerabikataは別サイト。混同しないこと。

### Google API認証
- **認証ファイル:** ~/.openclaw/workspace/google-credentials.json
- **SEO分析スクリプト:** ~/.openclaw/workspace/seo-analytics/scripts/

---

**作成者:** tomomi  
**最終更新:** 2026-04-08  
**バージョン:** 1.1

**このドキュメントは、全Botが効率的に作業を進めるための統合知識ベースです。**

## 追記 (2026-04-09)

### 新規プロジェクトチャンネル

| 用途 | チャンネルID | チャンネル名 |
|------|-------------|------------|
| 転職エージェント比較サイト | 1491627685141545072 | #project-tenshoku-agent-001 |

