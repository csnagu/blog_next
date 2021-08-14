---
title: 'macからwindowsに乗り換えるときにカーソル移動系のキーバインドを再現する'
excerpt: 'macOSのemacsライクなキーバインドのうち、カーソル移動系のキーバインドをWindows10で再現する'
coverImage: '/assets/blog/default/cover.jpg'
date: '2021-05-30'
author:
  name: nagu
  picture: '/assets/blog/authors/nagu.jpg'
ogImage:
  url: '/assets/blog/default/cover.jpg'
---

## やること

- macOSのemacsライクなキーバインドのうち、カーソル移動系のキーバインドをWindows10で再現する

ざっくりやっていること
1. Change KeyでCapsLockキーをF13に上書き
2. AutoHotkeyでF13を使ったカーソル移動系キーバーインドを設定する
3. vscodeでキーバインドを使えるようにする

元ネタ（参考）
- [https://qiita.com/riekure/items/49b941fa5159f9948313:title]
- [http://did2.blog64.fc2.com/blog-entry-349.html:title]
- [https://kokufu.blogspot.com/2019/05/vscode-ctrl-ctrlcapslock.html:title]


## 背景

2年前くらいに組んだデスクトップPCが図体デカい割に最近あまりゲームができておらず、宝の持ち腐れ感が大きくなってきた。スペックはそこそこ良いのにゲーム用途に限定するのはリソースがもったいないなーという思いもあり、普段使いしてるmacbook pro (2017)からの乗り換えを検討してみた（ちょうど最近MBPにもっさり感も感じていたし）。

開発環境の移行はさっくり終わった（WSL2＋Dockerすごい。。）けれど、macOSとWindowsの細かい違いがどうにも気になってしまい悶々とすることに。今回は悶々の一つである、macOSで使えていたカーソル移動系のキーバインドをWindows10で使えるようにしたのでメモしておく。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">MacのCtrl+a,e,f,b,p,nはほんと中毒になる</p>&mdash; なぐ (@cs_nagu) <a href="https://twitter.com/cs_nagu/status/1398646320135503872?ref_src=twsrc%5Etfw">May 29, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>


## CapsLockをF13に上書き

[Change Key](https://forest.watch.impress.co.jp/library/software/changekey/) でCapsLockをF13に割り当てる。

1. Change Keyを管理者権限で起動
2. CapsLockを選択
3. ソフトウェアキーボード右上のScan codeを選択
4. [0x0064(F13)](http://did2.blog64.fc2.com/blog-entry-349.html)を入力
5. 設定を登録してPCを再起動

## カーソル移動系のキーバインドを設定

[AutoHotkey](https://www.autohotkey.com/) でF13と各種キーを組み合わせてカーソル移動をセットする（ついでにDeleteや行削除、タブ移動も入れてみた）。

<script src="https://gist.github.com/csnagu/6bb68fdb076a9240aba5e352afa66551.js"></script>


やっつけで書いたのでAutoHotkey的な書き方ではないかもしれないがまずは動くことが大事なので(　ᐕ)


## visual studio code でも設定したキーバインドを使うために

CapsLockをF13に置き換えたがそのままVisual Studio Codeでキーバインドを利用しようとすると挙動が不安定になるため、settings.jsonの "keyboard.dispatch" のパラメータを変更する。

```json
{
    "keyboard.dispatch": "keyCode"
}
```

macOS（emacs）の一部キーバインドは中毒度が高い。特にカーソル移動やテキスト編集系のものは覚えてしまうとなかなか抜け出せない。
Windowsでのキーボード生活がだんだん快適になってきた٩( ᐛ )و
