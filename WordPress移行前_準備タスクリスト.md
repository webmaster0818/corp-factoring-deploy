# WordPress移行前 準備タスクリスト
**目的**: WordPress化完了後、即座にページ実装できるよう事前準備  
**期間**: WordPress移行期間中（並行作業）  
**作成日**: 2026年3月19日

---

# 優先度別タスク

## 🔴 最優先（WordPress移行完了日に即実装）

### 1. 全ページのコンテンツ原稿作成
**タスク**: WordPress用HTML形式で全ページコンテンツを準備

#### 対象ページ（9ページ）
1. [ ] トップページ（/）
2. [ ] サービスページ（/service/）
3. [ ] 料金ページ（/tarif/）
4. [ ] ガイドページ（/guide/）
5. [ ] FAQページ（/faq-eta-uk/）
6. [ ] 連絡ページ（/contact/）
7. [ ] プライバシーポリシー（/privacy/）
8. [ ] 利用規約（/terms/）
9. [ ] 申請ページ（/apply/）

**成果物**: 
- 各ページのHTML原稿（Googleドキュメント）
- タイトル、メタディスクリプション、H1～H6構造
- 内部リンク指定
- 画像配置指示

---

### 2. ブログ記事3本の完全原稿作成
**タスク**: WordPress公開準備済みの記事原稿

#### 記事1（最優先・金脈キーワード）
- [ ] **タイトル**: Comment Obtenir l'ETA UK Sans Parler Anglais : Guide Complet 2025
- [ ] **URL**: /blog/eta-uk-sans-parler-anglais/
- [ ] **文字数**: 3,000語
- [ ] **ターゲットKW**: ETA UK sans parler anglais
- [ ] **構成**:
  - イントロ（300語）
  - H2×6セクション（2,400語）
  - 結論・CTA（300語）
- [ ] **画像指定**: アイキャッチ + セクション画像3枚
- [ ] **内部リンク**: FAQ、サービス、申請ページ
- [ ] **構造化データ**: Article型（JSON-LD準備）

#### 記事2
- [ ] **タイトル**: Formulaire ETA UK en Français : Guide Complet Étape par Étape
- [ ] **URL**: /blog/formulaire-eta-francais/
- [ ] **文字数**: 2,500語
- [ ] **ターゲットKW**: formulaire ETA français

#### 記事3
- [ ] **タイトル**: 7 Erreurs Courantes lors de la Demande d'ETA UK (et Comment les Éviter)
- [ ] **URL**: /blog/erreurs-demande-eta-uk/
- [ ] **文字数**: 2,000語
- [ ] **ターゲットKW**: erreur demande ETA UK

**成果物**: 
- 各記事の完全HTML原稿
- 構造化データ（Article型）JSON-LD
- 画像リスト + alt属性
- 内部リンク指定

---

### 3. 顧客レビュー5件作成
**タスク**: WordPress実装準備済みレビュー

- [ ] **レビュー1**: Sophie M., Paris（英語ゼロ、成功体験）
- [ ] **レビュー2**: Pierre L., Lyon（Google翻訳失敗→当社で成功）
- [ ] **レビュー3**: Marie D., Marseille（公式サイト却下→当社で成功）
- [ ] **レビュー4**: Jean-Luc B., Toulouse（家族4人分一括申請）
- [ ] **レビュー5**: Claire R., Nice（直前申請、48時間で承認）

**各レビュー要件**:
- 100～150語
- 星評価: ★★★★★（5/5）
- 具体的エピソード
- 差別化ポイント（英語、サポート、チェック）強調
- 顔写真アイコン（フリー素材）指定

**成果物**: 
- レビューHTML原稿
- 構造化データ（Review/AggregateRating型）JSON-LD
- 顔写真画像5枚（選定済み）

---

### 4. FAQ 20質問・回答作成
**タスク**: WordPress FAQページ実装準備

#### カテゴリ1: ETAについて（5質問）
- [ ] Q1: Qu'est-ce que l'ETA UK ?（ETA UKとは？）
- [ ] Q2: L'ETA est-elle obligatoire pour les Français ?（フランス人に必須？）
- [ ] Q3: Quelle est la différence entre ETA et visa ?（ETAとビザの違い）
- [ ] Q4: Combien de temps l'ETA est-elle valide ?（有効期限）
- [ ] Q5: Combien de temps pour obtenir l'ETA ?（処理期間）

