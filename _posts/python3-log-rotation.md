---
title: 'python3のloggingモジュールを使ってサイズ・時間別にログローテートする'
excerpt: 'python3のloggingモジュールを使ってサイズ・時間別にログローテートする'
coverImage: '/assets/blog/default/cover.jpg'
date: '2020-08-15'
author:
  name: nagu
  picture: '/assets/blog/authors/nagu.jpg'
ogImage:
  url: '/assets/blog/default/cover.jpg'
---

## 概要

最近 Python3 のログ出力部分を書いていて、ログローテートに関連した日本語のエントリが少なかったので備忘録的に残しておく。
それと実際にログをプログラム中に仕込むときに `--debug` オプションをつけてより詳細なログが出せるようにもしたのでメモしておく。

## ファイルサイズベース・時間ベースのログローテート

ファイルサイズベースのときは `RotatingFileHandler` 、時間ベースのときは `TimedRotatingFileHandler` を使用する。

```python:title=make_logs.py
import logging
import logging.handlers
import time

LOG_FILE = "/tmp/app.log"

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

# サイズベースのローテーション
handler = logging.handlers.RotatingFileHandler(
    LOG_FILE,
    maxBytes=100,
    backupCount=9
)

# 時間ベースのローテーション
# handler = logging.handlers.TimedRotatingFileHandler(
#     LOG_FILE,
#     when='S',
#     interval=1,
#     backupCount=10
# )
handler.suffix = '%Y%m%d%H%M%S'

logger.addHandler(handler)

while True:
    logger.critical('critical')
    logger.error('error')
    logger.warning('warning')
    logger.info('info')
    logger.debug('debug')
    time.sleep(2.5)

```

<details><summary>出力例</summary>

```
# サイズベース
$ python make_logs.py
$ ls -l /tmp/
total 24
-rw-r--r-- 1 root root 34 Aug 15 14:51 app.log
-rw-r--r-- 1 root root 93 Aug 15 14:51 app.log.1
-rw-r--r-- 1 root root 96 Aug 15 14:51 app.log.2
...
```

```
# 時間ベース
$ python make_logs.py
$ ls -l /tmp/
total 24
-rw-r--r-- 1 root root 34 Aug 15 15:01 app.log
-rw-r--r-- 1 root root 34 Aug 15 15:01 app.log.20200815150108
-rw-r--r-- 1 root root 34 Aug 15 15:01 app.log.20200815150110
...
```

</details>

## オプション引数で DEBUG レベルのログまで出力する

普段は DEBUG レベルのログまで出しているとリソースがもったいないので、通常は INFO レベルまでのログを出力し `--debug` 引数があるときに debug レベルまでログを表示するときはこんな感じに書いた。

```python:title=make_logs.py
import argparse
import logging
import logging.handlers

LOG_FILE = "/tmp/app.log"

parser = argparse.ArgumentParser()
parser.add_argument('--debug', help='optional', action='store_true')
args = parser.parse_args()

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)
formatter = logging.Formatter(
    '%(asctime)s [%(filename)s:%(lineno)d] %(levelname)-8s %(message)s'
)
handler = logging.FileHandler(LOG_FILE)
handler.setFormatter(formatter)
logger.addHandler(handler)

if (args.debug):
    logger.setLevel(logging.DEBUG)

logger.critical('critical')
logger.error('error')
logger.warning('warning')
logger.info('info')
logger.debug('debug')
```

`logger.setLevel(logging.INFO)` で INFO ログまで出すようにし、argparser によって `--debug` オプション受け取った際に `logger.setLevel(logging.DEBUG)` でログレベルを再設定する。

<details><summary>出力例</summary>

```
$ python make_logs.py
$ cat /tmp/app.log
2020-08-15 14:30:47,526 [make_logs.py:23] CRITICAL critical
2020-08-15 14:30:47,526 [make_logs.py:24] ERROR    error
2020-08-15 14:30:47,526 [make_logs.py:25] WARNING  warning
2020-08-15 14:30:47,526 [make_logs.py:26] INFO     info
```

```
$ python make_logs.py --debug
$ cat /tmp/app.log
2020-08-15 14:31:29,198 [make_logs.py:23] CRITICAL critical
2020-08-15 14:31:29,198 [make_logs.py:24] ERROR    error
2020-08-15 14:31:29,198 [make_logs.py:25] WARNING  warning
2020-08-15 14:31:29,198 [make_logs.py:26] INFO     info
2020-08-15 14:31:29,198 [make_logs.py:27] DEBUG    debug
```

</details>

## 参考

- [Python でロギングを学ぼう](https://qiita.com/__init__/items/91e5841ed53d55a7895e)
- [Python のロギングを覚えた](https://qiita.com/shotakaha/items/0fa2db1dc8253c83e2bb)
- [Logging クックブック](https://docs.python.org/ja/3/howto/logging-cookbook.html)
- [logging.handlers](https://docs.python.org/ja/3/library/logging.handlers.html)

これ書いてて思ったけど参考にある[Python のロギングを覚えた](https://qiita.com/shotakaha/items/0fa2db1dc8253c83e2bb)でやっている Logger 名を引数で受けて Logger オブジェクトを返す関数、すごく便利そうだし他の箇所でも再利用できそう。
次回またログ出力部分を実装するときはメソッドかクラスで定義すると良さそうに思った。

おしまい(¦3[___]