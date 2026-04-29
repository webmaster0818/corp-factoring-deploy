# Discord メンション送信ガイド

## 重要な原則

**❌ 間違った方法:**
- `@MediaXAI` - 名前でメンション（動作しない）
- `@mediaxai.` - ユーザー名でメンション（動作しない）
- `1477147915003760690` - IDだけ（曖昧で拒否される）

**✅ 正しい方法:**
- `<@1477147915003760690>` - メンション形式（テキスト内）
- `user:1477147915003760690` - ターゲット形式（message tool使用時）

## 重要人物のDiscord ユーザーID

### 確認済み

**重要人物:**
- **MediaXAI**: `1477147915003760690`
  - username: `mediaxai.`
  - global_name: `MediaXAI`
- **okina**: `1147443308788977664`
  - username: `okinahayashi`
  - global_name: `okina`
- **mi26rock**: `837853430738452480`
  - username: `mi26rock8069`
  - global_name: `mi26rock`

**各Bot:**
- **tomomi**: `1477900671482331258` (tomomi#6448)
- **taro**: `1479749249439629343` (taro#5436)
- **jiro**: `1479755047289225399` (jiro#6890)
- **saburo**: `1479756729867829319` (saburo#9992)

## メンション送信の実装例

### 1. テキストメッセージ内でメンションする場合

```javascript
// 間違った例（動作しない）
message(
  action="send",
  channel="discord",
  target="channel:1477901397532868701",
  message="@MediaXAI タスク完了しました"
)

// 正しい例
message(
  action="send",
  channel="discord",
  target="channel:1477901397532868701",
  message="<@1477147915003760690> タスク完了しました"
)
```

### 2. 複数人にメンションする場合

```javascript
message(
  action="send",
  channel="discord",
  target="channel:1477901397532868701",
  message="<@1477147915003760690> <@okina_user_id> <@mi26rock_user_id> 全員確認お願いします"
)
```

### 3. DMを送信する場合（ターゲット形式）

```javascript
message(
  action="send",
  channel="discord",
  target="user:1477147915003760690",
  message="タスク完了しました"
)
```

## よくある間違いと修正方法

### 問題1: 名前でメンションしようとする
```
❌ "@MediaXAI タスク完了"
✅ "<@1477147915003760690> タスク完了"
```

### 問題2: IDをそのまま使う
```
❌ "1477147915003760690 タスク完了"
✅ "<@1477147915003760690> タスク完了"
```

### 問題3: message tool の target に名前を使う
```
❌ target="MediaXAI"
✅ target="user:1477147915003760690"
```

## 実装チェックリスト

各Botが実装時に確認すべき項目:

- [ ] ユーザーIDを数値形式で保持している
- [ ] メンション文字列を `<@{userId}>` 形式で生成している
- [ ] message tool の target に `user:{userId}` 形式を使用している
- [ ] 名前やユーザー名ではなくIDを使用している

## ユーザーIDの取得方法

### 方法1: message tool の member-info を使用

```javascript
message(
  action="member-info",
  channel="discord",
  guildId="1477901396732018781",
  userId="1477147915003760690"
)
```

### 方法2: Discord Developer Mode で直接コピー

1. Discord設定 → 詳細設定 → 開発者モードをON
2. ユーザーを右クリック → ユーザーIDをコピー

## 参考資料

- OpenClaw Discord ドキュメント: `/opt/homebrew/lib/node_modules/openclaw/docs/channels/discord.md`
- DM target形式: `user:<id>` または `<@id>` メンション

---

**作成日**: 2026-03-18  
**最終更新**: 2026-03-18  
**作成者**: tomomi