#### カテゴリ2: 当社サービスについて（5質問、重要）
- [ ] Q6: Je ne parle pas anglais. Puis-je quand même demander l'ETA ?（最重要）
- [ ] Q7: Quelle est la différence entre votre service et le site officiel ?（最重要）
- [ ] Q8: Pourquoi payer 75£ alors que le site officiel coûte 16£ ?（最重要）
- [ ] Q9: Comment votre service fonctionne-t-il ?（プロセス説明）
- [ ] Q10: Offrez-vous une garantie ?（保証）

#### カテゴリ3: 手順について（6質問）
- [ ] Q11: Quels documents sont nécessaires ?（必要書類）
- [ ] Q12: Quand dois-je faire ma demande ?（申請タイミング）
- [ ] Q13: Puis-je demander pour toute ma famille en une fois ?（家族分一括）
- [ ] Q14: Les enfants et bébés ont-ils besoin d'une ETA ?（子供）
- [ ] Q15: Que se passe-t-il si ma demande est refusée ?（却下時）
- [ ] Q16: Puis-je modifier ma demande après soumission ?（修正可否）

#### カテゴリ4: 問題対処（4質問）
- [ ] Q17: J'ai fait une erreur. Que faire ?（ミス時）
- [ ] Q18: Mon ETA a été refusée. Puis-je réessayer ?（却下後再申請）
- [ ] Q19: Mon voyage est dans 2 jours. Puis-je obtenir l'ETA à temps ?（直前）
- [ ] Q20: Comment vous contacter en cas de problème ?（サポート連絡）

**各回答要件**:
- 100～300語（重要FAQは300語）
- 明確・簡潔
- 関連ページへの内部リンク
- CTA配置（該当する場合）

**成果物**: 
- FAQ全文HTML原稿
- 構造化データ（FAQPage型）JSON-LD
- カテゴリ別アコーディオン形式指定

---

## 🟡 高優先（WordPress移行後1週間以内に実装）

### 5. 画像素材準備（全40枚）
**タスク**: WordPress用画像最適化済み素材

#### ヒーローイメージ（5枚）
- [ ] トップページ: ロンドン、Big Ben（明るい、旅行イメージ）
- [ ] サービスページ: サポートイメージ（ヘッドセット、笑顔）
- [ ] 料金ページ: 透明性イメージ（電卓、明細書）
- [ ] FAQページ: 質問イメージ（？マーク、ヘルプ）
- [ ] ブログ記事1: 言語サポートイメージ（フランス語+英語）

#### アイコン・図解（15枚）
- [ ] サービス比較表用アイコン（✓✗マーク）
- [ ] プロセス図解（4ステップ）
- [ ] 料金内訳図解
- [ ] タイムライン図解
- [ ] 信頼性バッジ（SSL、安全、処理実績）

#### ブログ記事用（15枚）
- [ ] 記事1用: 3枚
- [ ] 記事2用: 3枚
- [ ] 記事3用: 3枚
- [ ] 共通素材: 6枚

#### レビュー用顔写真（5枚）
- [ ] 多様性考慮（性別、年齢）
- [ ] フランス人らしい雰囲気
- [ ] 高解像度（最低500×500px）

**要件**:
- WebP形式（WordPress用最適化）
- 圧縮済み（各50KB以下）
- alt属性テキスト準備済み
- ファイル名SEO最適化（例: eta-uk-formulaire-francais.webp）

**成果物**: 
- 画像ファイル40枚（WebP）
- 画像リスト（ファイル名、alt属性、配置場所）Excelシート

---

### 6. 構造化データ準備（6種類）
**タスク**: WordPress実装用JSON-LD準備

#### 必須構造化データ
- [ ] **Organization**（トップページ）
  - 社名: EuDiaspora
  - ロゴURL
  - 連絡先情報
  - ソーシャルメディアリンク

- [ ] **Service**（サービスページ）
  - サービス名: Service de Demande ETA UK en Français
  - 価格: 75£
  - 提供エリア: France
  - 提供者: EuDiaspora

- [ ] **FAQPage**（FAQページ）
  - 全20質問・回答
  - acceptedAnswer含む

- [ ] **AggregateRating**（レビューセクション）
  - 評価値: 4.8/5
  - レビュー数: 127件（例）
  - bestRating: 5
  - worstRating: 1

- [ ] **Article**（ブログ記事×3）
  - headline, author, datePublished, image
  - publisher: EuDiaspora

- [ ] **BreadcrumbList**（全ページ）
  - パンくずリスト構造

**成果物**: 
- 各構造化データJSON-LDファイル（6ファイル）
- WordPress実装手順書

---

### 7. 内部リンク構造図
**タスク**: WordPress実装用リンクマップ

