import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App'
import Pub from '@/utils/public'
import reportWebVitals from './reportWebVitals'
import '@/index.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  // 严格模式会使函数组件在开发环境每次执行两次，开发环境不启用
  Pub.IS_DEBUG() ? <App /> : (
    <React.StrictMode>
      <App />
    </React.StrictMode>  
  )
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
