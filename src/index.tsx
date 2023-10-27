import React from 'react'
import ReactDOM from 'react-dom/client'
import '@/index.css'
import App from '@/App'
import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  // 严格模式会使函数组件在开发环境每次执行两次，可以判断一下开发环境是否启用
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
