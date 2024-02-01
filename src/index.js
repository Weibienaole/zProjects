import { render } from 'react-dom'
import { JSB_init, setDomRem } from 'zzy-javascript-devtools'

import App from './App.js'

// 启动热重载
if (module.hot) {
  module.hot.accept();
}


// JSbridge 初始化
JSB_init()

// console.log = function () { }

// rem 设置
setDomRem(8)
const nowRem = document.querySelector('html')?.style.fontSize?.split('px')[0]
window.localStorage.setItem('domRem', nowRem)


render(<App />, document.getElementById('root'))
