# yumemi-frontend-task

## 入門

1. nodejsのバージョン管理ソフト`volta`をインストール
2. RESAS API KEY を下記のサイトから会員登録し取得
    - https://opendata.resas-portal.go.jp/form.html
3. `.env.local`をコピーし、RESAS_API_KEYに対し上記から取得したトークンを代入
4. `yarn install` を実行し必要なパッケージをインストール
5. `yarn dev`を実行し、 http://localhost:3000 へアクセス

## 概要

### 各種リンク

- [フロントエンドコーディング試験](https://notion.yumemi.co.jp/0e9ef27b55704d7882aab55cc86c999d)
- [フロントエンドコーディング試験ワイヤーフレーム](https://notion.yumemi.co.jp/ab4a837f8e764dffb0fc93c7b1387af7)
- [ワイヤーフレーム - Figma](https://www.figma.com/file/qZWJeXzXWuIrXjKOtlqHib/Untitled?node-id=0%3A1)
- [Kanban - Trello](https://trello.com/w/yumemifrontendtask)

### CSSガイドライン

- RSCSS準拠 - [RSCSSとは](https://rfs.jp/sb/html-css/html-css-guide/rscss.html)
    - 粒度が低すぎるコンポーネントに関しては上記の限りではない。
- {ComponentName}.module.sass を使用すること。
- [css variable](https://developer.mozilla.org/ja/docs/Web/CSS/Using_CSS_custom_properties)を積極的に使用する

