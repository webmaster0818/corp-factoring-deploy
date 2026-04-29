# Tailscale SSH 接続情報

**最終更新:** 2026-04-03

## 全Bot Tailscale IP一覧

| Bot | Tailscale IP | ユーザー名 | ホスト名 |
|-----|-------------|-----------|---------|
| **tomomi** | 100.68.144.128 | takashi.hasegawa | takashihasegawanoMac-mini.local |
| **taro** | 100.122.26.7 | taro.hasegawa | tarohasegawanoMac-mini.local |
| **jiro** | 100.112.156.89 | jiro.hasegawa | jirohasegawanoMac-mini.local |
| **saburo** | 100.82.52.10 | saburo.hasegawa | saburohasegawanoMac-mini.local |

## SSH接続方法

### tomomi から他のBotへ

```bash
# taro へ接続
ssh taro.hasegawa@100.122.26.7

# jiro へ接続
ssh jiro.hasegawa@100.112.156.89

# saburo へ接続
ssh saburo.hasegawa@100.82.52.10
```

### 他のBotから tomomi へ

```bash
ssh takashi.hasegawa@100.68.144.128
```

### Bot間の相互接続

全てのBotは相互にSSH接続が可能です。例：

```bash
# taro から jiro へ
ssh jiro.hasegawa@100.112.156.89

# jiro から saburo へ
ssh saburo.hasegawa@100.82.52.10

# saburo から taro へ
ssh taro.hasegawa@100.122.26.7
```

## 特徴

✅ **パスワード不要**: Tailscale SSHは自動認証されます
✅ **IP固定**: Tailscale IPは変わらないため、設定変更不要
✅ **外部アクセス**: Tailscaleネットワーク経由で、どこからでもアクセス可能
✅ **セキュア**: 暗号化された接続で安全

## よく使うコマンド

### リモートでコマンド実行

```bash
# taro のステータス確認
ssh taro.hasegawa@100.122.26.7 "openclaw status"

# jiro のワークスペース確認
ssh jiro.hasegawa@100.112.156.89 "ls -la ~/.openclaw/workspace/"

# saburo のGateway再起動
ssh saburo.hasegawa@100.82.52.10 "openclaw gateway restart"
```

### ファイル転送

```bash
# tomomi から taro へファイル転送
scp /path/to/file taro.hasegawa@100.122.26.7:~/.openclaw/workspace/

# jiro から tomomi へファイル取得
scp jiro.hasegawa@100.112.156.89:~/.openclaw/workspace/file.md ./
```

## トラブルシューティング

### Host key verification failed が出た場合

```bash
ssh -o StrictHostKeyChecking=no user@ip
```

初回接続時に known_hosts に登録されます。

### 接続できない場合

1. Tailscale が起動しているか確認
   ```bash
   tailscale status
   ```

2. Tailscale SSH が有効か確認
   ```bash
   tailscale up --ssh
   ```

3. 相手のIPアドレスが正しいか確認
   ```bash
   tailscale ip -4
   ```

## 関連ドキュメント

- SOUL.md: 各BotのSOUL.mdにもTailscale SSH情報が記載されています
- token-dashboard.sh: Tailscale IP経由で各Botのトークン状況を取得