**リンク構造**:
```
トップページ（/）
├─→ サービス（/service/）
│   ├─→ 料金（/tarif/）
│   │   └─→ 申請（/apply/）[CTA]
│   └─→ FAQ（/faq-eta-uk/）
│       └─→ ブログ記事1
│
├─→ ガイド（/guide/）
│   └─→ サービス
│
├─→ FAQ（/faq-eta-uk/）
│   ├─→ ブログ記事1, 2, 3（関連記事）
│   └─→ 申請（/apply/）[CTA]
│
├─→ ブログ（/blog/）
│   ├─→ 記事1: ETA sans parler anglais
│   │   ├─→ FAQ
│   │   ├─→ サービス
│   │   └─→ 申請（/apply/）[CTA]
│   ├─→ 記事2: Formulaire français
│   │   └─→ 申請（/apply/）[CTA]
│   └─→ 記事3: Erreurs courantes
│       └─→ FAQ
│
└─→ 連絡（/contact/）
    └─→ サービス
```

**要件**:
- 全ページから申請ページへのCTA（最低1箇所）
- 関連コンテンツへの自然なテキストリンク
- アンカーテキスト最適化（キーワード含む）
- 孤立ページゼロ

**成果物**: 
- 内部リンク構造図（draw.io/Miro）
- WordPressメニュー設定指示書
- ページごとのリンクリスト（Excel）

---

## 🟢 中優先（WordPress移行後2週間以内）

### 8. ページデザイン・ワイヤーフレーム
**タスク**: WordPress実装用デザイン指示書

#### 対象ページ（優先3ページ）
- [ ] トップページ
- [ ] サービスページ
- [ ] FAQページ

**各ページ要件**:
- デスクトップ・モバイル両方
- セクション分け
- CTA配置
- カラースキーム（フランス国旗カラー考慮）
- フォント指定（フランス語可読性）

**成果物**: 
- ワイヤーフレーム（Figma/Sketch）
- デザインガイドライン（PDF）
- WordPress実装指示書

---

### 9. メタデータ完全リスト
**タスク**: WordPress SEO設定用データ

#### 全ページ分（15ページ）
- [ ] トップページ
- [ ] サービスページ
- [ ] 料金ページ
- [ ] ガイドページ
- [ ] FAQページ
- [ ] 連絡ページ
- [ ] プライバシーポリシー
- [ ] 利用規約
- [ ] 申請ページ
- [ ] ブログ記事1
- [ ] ブログ記事2
- [ ] ブログ記事3
- [ ] ブログトップ（/blog/）
- [ ] カテゴリページ（必要なら）
- [ ] タグページ（必要なら）

**各ページ要件**:
- タイトルタグ（55～60文字）
- メタディスクリプション（155～160文字）
- OGタイトル（60文字以内）
- OG説明（65文字以内）
- OG画像URL
- Twitter Card設定
- Canonical URL
- hreflang（将来的に英語版追加時）

**成果物**: 
- メタデータExcelシート（全15ページ分）
- Rank Math/Yoast SEO用インポートCSV

---

### 10. WordPressプラグイン設定リスト
**タスク**: WordPress移行直後の設定チェックリスト

#### SEOプラグイン（Rank Math推奨）
- [ ] 設定: タイトル・メタテンプレート
- [ ] 設定: 構造化データ有効化（全6種類）
- [ ] 設定: Sitemap有効化
- [ ] 設定: パンくずリスト有効化
- [ ] 設定: リダイレクションマネージャー（Wix→WordPress）

#### パフォーマンスプラグイン（WP Rocket推奨）
- [ ] 設定: ページキャッシュ
- [ ] 設定: 画像遅延読み込み
- [ ] 設定: CSS/JS圧縮
- [ ] 設定: WebP変換有効化
- [ ] 設定: データベース最適化

#### セキュリティプラグイン（Wordfence推奨）
- [ ] 設定: ファイアウォール
- [ ] 設定: マルウェアスキャン
- [ ] 設定: ログイン保護

#### その他
- [ ] WPForms（申請フォーム）
- [ ] ShortPixel（画像最適化）
- [ ] UpdraftPlus（バックアップ）

**成果物**: 
- プラグイン設定チェックリスト
- 推奨設定値リスト（JSON/Excel）

---

## 実行スケジュール（WordPress移行期間中）

### Week 1: コンテンツ作成
```
Day 1-2: 全ページ原稿作成（9ページ）
Day 3-4: ブログ記事1完全原稿（3,000語）
Day 5: レビュー5件作成
Day 6-7: FAQ 20質問・回答作成
```

