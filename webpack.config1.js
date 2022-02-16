const path = require('path'); //引入path包
module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),//2.修改output对象的path属性改为绝对路径
    filename: 'bundle.js'
  },
  mode: 'production'
}
