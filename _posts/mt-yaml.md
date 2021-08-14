---
title: 'Ansible トレイルマップのMt.YAMLに登ってみた'
excerpt: 'Red Hat から出ている Ansible トレーニングの一つである Mt.YAML を登ってみたおぼえがき'
coverImage: 'https://www.redhat.com/cms/managed-files/step2_img.png'
date: '2021-08-08'
author:
  name: nagu
  picture: '/assets/blog/authors/nagu.jpg'
ogImage:
  url: 'https://www.redhat.com/cms/managed-files/step2_img.png'
---

## 背景
某所で一部Ansibleを使っていくことになって、ほとんど何も知らなかったのでTwitterで何もわからんbotになっていたら教えてもらいました。

[https://twitter.com/cs_nagu/status/1421097609104527363:embed#ansibleなんもわからん]
[https://twitter.com/cs_nagu/status/1421311537063481346:embed#ansible 入門 おすすめ ［教えて］]

↓

[https://twitter.com/sugitk/status/1421332570915016706:embed#@cs\_nagu https://t.co/Iquh26pgZQこういうのいかがでしょうか]

ありがとうございますmm

## Ansible トレイルマップとは

[https://www.redhat.com/ja/explore/ansible/trailmap:embed:cite]


> Ansibleトレイルマップは、Ansibleを学習し活用する過程を旅になぞらえてお伝えする手引書です。道に迷うことなく歩みを進め、Ansibleの世界を満喫しつつ経験を積み、楽しみながら自らの糧にできることを目指しています。

Red Hat から出ている & 完全日本語なので安心して取り組めそう。

## Mt.YAMLとは

[https://www.redhat.com/ja/explore/ansible/trailmap/yaml:title]

> ヤムル山では、Ansibleの基礎、自分自身の作業・タスクをAnsibleで自動化するために参考となる情報源やその活用方法について理解することができます。これからAnsibleを活用して自動化に取り組んでいこうとしている方におすすめの初級者コースです。

## Mt.YAMLをやってみたときの状態
* 業務でChefを使った構成管理を2年弱やってる
* YAMLﾁｮｯﾄﾜｶﾙ
* Ansibleなんもわからん

## Mt.YAMLを通して得られたもの

* Ansibleの簡単な用語や構成
* 変数、Loop、条件分岐、テンプレート、Roleなどの基本文法
* 実際に手を動かして環境の構成をいじる経験
* もっと知りたくなったときに参照するサイト

## 感想戦

### STEP1, 2, 3

Ansibleが解決する課題。Chefなどの他の構成管理ツールと概ね同じにみえる。
STEP2の「Ansible 自動化ジャーニー」は自動化のレベルがまとめられているので印象に残ってる。

Playbook、moduleなどの用語が整理されていて助かりました。Ansibleの基本用語集ありがたや～🙏

エージェントレスって聞いててどうやって動いてるんだ～と思っていたけど、Control Nodeというのがあるのか～など学びがあった。

下記のような図もちょくちょくあって理解が捗ってよきです。

![Ansible Mt.YAML](https://www.redhat.com/cms/managed-files/step3_fig2.png 'Ansible Mt.YAML')

### STEP4

実際にAnsibleをハンズオンっぽくPlaybookを書いて実行してみるターン。

[Katacoda](https://www.katacoda.com/)というブラウザでインタラクティブに操作しながら学べるプラットフォーム上にコンテンツや環境が用意されていて敷居がめちゃくちゃ低い。GithubアカウントやTwitterアカウント連携ですぐに使いはじめることができて便利。
Katacoda環境はExpireTimeが決まってるからちょっと休憩（n時間）をすると使ってた環境が綺麗になくなるからやるときは一気に走り切るのが吉。

> The environment has expired. Please refresh to get a new environment.

Chef cookbookとかの構成管理ツール経験があると複雑なことしない限り大体Ansible側の処理のマッピングができた（気がする）。
（関連領域の知識が活かされてるのを感じて気持ちよかった）

予め各種ディレクトリや *.yml ファイルが作られてるためtabキーの予測が効いてストレスなく進められた。細かい気配りに感謝。

### STEP5, 6

Ansibleを使っていくにあたってのノウハウがまとめられていた。必要になったときに読み返すと良さそう。

---

一日あれば十分に終わるボリューム感なのに学びが多くて良きでした。
わからない部分の調べ方もなんとなくわかってきたし、これでなんとか既存のコードを読み進められそうだ ٩( ᐛ )و