const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: __dirname + '/app/main.js',
  output: {
    path: __dirname + '/build',
    filename: 'bundle-[hash].js'
  },
  devtool: 'eval-source-map',
  devServer: {
    contentBase: './build',     // 本地服务器所加载的页面所在的目录
    historyApiFallback: true,   // 开发单页应用时，所有的跳转将指向index.html
    inline: true,                // 实时刷新
    hot: true
  },
  module: {
    rules: [
      {
        test: /(\.js|\.jsx)$/,
        use: {
          loader: 'babel-loader'
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              modules: true,    //指定启用css modules
              // localIdentName: '[name]__[local]--[hash:base64:5]'    // 指定css的类名格式
            }
          },
          {
            loader: "postcss-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin('版权所有，翻版必究'),
    new HtmlWebpackPlugin({
      template: __dirname + "/app/index.tmpl.html"  // 自动生成inedx.html，并自动引用打包后的js文件
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),   // 为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID
    new ExtractTextPlugin("style.css"),             // 分离CSS和JS文件
    new CleanWebpackPlugin('build/*', {
      root: __dirname,
      verbose: true,
      dry: false
    })
  ],
  // 压缩JS代码
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: false
        }
      })
    ]
  }
}