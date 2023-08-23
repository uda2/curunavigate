くるんなび
=========

画面上にくるんとした矢印付きテキストを使った解説レイヤーを被せるライブラリです。  
デフォルトでは画面をクリックすると次の解説に進み、先ほどまで表示されていた解説は読了とlocalStorageに記録して次回表示されなくなります。
（ついでにスプラッシュ画像にも対応しております。）


解説JSON
---------------------------------
各解説はJSON形式で記入していく必要があります。書式は下記の通りです。

くるんとした矢印付きテキスト

    "｛呼称｝": {"query" : "《解説したい要素のクエリー》", "align" : "《right（右揃え）かleft（左揃え）》", "msg" : "《テキスト》"}

スプラッシュ画像

    "｛呼称｝": {"src" : "《解説したい画像パス》", "msg" : "《altの内容》"}

※ 呼称はlocalStorageに記録するさいの名称に使っています。


使い方
---------------------------------
curunavigate.css を所定の場所に配置して、HTMLファイルから読み込んで下さい。

    <link href="numpointer.css" rel="stylesheet">
    
curunavigate.min.js を所定の場所に配置して、HTMLファイルから読み込んで下さい。

    <script src="curunavigate.min.js"></script>

最後に先に説明した解説JSONを指定し、クリックの処理を入れて下さい。

	new curunNavigate(《解説JSON》,《オプション》);

例えば下記のような感じです。

    <script>
    window.addEventListener("load", () => {
      const curunavi = new curunNavigate({
        "start": {"src" : "./images/title.png", "msg" : "くるんなび"},
        "button": {"query" : "#button", "align" : "left", "msg" : "ここを押して下さい"}
      });
      curunavi.next();
      curunavi.curunwrap.addEventListener("click", (e) => { e.stopPropagation(); curunavi.next(); });
    });
    </script>

上記の流れは画面全体がボタンになってるので、**先に一通り説明**のみ行うパターンです。
[サンプルA](https://tools.uda2.com/curunavigate/ "サンプルA")

スマホゲーム等でよくあるように、説明と同時に実際の**操作をしながら説明**していく方式も対応可能です。
[サンプルB](https://tools.uda2.com/curunavigate/index2.html "サンプルB")

標準状態ではlocalStorageで再表示されてしまうのを抑止していますが、データベース等を使って管理したい場合はオプションのviewedcallbackとviewedcsvを使って下さい。
[サンプルC](https://tools.uda2.com/curunavigate/index3.html "サンプルC")


オプション
---------------------------------
| オプション名 | 説明 |
| --- | --- |
| clicktype | 下記から選択頂けます（デフォルト：cover）<br>**先に一通り説明**する「cover」<br>**操作をしながら説明**する「hole」<br>holeの方はボタンを最上面に出すために「position: relative;」としますので状況によってはレイアウトが崩れる可能性があります。 |
| viewedcallback | それぞれの解説を閲覧完了（閉じたり次の解説に移動）際に動作するコールバック関数です。<br>引数にJSONのキーCSVが与えられるので閲覧の履歴管理をDBなどで行う場合に使用します。<br>なお、コールバックの指定があるとlocalstrageでの管理は抑止されます。 |
| viewedcsv | 閲覧履歴を設定します。JSONのキーCSVを指定してください。 |


プロパティ
---------------------------------
| プロパティ名 | 説明 |
| --- | --- |
| curunwrap | 画面全体に被せたレイヤーです。全画面クリックに使います。 |
| curunkey | 現在表示中の解説のキー |


メソッド
---------------------------------
| メソッド名 | 説明 |
| --- | --- |
| close() | 閉じる。閉じる際に既読済みに処理される（下のnext()を実行した際も動作します。） |
| next() | 次の解説を表示する。JSONの順番に従います。 |
| setNavigate(mykey) | 指定の解説を表示する（引数のmykeyはJSONのキー） |
