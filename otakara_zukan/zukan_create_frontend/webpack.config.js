// pathモジュールをインポート
const path = require('path');

// HTMLファイルを生成するためのプラグインをインポート
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // エントリーポイントのファイルパスを指定
  entry: path.resolve(__dirname, './src/index.js'),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
        type: 'asset/resource',
      }
    ],
  },
  // バンドルされたJavaScriptファイルの出力先を指定
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './public/React_App_files/bundle.js',
  },
  // 自動的に解決するファイル拡張子を指定
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  // HTMLを生成するためのプラグインを含む設定を行う
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};