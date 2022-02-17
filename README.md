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

### postcss-preset-env

事实上，在配置 `postcss-loader` 时，我们配置插件并不需要使用 `autoprefixer`。

我们可以使用另外一个插件：`postcss-preset-env`

-   `postcss-preset-env` 也是一个 `postcss` 的插件；
-   它可以帮助我们将一些现代的 `CSS` 特性，转成大多数浏览器认识的 `CSS`，并且会根据目标浏览器或运行时环境添加所需的 `polyfill`；
-   也包括会自动帮助我们添加 `autoprefixer`（所以相当于已经内置了 `autoprefixer`）；

```css
 color: #12345678; // 解析rgba
```

### 图片资源打包

```bash
npm i file-loader -D
```

```javascript
{
    test: /\.(png|jpe?g|gif|svg)$/,
    use: {
      loader: 'file-loader',
      options: {\
        // 设置载入文件名
        name: 'img/[name].[hash:4].[ext]', //img文件夹源文件名+hash.扩展名
      },
    },
},
```

## 2.插件

插件是 webpack 的[支柱](https://github.com/webpack/tapable)功能。webpack 自身也是构建于，你在 webpack 配置中用到的**相同的插件系统**之上！插件目的在于解决 [loader](https://www.webpackjs.com/concepts/loaders) 无法实现的**其他事**。

### clean-webpack-plugin

clean-webpack-plugin是一个清除文件的插件。在每次打包后，磁盘空间会存有打包后的资源，在再次打包的时候，我们需要先把本地已有的打包后的资源清空，来减少它们对磁盘空间的占用。插件clean-webpack-plugin就可以帮我们做这个事情。

```javascript
const { CleanWebpackConfig } = require('clean-webpack-plugin')
// 添加一条plugins
plugins: [new CleanWebpackConfig()]
```

### html-webpack-plugin 

这个插件用来简化创建服务于 webpack bundle 的 HTML 文件，尤其是对于在文件名中包含了 hash 值，而这个值在每次编译的时候都发生变化的情况。你既可以让这个插件来帮助你自动生成 HTML 文件，也可以使用 lodash 模板加载生成的 bundles，或者自己加载这些 bundles

```javascript
const {HtmlWebpackPlugin} = require('html-webpack-plugin')
// 添加一条plugins
plugins: [new HtmlWebpackPlugin()]

// 默认模板
<!doctype html><html><head><meta charset="utf-8"><title>Webpack App</title><meta name="viewport" content="width=device-width,initial-scale=1"><script defer="defer" src="./dist/bundle.js"></script></head><body></body></html>

// 配置HTML模板
plugins: [
    new HtmlWebpackPlugin({
      title: 'My App',
      template: 'assets/admin.html'
    })
]
```

### babel

讲ES6以及最新的JS代码转化为ES5等兼容代码。转化各种语法必须使用相应的插件。

```javascript
const message = 'Hello world'
const names = ['abc', 'da', 'nda']
names.forEach((item) => console.log(item))
npx babel .\src\js\items.js --out-dir es6 //没有指定插件无效果

❯ npm i @babel/plugin-transform-arrow-functions -D
❯ npx babel .\src\js\items.js --out-dir es6 --plugins=@babel/plugin-transform-arrow-functions 
// 箭头函数打包之后的结果
const message = 'Hello world';
const names = ['abc', 'da', 'nda'];
names.forEach(function (item) {
  return console.log(item);
});
```

const并没有被转化为var，还需引入其他插件

```javascript
npm i @babel/plugin-transform-block-scoping -D
npm i @babel/plugin-transform-block-scoping -D
❯ npx babel .\src\js\items.js --out-dir es6 --plugins=@babel/plugin-transform-arrow-functions,@@babel/plugin-transform-block-scoping
// 箭头函数和const变量转化后的结果
var message = 'Hello world';
var names = ['abc', 'da', 'nda'];
names.forEach(function (item) {
  return console.log(item);
});
```

插件一个个下载太麻烦，直接使用预设方案

```javascript
npm i @babel/preset-env D
```

babel的配置文件

```javascript
// babel.config.js
module.exports = {
  presets: [['@babel/preset-env']],
}
```



### Vue文件loader

vue-loader+@vue/compiler-sfc

```javascript
// 添加plugins
new VueLoaderPlugin()
```

### Webpack Dev Server

webpack-dev-server 是 Webpack 官方推出的一款开发工具，根据它的名字我们就应该知道，它提供了一个开发服务器，并且将自动编译和自动刷新浏览器等一系列对开发友好的功能全部集成在了一起。

Webpack 配置对象中可以有一个叫作 devServer 的属性，专门用来为 webpack-dev-server 提供配置

```javascript
// ./webpack.config.js
const path = require('path')

module.exports = {
  // ...
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
    // ...
    // 详细配置文档：https://webpack.js.org/configuration/dev-server/
  }
}
```

#### Proxy 代理

由于 webpack-dev-server 是一个本地开发服务器，所以我们的应用在开发阶段是独立运行在 localhost 的一个端口上，而后端服务又是运行在另外一个地址上。但是最终上线过后，我们的应用一般又会和后端服务部署到同源地址下。

```javascript
// ./webpack.config.js
module.exports = {
  // ...
  devServer: {
    proxy: {
      '/api': {
        target: 'https://api.github.com'
      }
    }
  }
}
```

那此时我们请求 http://localhost:8080/api/users ，就相当于请求了 https://api.github.com/api/users

![](https://s0.lgstatic.com/i/image/M00/03/61/CgqCHl6ykvCAKWlNAAAktiTnWHU229.png)

而我们真正希望请求的地址是 https://api.github.com/users，所以对于代理路径开头的 /api 我们要重写掉。我们可以添加一个 pathRewrite 属性来实现代理路径重写，重写规则就是把路径中开头的 /api 替换为空，pathRewrite 最终会以正则的方式来替换请求路径。

```javascript
// ./webpack.config.js
module.exports = {
  // ...
  devServer: {
    proxy: {
      '/api': {
        target: 'https://api.github.com',
        pathRewrite: {
          '^/api': '' // 替换掉代理地址中的 /api
        },
      }
    }
}
```

![https://s0.lgstatic.com/i/image/M00/03/61/CgqCHl6ykt-AfcoLAAAkkBntZkc327.png](https://s0.lgstatic.com/i/image/M00/03/61/CgqCHl6ykt-AfcoLAAAkkBntZkc327.png)

除此之外，我们还需设置一个 changeOrigin 属性为 true。这是因为默认代理服务器会以我们实际在浏览器中请求的主机名，也就是 localhost:8080 作为代理请求中的主机名。而一般服务器需要根据请求的主机名判断是哪个网站的请求，那 localhost:8080 这个主机名，对于 GitHub 的服务器来说，肯定无法正常请求，所以需要修改

将代理规则配置的 changeOrigin 属性设置为 true，就会以实际代理请求地址中的主机名去请求，也就是我们正常请求这个地址的主机名是什么，实际请求 GitHub 时就会设置成什么。

```javascript
// ./webpack.config.js
module.exports = {
  // ...
  devServer: {
    proxy: {
      '/api': {
        target: 'https://api.github.com',
        pathRewrite: {
          '^/api': '' // 替换掉代理地址中的 /api
        },
        changeOrigin: true // 确保请求 GitHub 的主机名就是：api.github.com
      }
    }
  }
}
```

