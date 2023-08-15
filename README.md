くるんなび
=========

画面上に解説を被せるライブラリです。
画面をクリックすると読んだ事をlocalStorageに記録して次回表示されなくなります。
呼称はlocalStorageに記録するさいの名称に使っています。

JSONファイル
---------------------------------
テキストが

    "｛呼称｝": {"query" : "｛要素のクエリー｝", "align" : "｛右揃えか左揃え｝", "msg" : "｛テキスト｝"}

タイトル画像は

    "｛呼称｝": {"query" : "｛要素のクエリー｝", "align" : "｛画像パス｝", "msg" : "｛alt｝"}

[サンプル](https://tools.uda2.com/curunavigate/ "サンプル")

使い方
---------------------------------
curunavigate.css をダウンロードして、HTMLファイルから読み込んで下さい。

    <link href="numpointer.css" rel="stylesheet">
    
curunavigate.js をダウンロードして、HTMLファイルから読み込んで下さい。

    <script src="curunavigate.min.js"></script>

あとは通常通りimgタグで画像を貼り付け、矢印を付けたい画像タグを選んでJSONを指定するだけです。

	new numPointer("｛画像のセレクター｝",｛JSON｝,｛オプション｝);

例えば下記のような感じです。

    <script>
    new curunNavigate({
    "start": {"query" : "#start", "align" : "title.png", "msg" : "くるんなび"},
    "button": {"query" : "#button", "align" : "left", "msg" : "ここを押して下さい"}
    });
    </script>
