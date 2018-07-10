module.exports = {
  devtool: 'eval-source-map',
  entry: __dirname + '/app/main.js',
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './public',    // 本地服务器所加载的页面所在的目录
    historyApiFallback: true,   // 开发单页应用时，所有的跳转将指向index.html
    inline: true                // 实时刷新
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
              localIdentName: '[name]__[local]--[hash:base64:5]'    // 指定css的类名格式
            }
          }
        ]
      }
    ]
  }
}