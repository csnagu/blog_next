---
title: "Reactのチュートリアルをやってみる"
excerpt: "2021年の暮れにReactチュートリアルをやってみた話"
coverImage: "/assets/blog/blog-migration/lighthouse_result.jpg"
date: "2021-11-21"
author:
  name: nagu
  picture: "/assets/blog/authors/nagu.jpg"
ogImage:
  url: "/assets/blog/blog-migration/lighthouse_result.jpg"
marp: true
---

## なにこれ

React のチュートリアルをやってみて知見とかをまとめる。

- https://ja.reactjs.org/tutorial/tutorial.html

前提

- Vue.js の SPA を昔書いたことがある
- ブログを Next.js で組み立ている

## モチベーション

- Next.js の中で使われている React の理解を深める
- 世の中のスタンダードっぽいフロントエンドフレームワークを知る

## React とは

- UI を構築するための宣言型\*1 の JS ライブラリ
- UI をコンポーネントという小さく独立した部品を使って組み立てる
- JSX 構文を使って記述する
  - `<div />` は `React.createElement('div')` に変換される

（JSX の例）

```js
render() {
  return (
    <div className="shopping-list">
    ...
  );
}
```

\*1 宣言型（宣言的） → [宣言的 UI が何か分からなかったので調べてみた
](https://zenn.dev/arei/articles/f59e263aa3edf2)

## ステートとステートのリフトアップ

- state は上位コンポーネントから下位コンポーネントに渡せるしその逆もできる
- 下位コンポーネントの state を上位コンポーネントで再定義し、 state を操作する関数を定義して、下位コンポーネントへ渡すことをステートのリフトアップという
  - リファクタリングでよく使うらしい。state を集約したいときに便利そうだ

## 関数コンポーネント

- render メソッドだけをもち、自身で state を持たないコンポーネントをシンプルに書くための方法

```js
class Square extends React.Component {
  render() {
    return (
      <button className="square" onClick={...}>{this.props.value}</button>
    );
  }
}
```

↓ 関数コンポーネント化

```js
function Square(props) {
  return (
    <button className="square" onClick={...}>{props.value}</button>
  );
}
```

## React 要素の受け渡し

- React 要素は Javascript オブジェクトとして扱う → 関数等に受け渡しができる
  - `map()` メソッドで React 要素を複数個生成してまとめてレンダリングできる

```js
render() {
  const hoge = array_var.map((val, idx) => {
    return (
      <li>
        <button>{this.state.value}</button>
      </li>
    );
  });

  <div className="info">
    <ol>{hoge}</ol>
  </div>
}
```

## list 要素の key

- React はリスト要素の順番や内容の変更について key をみることでレンダリングを最適化している
- key は関連するコンポーネント間で一意であれば OK
  - グローバルに一意である必要はない
- インデックス番号を key に割り当てるのはアンチパターン
  - list 要素生成のタイミングで key が入れ替わることがある

```html
<li>Alexa: 7 tasks left</li>
<li>Ben: 5 tasks left</li>
```

↓

```html
<li key="Alexa">Alexa: 7 tasks left</li>
<li key="Ben">Ben: 5 tasks left</li>
```

react がよしなにやってくれてるところが多くてハマりどころが多そうなイメージ。  
とりあえず触ってみたって感じだった。٩( ᐛ )و
