## ■ サービス名
## おたから図鑑 -好きなもの集めちゃおう-

## ■ サービス概要
水族館や動物園、花や料理など様々な好きなものを記録していくことで宝物のオリジナルの図鑑・アルバムが作成できるサービスです。
図鑑のテンプレートやユーザーが入力フォームを追加しテンプレートをアレンジする機能を付け、完成した図鑑を共有し合うことができます。

## ■ サービスコンセプト
私は生き物が好きで様々な生き物を探したり、動物園に行くのが好きです。
しかし、動物園などに行って生き物を見るだけではだいたいの生き物は記憶に残らないので、実際に図鑑作成をすることで手を動かし生き物について深く考察できるようにしたいと思いこのサービスを考案しました。
また採取などで見つけた生き物を記録したり周辺の野良猫たちを区別するなど、図鑑を登録していくことで生き物との出会いを楽しめるようなサービスにしたいと思っています。

## ■　想定されるユーザー層
図鑑などコレクション好きの方

## ■ サービスの利用イメージ
図鑑を作成しながら自分で調べ入力していく中で詳しくなったりさらに興味が持てるようになる手助け。
自分の図鑑アルバムができることで達成感などを感じてもらえる。
他のユーザーの図鑑を見て情報を得ることができる。
そのほかの使い方も自由にetc...

## ■ ユーザーの獲得について
xなどSNSで発信


## ■ サービスの差別化ポイント・推しポイント
オリジナル図鑑をデザインする楽しさがある。
更に追加で画像やテキストボックスを追加できるように自由度を持たせたい。


## ■ 実装機能
 ### MVP
 * トップページ
   * 会員登録
   * ログイン
   * ゲストログイン
 * マイページ
   * 自作図鑑一覧
   * 削除ボタン
   * お気に入り一覧
 * 図鑑作成
   * ドラッグ&ドロップ
   * リサイズ
   * テンプレート選択
   * テキストボックス追加
   * 画像追加
   * タグ付け
 * 投稿された図鑑一覧
   * 検索機能
 * 図鑑詳細
 * 図鑑お気に入り
 * 管理画面
    * ユーザー一覧
    * 図鑑一覧
    * テンプレート一覧
    * テンプレート作成
    * テキストボックス一覧
    * テキストボックス作成
   
 ### 本リリース
 * SNS共有
 * 投稿済み図鑑編集
 * 画像解析(画像からテキストを抽出、ワンタッチでテキストをコピー)
 * 検索にオートコンプリート機能追加
 * 画像加工
 * 場所をマップ上に表示する(Google Maps API使用予定)

■ 機能の実装方針
 - sorcery
 - jsonapi-serializer
 - carrierwave
 - mini_magick
 - React
 - axios
 - mui
 - react-router-dom
 - react-interactjs
 - react-tag-input
 - react-modal
 - Heroku
 - AWS(S3)
