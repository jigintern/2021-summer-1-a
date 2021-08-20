# 2021 夏インターン 第 1 回 A チーム

![l](https://user-images.githubusercontent.com/44780846/130186001-99c73b15-44a9-48fc-bab7-e86260e0e15d.png)

> pulchra(ぷるくら)

あまり旅行慣れしていない学生にトレンドの観光地を提案し、メジャーで"失敗しない"旅行先を提供するWebアプリ

## スクリーンショット

![Screenshot 2021-08-20 at 17-57-42 pulchra (小)](https://user-images.githubusercontent.com/44780846/130209168-7247173e-9a78-4e80-a22f-7497e007a56a.png)

## 準備

1. [楽天 API](https://webservice.rakuten.co.jp/document/)のアプリ ID を取得します
2. [pixabay](https://pixabay.com/ja/)の API アクセスキーを取得します
3. ルートディレクトリに `.env` ファイルを以下のような内容で作成します

```
   RAKUTEN_APP_ID=xxxxxxx
   PIXABAY_KEY=xxxxxxxx
```

## 実行

```sh
deno run -A ./main.js
```
