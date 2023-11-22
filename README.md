# meme
memo editor

```
index.htmlは、同じフォルダのテキストデータの細部を表示し、それを編集するeditor.htmlを誘導する。
リンクは「editor.html」にパラメータの「file=xyz.txt」を渡す。
```
```
editor.htmlは、末尾のパラメータを取得して読み込むファイルを決定する。

editor.html?file=aaa.txt
なら「aaa.txt」である。
```
