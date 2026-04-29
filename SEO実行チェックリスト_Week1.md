# SEO実行チェックリスト【Week 1】
**期間**: 2026年3月18日（火）～ 3月24日（月）  
**目標**: 古いコンテンツ削除、主要ページ最適化  
**進捗**: 0/15タスク完了

---

## Day 1（3月18日・火）: キックオフ

### 午前
- [ ] **10:00～11:00 キックオフミーティング**
  - 参加者: PM、SEO担当、ライター、MediaXAI
  - 場所: Discord #france
  - 準備: レポート読了、質問準備
  - 成果物: 議事録

- [ ] **11:00～11:30 Wixアクセス確認**
  - ログイン成功
  - 編集権限確認
  - ページ一覧スクリーンショット保存
  - 成果物: アクセス確認完了報告

### 午後
- [ ] **14:00～15:00 古いNGOページリスト作成**
  - Google検索: `site:eudiasporacouncil.org`
  - 対象ページをスプレッドシートに列挙
  - URL、タイトル、削除理由記載
  - 成果物: [削除対象ページリスト](リンク)

- [ ] **15:00～16:00 GSC・GA4確認**
  - GSC: インデックス数確認 → 現在: ___ ページ
  - GSC: エラー確認 → エラー数: ___
  - GA4: トラフィック確認 → 訪問者: ___ /月
  - 成果物: [ベースラインデータ](リンク)

---

## Day 2（3月19日・水）: 古いコンテンツ削除

### 午前
- [ ] **09:00～11:00 古いNGOページ削除**
  - [ ] /about-us1/ → 非公開設定
  - [ ] /portfolio/preventing-radicalization/ → 非公開設定
  - [ ] その他NGOページ（___ 個）→ 非公開設定
  - 404確認: curl -I [URL] → Status: 404
  - 成果物: 削除完了スクリーンショット

### 午後
- [ ] **14:00～15:00 http→https確認**
  - http://eudiasporacouncil.org → https://www.eudiasporacouncil.org 確認
  - リダイレクト設定（必要なら）
  - 成果物: リダイレクト確認レポート

- [ ] **15:00～16:00 タイトル・メタ修正案レビュー**
  - トップページ案確認
  - サービスページ案確認
  - 料金ページ案確認
  - MediaXAI承認取得
  - 成果物: 承認済み修正案

---

## Day 3（3月20日・木）: トップページ最適化

### 午前
- [ ] **09:00～10:00 トップページ タイトル・メタ変更**
  - Wix SEO設定画面を開く
  - タイトル変更:
    ```
    Demande ETA Royaume-Uni en Français - Support 24/7 | EuDiaspora
    ```
  - メタディスクリプション変更:
    ```
    Demande d'ETA pour le Royaume-Uni 100% en français. Pas besoin de lutter avec le site anglais du gouvernement. Formulaire simplifié, vérification d'erreurs, assistance 24/7. Depuis 75£.
    ```
  - 保存・公開
  - ブラウザで確認
  - 成果物: 変更完了スクリーンショット

- [ ] **10:00～10:30 H1タグ変更**
  - ページ編集モードを開く
  - H1変更: `Demande d'ETA Royaume-Uni : Service 100% en Français`
  - 保存・公開
  - 成果物: 変更完了スクリーンショット

### 午後
- [ ] **14:00～16:00 Above the Fold コンテンツ追加**
  - 大見出し（H1）確認
  - サブ見出し追加: `Plus besoin de lutter avec le site anglais du gouvernement. Nous faisons tout, en français.`
  - CTAボタン追加: `[➤ Commencer ma demande maintenant]`
  - 信頼性指標追加: `⭐⭐⭐⭐⭐ 4.8/5 | 🔒 Sécurisé | ✓ 15,000+ demandes traitées`
  - デスクトップ表示確認
  - モバイル表示確認
  - 成果物: Before/Afterスクリーンショット

- [ ] **16:00～16:30 GSCインデックス登録リクエスト**
  - GSC URL検査ツールを開く
  - トップページURL入力
  - 「インデックス登録をリクエスト」クリック
  - 成果物: リクエスト完了スクリーンショット

