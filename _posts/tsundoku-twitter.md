---
title: '積読が消化できないからTwitterに進捗を表示させて緊張感を出したことのおぼえがき'
excerpt: 'Twitter プロフィールに消化度合いを表示させると緊張感が出て捗るのでは？と思ったのでやってみた時のおぼえがき。'
coverImage: '/assets/blog/tsundoku-twitter/arch.jpg'
date: '2020-04-20'
author:
  name: nagu
  picture: '/assets/blog/authors/nagu.jpg'
ogImage:
  url: '/assets/blog/tsundoku-twitter/arch.jpg'
---

## はじめに

Twitter プロフィールに消化度合いを表示させると緊張感が出て捗るのでは？と思ったのでやってみた時のおぼえがき。
おまけで AWS Lambda へ自動デプロイする CI/CD チックな仕込みもやってみた。

本エントリで出てくるコードは GitHub で管理している。

[github.com](https://github.com/csnagu/pile-up-twitter)

GAS は gist。

[https://gist.github.com/csnagu/3f0e7f2a7fcf5ace1262f4c0f78e0212](https://gist.github.com/csnagu/3f0e7f2a7fcf5ace1262f4c0f78e0212)

## 動機

ふと買ったけど読んでいない本（積読）が一体どれだけあるのか気になり Todoist へ書き出してみた。

今読む読まないは別として、参考書だけで 70 冊ほどありこれはなんとかせねばと思いつつ、何もせずに 2 ヶ月経過したのでなにかしらの手を打つことにした。
3 秒くらい考えて「誰にも見られないから緊張感がないのでは？」と考えついたので積読消化の進捗を公開することに。
公開するからにはよく目にする場所のほうが緊張感が高まって良さそうだと思い日頃開いている Twitter を使うことにした。

この記事を読んで「こんなもの作ってる暇あったら 1 冊読め」と思った人。
僕も同じこと思いました。

## 構成

### 関連サービス

- GitHub ... コードのバージョン管理
- Twitter のプロフィールを更新
- CloudWatch ... Lambda を定期実行
- Todoist ... 積読を管理
- GoogleSpreadsheet ... 読み終わった書籍を管理
- Google App Script ... Todoist で完了したタスクを GoogleSpreadsheet に記録する
- IFTTT ... みんなの架け橋
- Twitter ... 緊張感を届ける

盛りだくさん！

### 構成図

![全体の構成図](/assets/blog/tsundoku-twitter/arch.jpg "全体の構成図")

Todoist と GoogleSpreadsheet の間に Google Apps Script（GAS）や IFTTT が抜けているんだけど図の修正が面倒なので割愛。

## 仕組み

### 積読と読了の管理・取得 - Todosit, GoogleSpreadsheet の使い分け

積読リストは適当なプロジェクトに分けておく（Project ID を後で使う）。
積読リストと読了リストの管理が別のアプリでややこしいが、Todoist の無料プランでは一日に完了にしたタスクを取得できないようなので割り切った。Todoist と GoogleSpreadsheet は GAS を書いて IFTTT で連携させておく。

- 非常に参考にしたサイト
  - [Todoist（無料プラン）で完了したタスクを日報に記録する方法。IFTTT+GoogleAppsScript(GAS)+Google ドキュメント | internetthingy](https://internetthingy.com/todoist-ifttt-gas-63.html)
- GoogleSpreadsheet に対応させたコード
  - [https://gist.github.com/csnagu/3f0e7f2a7fcf5ace1262f4c0f78e0212](https://gist.github.com/csnagu/3f0e7f2a7fcf5ace1262f4c0f78e0212)
- GoogleSpreadsheet の行数を取得するコード
  - [https://github.com/csnagu/pile-up-twitter/blob/master/getReadBooksNum.js](https://github.com/csnagu/pile-up-twitter/blob/master/getReadBooksNum.js)

一度積読を Todoist でリスト化してしまえば、読み終わったものを完了にすることであとは自動で回ってくれる。
賢い。

### OAuth 認証と TwitterAPI との戦い

公式リファレンスを読めば全部解決！
Twitter 公式リファレンス - Authentication: [https://developer.twitter.com/en/docs/basics/authentication/overview](https://developer.twitter.com/en/docs/basics/authentication/overview)

するほどの理解力がなかったので適当にググる。
npm oauth1.0a などのキーワードでググるとちょうど良さそうなのがあった。
ゆくゆくは AWS Lambda に乗せて走らせようとここらへんで思い立ったので、言語は node.js で書くことにした。

[www.npmjs.com](https://www.npmjs.com/package/oauth-1.0a)

あとは通信だが、昔使った[axios](https://github.com/axios/axios)を今回も使う。

- TwitterAPI を叩いてプロフィールを更新するコード
  - [https://github.com/csnagu/pile-up-twitter/blob/master/updateTwitterProfile.js](https://github.com/csnagu/pile-up-twitter/blob/master/updateTwitterProfile.js)

### Lambda で定期実行する - AWS Lambda と CloudWatch

試行錯誤の末、ローカルでクラウド環境で走らせる。
日に 1 回実行できればいいくらい、かつ、ローカルにファイルが必要ないため今回は Lmbda を選択した。
書いたコードがそのまま動くはずなので、あまり考えずに exports.handler の中に処理を押し込めて、zip で圧縮して Lambda へアップロードした。
これは利用しているパッケージが Lambda 上で利用できないため、node_modules も含めて zip で圧縮してアップロードする必要があるため。

Lambda 上で動くのを確認したら、Lambda の Designer 欄から「トリガーを追加」を選択し、CloudWatch Events/EventBridge にて 1 日 1 実行のルールを作成する。

- Lambda の定期実行で参考にしたサイト
  - [【AWS】lambda ファンクションを定期的に実行する - Qiita](https://qiita.com/Toshinori_Hayashi/items/5b0a72dc64ced91717c0)

素晴らしい、一日一回自動で実行される様になったのだ。
（プログラムは自動で走るが本は自動で読まれたりはしない。）

### 環境変数に敗北

せっかく一部 AWS Lambda に自動でデプロイできれば 10 割増しでクールに見えるだろう。
ここは非常にハマったので参考資料を適宜参照しよう。

- 参考
  - [https://developer.twitter.com/en/docs/basics/authentication/overview](https://developer.twitter.com/en/docs/basics/authentication/overview)
  - [GitHub Actions を使って AWS Lambda へ自動デプロイ (詳説＋デモ手順付き ver) - Qiita](https://qiita.com/homines22/items/412d4e81b24804d75205)
  - [Serverless Framework で AWS Lambda をデプロイ - Qiita](https://qiita.com/t_okkan/items/6843afba84d684068341)
  - [Serverless Framework Documentation](https://serverless.com/framework/docs/)
  - [今から始める Serverless Framework で簡単 Lambda 開発環境の構築 | Developers.IO](https://dev.classmethod.jp/articles/easy-deploy-of-lambda-with-serverless-framework/)

ここのハマリポイントとしては、Lambda 側の環境変数にどうやって値をセットするかという部分だ。
serverless.yml に environment として値を設定することで Lmbda 側の GitHub にアップロードするわけにはいかない。
GitHub Actions のジョブを定義している yml ファイルからのみのようで実現できなかった。うまいやり方が無いものか。。。
（そもそも秘密情報を環境変数で扱うのは間違っているような気がしていて、別の手がありそう。）

## 感想

async, await 周りの理解が拙くて、1 / 70 のような表記にしたかったのに NaN / undefined となってしまった。
また、Twitter で触れた OAuth や Todoist で触れた BearerToken 周りの理解が足りていなくて問題の切り分けがやりづらく感じたので上辺だけでも理解したいなと。
実装面やデプロイ面に関してはベストプラクティスのようなものがわからないまま突き進んでしまったので、このブログエントリを読んだ詳しい人教えて下さい。

何はともあれ AWS Lambda への自動デプロイができたので、今後似たようなことをやるときには割とすんなりできるようになっていると思う。

Twitter で確認できるようになったので（しかも自動更新！）、これで少しは捗るといいな。