---
title: 'awsのObservability Workshopをやってみた'
excerpt: 'GW暇だったのでawsのObservability Workshopをやってみたときのおぼえがき'
coverImage: '/assets/blog/aws-observability-workshop/xray.jpg'
date: '2021-05-03'
author:
  name: nagu
  picture: '/assets/blog/authors/nagu.jpg'
ogImage:
  url: '/assets/blog/aws-observability-workshop/xray.jpg'
---

## 概要
GWどこにもいけないので退屈していたところ、ネットサーフィンをしててこんな記事が目に入った。
[https://dev.classmethod.jp/articles/observability-workshop-new-contents-prometheus-grafana-and-opentelemetry/:embed:cite]

AWSがなんかワークショップを公開してるらしい。しかも3〜4時間くらいで可観測性について一通りさらえるとか。
僕は監視プラットフォームチームにいるけど現場でトレーシングをどう活用してるのか実感が湧いてなかったのでやってみることにした。

講師もおらず資料だけなので得られることは多くはなさそうだけど、これを機にクラウド（AWS）環境下での可観測性についてどう実現しているのか覗いてみようと思う。

参考にしたワークショップはこちら。
[https://observability.workshop.aws/ja/:embed:cite]

## 気になったところ

### トレーシング（X-Ray）
[https://docs.aws.amazon.com/ja_jp/xray/latest/devguide/aws-xray.html:embed:cite]

どのコンポーネントとの通信でレイテンシが悪化しているのか（原因特定）にトレーシングが利用できる

時間帯別ではレイテンシが速い/遅いが区別できないため、時間による影響ではない
→ 各コンポーネントのレスポンスタイムを見てみるとS3から特定条件の画像データをGETするときに時間がかかってそう
→ レスポンスが速い山と遅い山の2つあり、リクエストの半分近くが遅い山にあるのでここが原因というアタリがつく

ワークショップでは大体こんなストーリーだったと思う。

![aws-observavility-ws-xray](/assets/blog/aws-observability-workshop/xray.jpg "aws-observavility-ws-xray")

アタリがついたので実際にワークショップ用アプリのコードを見てたらそれっぽい箇所も見つけた

https://github.com/aws-samples/one-observability-demo/blob/f89628f7a7c15f20b7da7e6d43558289db2941c1/PetAdoptions/petsearch/petsearch/Controllers/SearchController.cs#L132-L133

### エンドポイントの監視（Synthetics）
外形監視っぽく利用者がいない状況（深夜など）でも外からエンドポイントを叩いて異常がないかを見れる。

エンドポイントの可用性やレンテンシの記録をしてくれて、uiテストのときは適宜スクリーンショットが保存できるようになってる。
資料ではuiのテストとapiエンドポイントのテスト2通りがあってuiとapiでエンドポイント名が微妙に違うところでハマった。。

### ログ・メトリクス（CloudWatch - ログ、メトリクス）
普段利用してるプロダクトとの差分について見てた。
それぞれの良いところや惜しいところが発見できて楽しかった。

## よくわからなかったこと
Contributor Insights が薄すぎてどういう用途で使うのかなど全然わからなかった。

## その他雑感
AWSっていうまとまりの中で提供される監視サービスは連携がスムーズなので使ってて気持ちいい。
ただ、AWS慣れしてないため一つ一つの操作に時間がかかってしまったことと、多分現場で講師が解説してくれるところを調べる必要があったので3〜4時間ではとても終わらなかった。（スペシャリストからのインプットは効率的だなぁ。。）

慣れてない中、ワークショップ環境の削除スクリプトがうまく動かず各種設定を手で削除して回ったのが大変だった。
しかも削除忘れがあったようで、次の日起きたら1,500円くらい請求がｷﾃﾀ…会社の勉強費用補助制度使わせてもらおう。

今回はじめる動機になった記事にはPrometheus、Grafanaの項目が追加されましたイェイイェイって感じだったけど、ワークショップ環境を東京リージョンで作った傍ら、AMP, AMGは東京リージョンで利用できなかったので面倒くさくなって投げた。
今度適当にインスタンス建てて触ってみたい。

こういう監視やテストとかのプラクティスをインプットするときに、実際に稼働していて利用ユーザがいる適当なアプリケーションがほしくなるけど、手持ちが無くて辛い経験を何度か味わっているので手持ちを増やしたいなぁ〜。

おしまい(¦3[___]