# CLAUDE.md - ui-prompts

**プロジェクト:** UIデザインプロンプト集
**最終更新:** 2026-04-08

---

## プロジェクト概要

フロントエンド開発・UIデザインのためのプロンプトテンプレート集。
アクセシビリティ、アニメーション、コンポーネント、レスポンシブ、UXリサーチなどカテゴリ別に整理。

## ディレクトリ構成

- accessibility/: アクセシビリティ関連プロンプト
- animation/: アニメーション関連プロンプト
- components/: コンポーネント設計プロンプト
- responsive/: レスポンシブデザインプロンプト
- ui-design/: UIデザインプロンプト
- ux-research/: UXリサーチプロンプト
- web-development/: Web開発プロンプト

## デザインルール

- Inter、Roboto、Arial、システムフォントは使用禁止
- 紫グラデーション x 白背景の配色は禁止
- Google Fontsから個性的なフォントを選ぶこと
- 色は3色以内、余白は大胆に
- モバイルファーストで設計

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
- UIを作る前に必ず ~/.claude/skills/frontend-design/SKILL.md を読み込むこと
