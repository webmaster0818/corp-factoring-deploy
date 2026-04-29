# SEO戦略レポート PDF変換手順

レポートファイルの準備ができました！

## 📄 生成済みファイル

1. **Markdownオリジナル**
   - ファイル: `SEO_Strategy_Report_EuDiaspora_Final.md`
   - サイズ: 67KB
   - 43,000文字、12章構成

2. **HTML版（PDF変換用）**
   - ファイル: `SEO_Strategy_Report_EuDiaspora_Final.html`
   - サイズ: 110KB
   - 目次付き、GitHub Markdown CSS適用済み

---

## 🖨️ PDF変換方法（3つの選択肢）

### 方法1: ブラウザで印刷（最も簡単・推奨）

#### 手順
```bash
# 1. HTMLファイルを開く
open SEO_Strategy_Report_EuDiaspora_Final.html

# または Finderで開く
```

#### ブラウザで：
1. ファイルが開いたら **⌘+P**（印刷）
2. 「送信先」で **PDFとして保存** を選択
3. **保存**

**出力**: SEO戦略レポート.pdf

---

### 方法2: Pandoc + wkhtmltopdf（自動変換）

#### インストール
```bash
brew install wkhtmltopdf
```

#### 変換実行
```bash
cd ~/.openclaw/workspace

wkhtmltopdf \
  --enable-local-file-access \
  --page-size A4 \
  --margin-top 20mm \
  --margin-bottom 20mm \
  --margin-left 15mm \
  --margin-right 15mm \
  SEO_Strategy_Report_EuDiaspora_Final.html \
  SEO_Strategy_Report_EuDiaspora_Final.pdf
```

---

### 方法3: オンラインツール（最速）

#### 推奨サイト

**Markdown to PDF**:
- https://www.markdowntopdf.com/
- ファイルアップロード: `SEO_Strategy_Report_EuDiaspora_Final.md`
- 変換ボタンクリック

**HTML to PDF**:
- https://www.html2pdf.com/
- ファイルアップロード: `SEO_Strategy_Report_EuDiaspora_Final.html`
- 変換ボタンクリック

---

## 📊 変換後の確認ポイント

### 必須チェック
- [ ] 全12章が含まれている
- [ ] 目次が正しく表示されている
- [ ] 表（テーブル）が正しく表示されている
- [ ] コードブロックが読みやすい
- [ ] ページ番号が振られている（オプション）

### レイアウト
- [ ] 各章が新しいページから開始
- [ ] 画像・図表が適切に配置
- [ ] マージンが適切

---

## ✅ 推奨方法

**最も簡単**: **方法1（ブラウザで印刷）**

理由:
- ✅ 追加インストール不要
- ✅ プレビューしながら調整可能
- ✅ 印刷設定で細かく調整できる
- ✅ 結果が確実

---

## 🎨 印刷設定のコツ（方法1使用時）

### Chrome/Safari印刷ダイアログ

#### レイアウト
- **ページサイズ**: A4
- **マージン**: 標準 or カスタム（上下2cm、左右1.5cm）
- **向き**: 縦

#### オプション
- ✅ **背景のグラフィック**: ON（色付きテーブルヘッダーが表示される）
- ✅ **ページ番号**: ON（推奨）
- ✅ **ヘッダーとフッター**: ON or OFF（お好みで）

---

## 📍 ファイルの場所

```
~/.openclaw/workspace/
├── SEO_Strategy_Report_EuDiaspora_Final.md    ← Markdown原本
├── SEO_Strategy_Report_EuDiaspora_Final.html  ← HTML版（PDF変換用）
└── [生成] SEO_Strategy_Report_EuDiaspora_Final.pdf
```

---

## 🚀 次のステップ

1. **PDF変換実行**（上記いずれかの方法）
2. **内容確認**
3. **必要に応じて微調整**
4. **MediaXAIに送付**

---

## ⚠️ トラブルシューティング

### 「表が切れている」
→ 印刷設定で「縮小して印刷」ON

### 「コードブロックが読みにくい」
→ 印刷設定で「背景のグラフィック」ON

### 「ページ数が多すぎる」
→ マージンを小さく、フォントサイズを調整

---

どの方法で変換しますか？サポートが必要な場合はお知らせください！
