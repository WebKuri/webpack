# webpack使用
## 1. 基础

### 局部安装

```bash
npm init -y && npm i webpack webpack-cli -D
```

在package.json文件中加入一条命令

```javascript
"build": "npx webpack --entry .src/main.js --output-path ./build"
```

```javascript
源代码
class Student {
  constructor(name, age, subject) {
    this.name = name;
    this.age = age;
    this.subject = subject;
  }

  study(){
    console.log('我在学习' + this.subject);
  }
}

let student3 = new Student('阿辉', 24, '前端开发');
student3.study();
// 打包之后
new class{constructor(s,t,c){this.name=s,this.age=t,this.subject=c}study(){console.log("我在学习"+this.subject)}}("阿辉",24,"前端开发").study();
```

### Webpack配置打包

创建webpack.config.js作为webpack打包的配置文件

```javascript
const path = require('path'); //引入path包
module.exports = {
    // 入口文件
  entry: './src/main.js',
    // 出口模块
  output: {
    path: path.resolve(__dirname, 'dist'),//2.修改output对象的path属性改为绝对路径
     // 打包后的名称
    filename: 'bundle.js'
  }
}
```

```javascript
// main.js
const priceFormat = function(){
 return '909.213'
}

module.exports = {
  priceFormat
}

// math.js
export function sum(num1, num2) {
  return num1 + num2
}

// index.js
import { sum } from './js/math.js'
const { priceFormat } = require('./js/main.js')
console.log(sum(1, 2))
console.log(priceFormat)
```

webpack可以同时将commonJS规范和ES6模块化规范一起打包最终可以被index.html直接使用。强的没边

### CSS打包

Webpack并不能直接打包CSS文件，需要借助各种插件使用其他特殊功能。

```bash
npm i css-loader -D
```

再打包还是不能显示样式,还需要style-loader

```javascript
npm i style-loader -D
```

```javascript
const path = require('path') //引入path包
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'), //2.修改output对象的path属性改为绝对路径
    filename: 'bundle.js',
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.css$/, // 正则表达式匹配
        // 指定打包的loader, 数组表示多个
        // 简单写法loader: "css-loader"
        // 完整写法
        use: [
            // loader顺序由下到上
            { loader: 'style-loader' },
            { loader: 'css-loader' }
        ],
      },
    ],
  },
}
```

### Sass，Less打包

打包处理less文件
运行 npm i less-loader less -D 命令
在webpack.config.js 的module -> rules 数组中,添加loader

```javascript
module.exports = {
    module:{
        rules:[{
                    test:/\.less$/,
                    use:[
                        'style-loader',
                        'css-loader',
                        'less-loader'
                        ]
            }]
    }
}
```

打包处理sass文件
运行 npm i sass-loader dart-sass -D 命令
在webpack.config.js 的module -> rules 数组中,添加loader

```javascript
module.exports = {
    module:{
        rules:[{
                    test:/\.sass$/,
                    use:[
                        'style-loader',
                        'css-loader',
                        'sass-loader'
                    ]
            }]
    }
}
```

### PostCSS

postcss是CSS各种CSS的预处理，autoprefixer是基于postcss的浏览器兼容前缀的插件

![image-20220216223708175](image/image-20220216223708175.png)

```javascript
npx postcss --use autoprefixer -o end.css .\src\css\test2.css
// test2.css
.title {
  user-select: none;
}

// 打包之后可以看到打包之后成了兼容微软、webkit、火狐浏览器的CSS样式
.title {
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
}

/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jc3MvdGVzdDIuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UseUJBQWlCO0tBQWpCLHNCQUFpQjtNQUFqQixxQkFBaUI7VUFBakIsaUJBQWlCO0FBQ25CIiwiZmlsZSI6ImVuZC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIudGl0bGUge1xyXG4gIHVzZXItc2VsZWN0OiBub25lO1xyXG59XHJcbiJdfQ== */
```

