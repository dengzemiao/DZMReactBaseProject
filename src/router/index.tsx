import React from 'react'
import { Navigate, useRoutes } from 'react-router-dom'
import Auth from './auth'

// 懒加载
const lazyload = (path: string) => {
  let Component=React.lazy(()=>{return import (`@/views${path}`)})
  return (
    <React.Suspense fallback={<>请等待·····</>}>
      <Component />
    </React.Suspense>
  )
}

// 懒加载（权限校验）
const lazyloadAuth = (path: string) => {
  return (<Auth>{ lazyload(path) }</Auth>)
}

// 基础路由
const baseRoutes: Record<string, any>[] = [
  {
    path: '/home',
    element: lazyloadAuth('/home'),
  },
  {
    path: '/user',
    element: lazyloadAuth('/user'),
  }
]

// 路由列表
const routes: Record<string, any>[] = [
  ...baseRoutes,
  {
    path: "/404",
    element: (<>页面地址不存在</>),
  },
  { path: "/", element: <Navigate to="/home" /> },
  { path: "*", element: <Navigate to="/404" /> },
]

// 使用配置式路由
function Router () {
  return useRoutes(routes)
}

// 导出
export default Router