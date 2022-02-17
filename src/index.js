import { sum } from './js/math.js'
const { priceFormat } = require('./js/main.js')
import './js/element.js'
import { createApp } from 'vue/dist/vue.esm-bundler.js'
import App from './vue/app.vue'
console.log(sum(1, 2))
console.log(priceFormat)

//  Vue代码
// const app = createApp({
//   template: `<h2>我是Vue</h2>`,
//   data() {
//     return {
//       title: 'Hello World',
//     }
//   },
// })

const app = createApp(App)
app.mount('#app')
