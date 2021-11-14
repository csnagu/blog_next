---
title: "Siri を使って Todoist にタスクを作成する"
excerpt: "Siri を使って日本語による音声入力で Todoist にタスクを追加する。"
coverImage: "/assets/blog/default/cover.jpg"
date: "2021-11-14"
author:
  name: nagu
  picture: "/assets/blog/authors/nagu.jpg"
ogImage:
  url: "/assets/blog/default/cover.jpg"
---

## やること

iPhone の「Hey Siri」を経由して Todoist にタスクを追加する。  
何も設定しない素の状態だと使い物にならなかったので iOS のショートカットを使って解決する。

一度に複数タスクを追加できないのがモヤモヤするが、問題なさそうなので放置。

## モチベーション

Hey, Siri を起点にハンズフリーで Todoist にサッとタスクを追加したい時がたまによくある。  
しかし「Hey Siri、Todoist に OOO を追加して」と言っても iPhone のリマインダーに追加されてしまう。  
調べてみた感じ Siri の操作対象からリマインダーを除く方法もよくわからなかった。

ちなみに Todoist は日本語入力の時は「トドイスト」と発音しなければならない。[公式](https://todoist.com/ja/help/articles/using-siri-with-todoist)にも書いてる。

> Todoist（トゥードゥイスト）を「トドイスト」などと発音しなくてはいけないかもしれません。

¯\\\_(ツ)\_/¯

## Todosit にタスクを追加するショートカットを作成する

こんなショートカットを iPhone に作成する。

![shortcut example](/assets/blog/siri-todoist-add-task/shortcut_example.jpg)

ポイント

- ショートカット名は「Hey, Siri」の後に話しかけるキーワードになる
  - 例だと「Hey, Siri タスクを追加」と話しかけることでショートカットを起動する
- タスク追加には `毎回尋ねる` を入れる
  - ショートカット起動の時に表示上は `テキスト` になる
- `実行時に表示` を OFF にする
  - ON の場合は実行のたびに画面上の「完了」をタップする必要がある
- 追加後に Todoist アプリを開くようにする
  - Todoist アプリを表示することを契機にデータの同期をしていそう
  - PC や他のスマホからも Todoist を使ってる場合は即時同期される

## 使い方

1. 「Hey, Siri タスクを追加」
2. （Siri の応答）
3. 「ブログを書く」

と、ここまで書いてたら公式サイトにも書いてあった。

→ [Todoist on iOS のショートカットを使う](https://todoist.com/ja/help/articles/use-shortcuts-with-todoist-on-ios)

ほいでは ٩( ᐛ )و
