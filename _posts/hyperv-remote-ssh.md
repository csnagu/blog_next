---
title: 'MacからHyper-Vで作成したリモートの仮想マシンにSSH接続する'
excerpt: 'MacからHyper-Vで作成したリモートの仮想マシンにSSH接続する'
coverImage: '/assets/blog/hyperv-remote-ssh/diagram.jpg'
date: '2020-07-11'
author:
  name: nagu
  picture: '/assets/blog/authors/nagu.jpg'
ogImage:
  url: '/assets/blog/hyperv-remote-ssh/diagram.jpg'
---

## 概要

ガチャガチャ試行錯誤する際には手元の Mac の環境を汚したくないため仮想マシンを利用したのだが、如何せんディスク容量がへっぽこなため、ゲーミング用に組んだ Windows で仮想マシンを作成することにした。
仮想マシンにあまり馴染みが無く知らなかったのだけれど仮想マシンってホスト OS→ ゲスト OS は簡単にできるのに、同じネットワークにある適当なマシンから接続することが難しかった。
仮想マシンビギナーのみんなは同じ道にハマるのに（？）Google で検索してもこれ！というエントリがなかったため備忘録的にブログに落としておく。

構成としては下図のように、ホスト OS（Windows10）→ ゲスト OS（Centos8）が簡単に接続できるなら、ホスト OS を Mac→ ゲスト OS の踏み台にしてしまおうというアプローチを取る。

![リモートSSHのNW図](/assets/blog/hyperv-remote-ssh/diagram.jpg "リモートSSHのNW図")

## 前提・環境

- Hyper-V でゲスト OS を作成済み
- ホスト OS からゲスト OS へ SSH 接続できる

- Windows10 (18363)

## windows10 へ鍵認証で SSH 接続できるようにする

基本的には [Windows10 で OpenSSH サーバーを動かす](https://wave.hatenablog.com/entry/2019/02/23/080800) の手順を実施する。ポイントは 3 つ。

- PubkeyAuthentication yes を追記
- PasswordAuthentication no を指定
- Match Group administrators 以下をコメントアウト

`%PROGRAMDATA%\ssh\sshd_config` の差分は以下のようになるはず。

```bash
# sshd_configは編集後、sshd_config.bakは編集前のファイル
$ diff /tmp/sshd_config /tmp/sshd_config.bak
34,35d33
< PubkeyAuthentication yes
<
52c50
< PasswordAuthentication no
---
> # PasswordAuthentication yes
85,86c83,84
< #Match Group administrators
< #       AuthorizedKeysFile __PROGRAMDATA__/ssh/administrators_authorized_keys
---
> Match Group administrators
>        AuthorizedKeysFile __PROGRAMDATA__/ssh/administrators_authorized_keys
```

続いて Windows10 に認証で利用する公開鍵を設定する。今回一番詰まった。
Mac にて作成した公開鍵を Windows10 へ送信する。今回は意識が低いので scp で送信する。

Windows10 にて ssh-keygen をする。生成された id_rsa.pub をコピーして `authorized_keys` に名称を変更し、authorized_keys ファイルの中身を Mac の公開鍵で上書きする。
※ こんな面倒な手段をとっているのは `Permission denied (publickey,keyboard-interactive).` という権限周りでエラーが出たため。

ついでにデフォルトシェルを コマンドプロンプトから PowerShell に変えておく。
[OpenSSH : デフォルトシェルを変更する](https://www.server-world.info/query?os=Windows_Server_2019&p=ssh&f=5)

## ゲスト OS へ鍵認証で SSH 接続できるようにする

Mac の公開鍵をゲスト OS へ転送する。
ゲスト OS に Mac の公開鍵を転送して `.ssh/authorized_keys` に配置する。
先ほどと同様に `/etc/ssh/sshd_config` に

- PubkeyAuthentication yes
- PasswordAuthentication no

を指定する。

## proxycommand を利用して踏み台を意識せずにゲスト OS へアクセスする

`~/.ssh/config` ファイルを編集する。

```bash
Host fumidai
 HostName 192.168.0.1
 User <windowsのユーザ名>
 IdentityFile ~/.ssh/id_rsa

Host centos8
 HostName 172.168.0.1
 User <ゲストOSのユーザ名>
 ProxyCommand ssh -W %h:%p fumidai
```

`$ ssh centos8`で接続できれば OK。

## 雑感

雑に設定をいじりたいときに VM はめちゃめちゃ便利なのだけど、ノート PC だとマシンスペックの融通が効かないため何かと不自由する。似たような境遇に陥った際に再現できればと思う。
最近余っているノート PC でサーバを構築したんだけど使うことが無くなりそう。。
ポートフォワーディングしたい場合は別途 Localforward などの設定が必要になるので、細かい部分は使いながら調整していくことにする。

## 参考

- [Windows 用の踏み台サーバーに SSH 接続する！](https://qiita.com/1Kano/items/ea018abaae7ce5edbf73)
- [OpenSSH : デフォルトシェルを変更する](https://www.server-world.info/query?os=Windows_Server_2019&p=ssh&f=5)
- [Windows10 で OpenSSH サーバーを動かす](https://wave.hatenablog.com/entry/2019/02/23/080800)