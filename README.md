くるんなび
=========

画面上に解説を被せるライブラリです。
画面をクリックすると読んだ事をlocalStorageに記録して次回表示されなくなります。
呼称はlocalStorageに記録するさいの名称に使っています。
JSONファイルは
テキストが
    "｛呼称｝": {"query" : "｛要素のクエリー｝", "align" : "｛右揃えか左揃え｝", "msg" : "｛テキスト｝"}
タイトル画像は
    "｛呼称｝": {"query" : "｛要素のクエリー｝", "align" : "｛画像パス｝", "msg" : "｛alt｝"}

丸文字矢印の向きは3時方向を基準に時計回りの角度を数値で入力下さい。矢印が必要無い場合は-1としてください。

[サンプル](https://tools.uda2.com/numpointer.html "サンプル")

使い方
---------------------------------
curunavigate.js をダウンロードして、HTMLファイルから読み込んで下さい。

    <script src="curunavigate.min.js"></script>

あとは通常通りimgタグで画像を貼り付け、矢印を付けたい画像タグを選んでJSONを指定するだけです。
	new numPointer("｛画像のセレクター｝",｛JSON｝,｛オプション｝);

例えば下記のような感じです。
    <script>
    new curunNavigate({
    "start": {"query" : "#start", "align" : "./images/title.png", "msg" : "くるんなび"},
    "button": {"query" : "#button", "align" : "left", "msg" : "ここを押して下さい"}
    });
    </script>

![キリン](/numpointer_ytools.jpg)