---

## Day 4（3月21日・金）: サービス・料金ページ最適化

### 午前
- [ ] **09:00～11:00 サービスページ最適化**
  - タイトル変更: `Service ETA UK en Français - Assistance Complète | EuDiaspora`
  - H1変更: `Service d'Assistance ETA Royaume-Uni : Tout en Français`
  - 比較表追加:
    ```
    | 要素 | Site officiel | Notre service |
    |------|--------------|---------------|
    | Langue | ❌ Anglais seul | ✅ 100% français |
    | Support | ❌ Aucun | ✅ 24/7 français |
    | Vérification | ❌ Non | ✅ Par experts |
    | Prix | 16£ | 75£ |
    ```
  - 保存・公開
  - GSCリクエスト
  - 成果物: 変更完了スクリーンショット

### 午後
- [ ] **14:00～16:00 料金ページ最適化**
  - タイトル変更: `Prix ETA UK : 75£ Tout Compris - Transparent | EuDiaspora`
  - 料金明細追加:
    ```
    75£ Tout Compris
    Frais officiels UK: 16£
    Service EuDiaspora: 59£
    ────────────────────
    Total: 75£
    
    Que comprennent les 59£ ?
    ✓ Formulaire français
    ✓ Vérification experts
    ✓ Support 24/7
    ✓ Gain de temps (2-3h)
    ```
  - 保存・公開
  - GSCリクエスト
  - 成果物: 変更完了スクリーンショット

- [ ] **16:00～17:00 Week 1進捗レビュー**
  - 参加者: PM、SEO担当、MediaXAI
  - 完了タスク確認: ___ /15
  - 未完了タスク調整
  - Week 2準備確認
  - 成果物: Week 1完了レポート

---

## Week 1 進捗トラッカー

### タスク完了状況
```
Day 1: □□□□ (0/4)
Day 2: □□□ (0/3)
Day 3: □□□□ (0/4)
Day 4: □□□□ (0/4)
────────────────
合計: 0/15 (0%)
```

### 成果物提出状況
- [ ] 削除対象ページリスト
- [ ] ベースラインデータ
- [ ] 削除完了スクリーンショット
- [ ] リダイレクト確認レポート
- [ ] トップページ Before/After
- [ ] サービスページ Before/After
- [ ] 料金ページ Before/After
- [ ] GSCリクエスト完了×3
- [ ] Week 1完了レポート

---

## 重要確認事項

### 技術要件
- [ ] Wixログイン情報確認済み
- [ ] GSCアクセス権確認済み
- [ ] GA4アクセス権確認済み
- [ ] Googleドライブフォルダ作成済み

### コミュニケーション
- [ ] Discord #franceチャンネル確認
- [ ] 週次ミーティング日程確定（毎週金曜16:00）
- [ ] 緊急連絡先共有

### 承認事項
- [ ] MediaXAI: タイトル・メタ修正案承認
- [ ] 予算承認: 500～1,000ドル（Phase 1全体）

---

## トラブルシューティング

### Wixアクセスできない
→ PM/MediaXAIに連絡、アクセス権付与依頼

### 古いページが削除できない
→ 非公開設定で代替、404確認優先

### GSCリクエストが失敗
→ 再試行、エラー内容をPMに報告

### タイムラグでタスク遅延
→ PM/MediaXAIに即報告、スケジュール調整

---

## 次週プレビュー（Week 2）

### 準備タスク
- [ ] レビュー作成ブリーフィング資料準備（ライター）
- [ ] FAQ質問リスト下書き開始（ライター）
- [ ] Week 1成果確認（全員）

### 必要リソース
- [ ] 顔写真アイコン（フリー素材、3～5枚）
- [ ] レビュー作成費用確保（100～200ドル）

---

**担当者**:
- PM: __________
- SEO担当: __________
- ライター: __________

**最終更新**: 2026年3月18日  
**次回更新**: 2026年3月24日（Week 1完了時）
