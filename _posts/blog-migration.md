---
title: 'はてなブログからNext.js + Vercel + GitHubに移行した'
excerpt: 'はてなブログからNext.js + Vercel + GitHubに移行した'
coverImage: '/assets/blog/blog-migration/lighthouse_result.jpg'
date: '2021-08-22'
author:
  name: nagu
  picture: '/assets/blog/authors/nagu.jpg'
ogImage:
  url: '/assets/blog/blog-migration/lighthouse_result.jpg'
---

## 引っ越し理由

これまではてなブログをほそぼそと使っていた。無課金者へ提供している機能は申し分ないし課金したら更にパワフルになるけどエントリ作成画面がしっくり来なかった。  
自分が飽き性なのも引っ越しを後押しした理由だと思う。<https://nagu.dev> で少し馴染みがあった Next.js を使って改めてブログを組み立ててみた。

Next.js + Vercel + GitHub にした理由は大きく下記の3つ。

- 慣れ親しんでる visual studio code でエントリを書きたい
- markdownでコンテンツを（GitHubに）保持しておいて別環境へ移行するのを楽にしたい
- 最近のフロントエンド周りをキャッチアップしたい

モノ自体はGitHubで管理してる。

<https://github.com/csnagu/blog_next>

上記の以降理由3つは今の所全部叶っている。はてなブログと比較して物足りないと思うのはやっぱりリンクカードだったりはてなスターだったりの存在だと思う。ここらへんも似たものをブログに付けてみたい。

## 作り出しから現在まで

- Next.js examples の[ブログスターターキット](https://github.com/vercel/next.js/tree/canary/examples/blog-starter-typescript)で雛形作成
- gfm対応やprism.js、web fontを使ったりして体裁の整え
  - 一部バグってるから対応検討中
- SNS共有ボタンを[設置](https://github.com/csnagu/blog_next/commit/057a766c47b04f629dd3062a150a5dc1139ac3ef)
  - react-share がめちゃ便利
- リンク付き目次を[自動生成](https://github.com/csnagu/blog_next/commit/f061bfff46c000a8679c232d66d2a9319040a96c)
  - react-markdown-heading と remark-slug で自動生成
- GAを[導入](https://github.com/csnagu/blog_next/commit/2c63501820cb1ee58060e721608eb5b456b71f54)
- Push時に[Lighthouse CIが走る](https://github.com/csnagu/blog_next/commit/ff5595c62d46a30774ae84cf7cd0d6f723a236b0)ようにする

トップページをLighthouseにかけるとPerformanceが100。気持ちいい。  
Performance以外の項目を改善したり、機能追加したりしたときの参考として使えるので良さそう。

![lighthouse result](/assets/blog/blog-migration/lighthouse_result.jpg "lighthouse result")

## imageの管理

主にブログのエントリ内でだけ使う画像をどこで管理するか悩んだ。

- 素直にassetsディレクトリに放り込む
- GitHubで画像用のブランチを切って管理する
- GitHubのIssueに画像を貼ってリンクする
- GyazoやGoogle Photosなどのサービスを使う
- S3などのオブジェクトストレージを使う
- git lfsを使う

調べたらだいたいこのくらい手段がありそうだった。git lfsがいいかなとか考えていた矢先、まさかのvercel側がgit lfs非対応。。

[Feature Requestが出ている](https://github.com/vercel/vercel/discussions/3716)から今後に期待ということで、現在はデータのサイズがそんなに大きくないということもあってブログのリポジトリにそのまま放り込むことにしてる。

## ブラウザでvscodeを開いてそのまま編集できる

話は少し逸れて、GitHub上で `.` キーを押すと Visual Studio Code が起動するようになっていた。このエントリもブラウザから書いてみてる。書いてる途中で一度画面が真っ黒になったので安定性が向上してほしいけど、markdownファイルみたいなドキュメントをvscodeで書きたいときには一つの選択肢になるのではと思った。

## 回顧録

急に色々思い出してきたからこれまでのブログの変遷をまとめてみた。改めて見るとだいぶフラフラしてる。

1. FC2ブログ
2. WordPress on 自宅サーバ
3. WordPress on レンタルサーバ
4. Blogger
5. はてなブログ
6. Gatsby.js + Netlify + GitHub
7. はてなブログ
8. Next.js + Vercel + GitHub

FC2ブログは最初にブログを作ったところだったと思う。「ブログ 無料 おすすめ」みたいなキーワードで検索して誰かが推していたから使ってた気がする。黒歴史なのでエントリ全削除後に閉鎖済み。

続いて自宅サーバを立てていた頃にWebサーバを公開したくて、WordPressを入れて遊んでいた。このときに独自ドメインをはじめて取得した記憶がある。結局、自宅サーバは電源落としたんだけどWordPressのパワフルさに取り憑かれてレンタルサーバ上に入れて使っていた。このときメインのブログとは別に、無料レンタルサーバと無料ドメインを使って3サイトくらい作ってた記憶がある。。

WordPressに飽き始めた頃、Bloggerを使い始めたが好みのテンプレートがなくてすぐにやめた。　　
このときWordPressのエントリをエクスポートしておらずレンタルサーバの契約が切れてデータロストする。

ちょうどエンジニアの間ではてなブログが流行りだした頃に流行りに乗って開設した。いい話。

はてなブログの表示遅くね、って思いが強くなってしまって当時SSGで有名だったGatsby.jsを使い始める。はてなブログのエントリをエクスポートしてmarkdown形式に直していく作業がつらすぎて泣きながらやってた。この頃Lighthouseの存在を知ったのだけどPerformanceの項目が `100` になっていて度肝抜かれた記憶がある。

Gatsby.js使ってて「あれ、ブログエントリを書くべきなのにブログいじってばっかじゃん」と気が付きはてなブログに回帰する。またブログ移行することがあったときのためにエントリは全部markdownで書くんじゃ！と意気込んでいたものの、どうにも編集画面が使いづらいのと、Gatsby.js使ってた頃の爆速感が頭から離れずずっとモヤモヤしてた。

ホームページ（<https://nagu.dev>）を Next.js と Tailwind CSS で仕上げていて少し馴染みがあったのと、Vercelへのデプロイ体験が良すぎたので Next.js でブログを作ろうと思った。そして今に至る。

---

気持ちを新たにエントリ書いていきます ٩( ᐛ )و