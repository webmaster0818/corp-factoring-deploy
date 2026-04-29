# サービスアカウント設定ガイド

## 📝 ステップ1: Google Cloud Console でサービスアカウント作成

### 1-1. Google Cloud Console にアクセス

https://console.cloud.google.com/

### 1-2. プロジェクトを作成/選択

- 新規プロジェクトを作成するか、既存のプロジェクトを選択

### 1-3. APIを有効化

**ナビゲーションメニュー → APIs & Services → Enable APIs and Services**

以下の2つのAPIを検索して有効化：

1. **Google Analytics Data API**
2. **Google Search Console API**

### 1-4. サービスアカウントを作成

**ナビゲーションメニュー → IAM & Admin → Service Accounts**

1. **+ CREATE SERVICE ACCOUNT** をクリック
2. サービスアカウント名を入力（例: `seo-analytics-bot`）
3. **CREATE AND CONTINUE** をクリック
4. ロールは選択不要（Skip）
5. **DONE** をクリック

### 1-5. JSONキーを作成

1. 作成したサービスアカウントの右側の **Actions (⋮)** をクリック
2. **Manage keys** を選択
3. **ADD KEY → Create new key** をクリック
4. **JSON** を選択して **CREATE**
5. ダウンロードされたJSONファイルを保存

## 📝 ステップ2: GA4 にサービスアカウントを追加

### 2-1. GA4 管理画面にアクセス

https://analytics.google.com/

### 2-2. プロパティアクセス管理

1. **管理（左下の歯車アイコン）** → **プロパティ** → **プロパティのアクセス管理**
2. 右上の **+** → **ユーザーを追加** をクリック
3. **メールアドレス** にサービスアカウントのメールアドレスを入力
   - 例: `seo-analytics-bot@project-id.iam.gserviceaccount.com`
4. **役割** で **閲覧者** を選択
5. **追加** をクリック

## 📝 ステップ3: Search Console にサービスアカウントを追加

### 3-1. Search Console にアクセス

https://search.google.com/search-console

### 3-2. ユーザー追加

1. **設定（左メニュー）** → **ユーザーと権限**
2. **ユーザーを追加** をクリック
3. **メールアドレス** にサービスアカウントのメールアドレスを入力
4. **権限** で **フル** または **制限付き** を選択
5. **追加** をクリック

## 📝 ステップ4: JSONキーファイルを配置

ダウンロードしたJSONファイルを以下のパスに配置：

```bash
~/.openclaw/workspace/seo-analytics/config/service-account-key.json
```

コマンド例：

```bash
# ダウンロードフォルダから移動する場合
mv ~/Downloads/project-id-xxxxxxxxxxxx.json ~/.openclaw/workspace/seo-analytics/config/service-account-key.json

# 権限設定（重要）
chmod 600 ~/.openclaw/workspace/seo-analytics/config/service-account-key.json
```

## 📝 ステップ5: config.json を作成

```bash
cd ~/.openclaw/workspace/seo-analytics
cp config/config.example.json config/config.json
```

`config/config.json` を編集：

```json
{
  "ga4": {
    "propertyId": "あなたのGA4プロパティID（数字のみ）"
  },
  "searchConsole": {
    "siteUrl": "https://keta-travel.com/"
  },
  "dateRange": {
    "startDate": "2025-01-01",
    "endDate": "2026-03-13"
  },
  "authentication": {
    "type": "service_account",
    "keyFilePath": "~/.openclaw/workspace/seo-analytics/config/service-account-key.json"
  }
}
```

## ✅ 設定完了！

以下のコマンドでデータ取得を実行：

```bash
cd ~/.openclaw/workspace/seo-analytics
npm install
./get-site-data.sh keta
```

---

**トラブルシューティング:**

問題が発生した場合は、以下を確認：

1. サービスアカウントのメールアドレスが GA4 と Search Console の両方に追加されているか
2. JSONキーファイルのパスが正しいか
3. GA4のプロパティIDが正しいか（`G-XXXXXXXX` の `G-` を除いた数字部分のみ）
4. Search Console のサイトURLが完全一致しているか（`https://` と末尾 `/` を含む）