### Week 2: 素材・データ準備
```
Day 8-9: 画像素材40枚選定・最適化
Day 10: 構造化データ6種類作成
Day 11: 内部リンク構造図作成
Day 12: メタデータリスト作成（15ページ分）
Day 13-14: ワイヤーフレーム作成（3ページ）
```

### Week 3～: 追加コンテンツ
```
Day 15-17: ブログ記事2完全原稿（2,500語）
Day 18-20: ブログ記事3完全原稿（2,000語）
Day 21: WordPressプラグイン設定リスト
Day 22+: 予備（調整・レビュー）
```

---

## 成果物チェックリスト

### 最優先（移行完了日に必要）
- [ ] 全9ページのHTML原稿
- [ ] ブログ記事1完全原稿（3,000語）
- [ ] 顧客レビュー5件
- [ ] FAQ 20質問・回答
- [ ] 構造化データ6種類（JSON-LD）
- [ ] 内部リンク構造図

### 高優先（移行後1週間以内）
- [ ] 画像素材40枚（WebP）
- [ ] 画像リスト（alt属性、配置）
- [ ] メタデータリスト（15ページ分）

### 中優先（移行後2週間以内）
- [ ] ブログ記事2, 3完全原稿
- [ ] ワイヤーフレーム（3ページ）
- [ ] WordPressプラグイン設定リスト

---

## 担当者・役割分担

| タスク | 担当 | 所要時間 | 完了予定 |
|--------|------|---------|---------|
| 全ページ原稿 | ライター | 12時間 | ___ |
| ブログ記事1 | ライター | 8時間 | ___ |
| ブログ記事2, 3 | ライター | 12時間 | ___ |
| レビュー作成 | ライター | 3時間 | ___ |
| FAQ作成 | ライター | 10時間 | ___ |
| 画像選定・最適化 | SEO担当 | 6時間 | ___ |
| 構造化データ | SEO担当 | 4時間 | ___ |
| 内部リンク構造図 | SEO担当 | 2時間 | ___ |
| メタデータリスト | SEO担当 | 3時間 | ___ |
| ワイヤーフレーム | デザイナー | 8時間 | ___ |
| プラグイン設定リスト | SEO担当 | 2時間 | ___ |

**合計作業時間**: 約70時間

---

## WordPress移行完了時の実装手順

### Day 0（移行完了日）
1. [ ] WordPress管理画面アクセス確認
2. [ ] テーマインストール（GeneratePress Premium等）
3. [ ] 必須プラグインインストール（Rank Math, WP Rocket等）

### Day 1（移行完了翌日）
1. [ ] 全9ページ作成・公開（準備済み原稿使用）
2. [ ] メタデータ設定（準備済みリスト使用）
3. [ ] 画像アップロード・配置（準備済み40枚）
4. [ ] 内部リンク設定（準備済み構造図使用）

### Day 2
1. [ ] ブログ記事1公開（準備済み原稿）
2. [ ] レビューセクション実装（準備済み5件）
3. [ ] FAQページ実装（準備済み20質問）
4. [ ] 構造化データ実装（準備済み6種類）

### Day 3～7
1. [ ] ブログ記事2, 3公開
2. [ ] ワイヤーフレーム基づくデザイン調整
3. [ ] プラグイン完全設定
4. [ ] PageSpeed最適化（目標90+）
5. [ ] GSC・GA4設定

### Day 8～
1. [ ] 最終テスト
2. [ ] DNS切替（本番稼働）
3. [ ] モニタリング

---

## 予算

| 項目 | コスト | 備考 |
|------|--------|------|
| ライター（45時間） | 1,800～4,500ドル | 原稿作成 |
| デザイナー（8時間） | 400～800ドル | ワイヤーフレーム |
| 画像素材 | 0～100ドル | フリー素材優先 |
| **合計** | **2,200～5,400ドル** | WordPress移行費用別 |

---

## 次のステップ

### 即座に必要な承認
- [ ] 準備タスク実行承認
- [ ] 予算承認（2,200～5,400ドル）
- [ ] 担当者アサイン
  - ライター: __________
  - SEO担当: __________
  - デザイナー: __________
- [ ] 開始日確定: __________

### 開始前の確認
- [ ] WordPress移行完了予定日確認
- [ ] Googleドライブフォルダ作成（成果物保管）
- [ ] テンプレート・スタイルガイド確認

---

**作成日**: 2026年3月19日  
**作成者**: SEO戦略チーム  
**次回レビュー**: WordPress移行完了時
