/*
 * @type {import('webpack').Configuration}
 */
// {
//   import('webpack').Configuration
// }
const path = require('path') //引入path包
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { DefinePlugin } = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader/dist/index')
module.exports = {
  entry: './src/index.js',
  output: {
    publicPath: './',
    path: path.resolve(__dirname, 'dist'), //2.修改output对象的path属性改为绝对路径
    filename: 'js/bundle.js',
  },
  // mode: 'production', // 生产环境代码压缩混淆
  mode: 'development', // 开发环境代码不压缩
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.css$/, // 正则表达式匹配
        // 指定打包的loader, 数组表示多个
        // 简单写法loader: "css-loader"
        // 完整写法
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [require('postcss-preset-env')], // 注入插件配置
              },
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader', // creates style nodes from JS strings
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
          },
          {
            loader: 'less-loader', // compiles Less to CSS
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name].[hash:4].[ext]', //img文件夹源文件名+hash.扩展名
            outputPath: 'assets/images/',
            limit: '100 * 1024', // 100kb才压缩成base64,避免打包体积过大
          },
        },
      },
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
        },
      },
    ],
  },
  // 插件对象配置项
  plugins: [
    new DefinePlugin({
      BASE_URL: '"./"',
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'My App Cool',
      template: 'public/index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public',
          globOptions: {
            ignore: ['**/.DS_Store', '**/index.html'],
          },
        },
      ],
    }),
    new VueLoaderPlugin(),
  ],
  devServer: {
    //  将依赖图之外的图加载content文件夹内容
    // contentBase: './content',
    // 热更新
    hot: true,
    // 局域网可访问,127.0.0.1本地可访问
    host: '127.0.0.1',
    // 端口号
    port: '7777',
    // 是否打开浏览器
    open: true,
    // 代理服务器解决本地后端服务器跨域问题
    proxy: {
      '/api': {
        target: 'http://localhost:8000', // http://localhost:8000/api等于直接向这个链接发送请求
        pathRewrite: {
          '^/api': '', // http://localhost:8000/等于直接向这个链接发送请求，重写api的请求头
        },
        secure: false, // 支持http
        changeOrigin: true, //修改成原来的请求连接，而不是代理服务器的连接
      },
    },
    resolve: {
      //  模块引入重命名
      alias: {
        '@': path.resolve(__dirname, './src'),
        js: path.resolve(__dirname, './src/js'),
        pages: path.resolve(__dirname, './src/pages'),
      },
    },
  },
}
