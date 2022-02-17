import '../css/style.css'
import '../css/test.less'
import '../css/test2.css'
import '../css/image.css'
import zzImg from '../img/zznh.png'

const imgEl = document.createElement('img')
imgEl.src = zzImg

const divEl = document.createElement('div')
divEl.className = 'title'
divEl.innerHTML = 'Hello, 王小波'

// 设置背景图片
const bgDivEl = document.createElement('div')
bgDivEl.className = 'image-bg'
document.body.appendChild(divEl)
document.body.appendChild(bgDivEl)
console.log('213')
console.log('2134')
