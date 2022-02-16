# webpack
webpackDemo

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
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),//2.修改output对象的path属性改为绝对路径
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

webpack可以同时将commonJS规范和ES6模块化规范一起打包最终可以被index.html直接使用
