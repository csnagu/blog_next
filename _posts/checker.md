---
title: 'checker'
excerpt: 'excerpt text'
coverImage: '/assets/blog/checker/cover.jpg'
date: '2021-08-10T05:35:07.322Z'
author:
  name: nagu
  picture: '/assets/blog/authors/nagu.jpg'
ogImage:
  url: '/assets/blog/checker/cover.jpg'
---


# H1

hoge

## H2

fuga

### H3

piyo

#### H4

waro

##### H5

sori

,./<>?"':;{}[]-=+\_|!@#\$%^&\*\
abcdefghijklmnopqrstuvwxyz
ABCDEFGHIJKLMNOPQRSTUVWXYZ
あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわおん
アイウエオカキクケコサシスセトタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワオン
ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜｵﾝ
０１２３４５６７８９
0123456789

_Italic_
**strong**
**_Italic Strong_**
~~取り消し線~~

:+1
:+1:

Links

- [salted duck eggs](https://en.wikipedia.org/wiki/Salted_duck_egg).
- <https://en.wikipedia.org/wiki/Salted_duck_egg>

引用

> hoge
> fuga

List
Unordered

- アイテム
- item
  - nest item
    - 更にネスト

Ordered

1. age
2. sage

Task List

- [ ] unmarked
- [x] marked

Table

| First Header                | Second Header                |
| --------------------------- | ---------------------------- |
| Content from cell 1         | Content from cell 2          |
| Content in the first column | Content in the second column |

text `インラインコード` hoge

```js
const getTsundokuNum = async () => {
    // Dependencies
    const axios = require('axios');

    // Load bearer token
    const todoistBearer = process.env["TODOIST_BEARER"]

    // Todoist REST API
    // Get All Tasks
    const allTasks = await axios.get("https://api.todoist.com/rest/v1/tasks", {
        headers: {
            Authorization: `Bearer ${todoistBearer}`
        }
    }).then(response => {
        return response;
    }).catch(function (error) {
        console.error(error);
    })

    ... 中略 ...
}
module.exports = getTsundokuNum;
```

image
![Alt Text](/assets/blog/preview/cover.jpg "this is caption")