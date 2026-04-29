# CLAUDE.md - seo-analytics

**プロジェクト:** SEO分析ツール・レポート
**最終更新:** 2026-04-08

---

## プロジェクト概要

全サイト横断のSEO分析ツール群とレポート管理。
データ収集スクリプト、分析レポート、改善提案を統合管理。

## ディレクトリ構成

- alerts/: アラート設定
- data/: 収集データ
- insights/: 分析インサイト
- recommendations/: 改善提案
- reports/: レポート出力
- scripts/: 分析スクリプト

## 主要ファイル

- CHANNEL_GUIDE.md: チャンネルガイド
- DEEP_ANALYSIS_REPORT.md: 詳細分析レポート
- QUICK_START.md: クイックスタートガイド
- get-site-data.sh: サイトデータ取得スクリプト
- run-analysis.sh: 分析実行スクリプト
- run-esta.sh / run-etias.sh / run-france.sh / run-keta.sh / run-uketa.sh: サイト別実行スクリプト
- run-weekly-report.sh: 週次レポートスクリプト
- cron-daily-collection.json: 日次データ収集cron設定
- cron-weekly-report.json: 週次レポートcron設定

## 対象サイト

- ESTA関連サイト
- ETIAS関連サイト
- K-ETA関連サイト
- France関連サイト
- U-KETA関連サイト

---

## Bot役割・体制

| Bot | 役割 | Tailscale IP | ユーザー名 |
|-----|------|-------------|-----------|
| **tomomi** | 管理者・統括 | 100.68.144.128 | takashi.hasegawa |
| **taro** | 開発・記事作成 | 100.122.26.7 | taro.hasegawa |
| **jiro** | 開発・記事作成 | 100.112.156.89 | jiro.hasegawa |
| **saburo** | 開発・記事作成 | 100.82.52.10 | saburo.hasegawa |

## SSH接続情報

```bash
ssh taro.hasegawa@100.122.26.7
ssh jiro.hasegawa@100.112.156.89
ssh saburo.hasegawa@100.82.52.10
```

## ルール

- **作業開始時にこのファイルを必ず読み込むこと**
- **作業完了後は実施内容・学んだことを必ずこのファイルに追記すること**
- 分析は実データに基づいて行うこと（仮定ではなくAPIで取得して確認）
- レポートはDiscordの#分析レポートチャンネル（1481647403902959728）に投稿
