import React from 'react'
import { ExRouteObject } from './ExRouter'
import { Navigate } from 'react-router-dom'
import BeforeEach from './BeforeEach'
import ExRouter from './ExRouter'

// 懒加载
const lazyload = (path: string) => {
  // 加载组件
  let Component=React.lazy(()=>{return import (`@/${path}`)})
  // 返回渲染
  return (
    <React.Suspense fallback={<>请等待·····</>}>
      <Component />
    </React.Suspense>
  )
}

// 基础路由
const menuRoute: ExRouteObject = {
  path: '/layout',
  redirect: '/layout/home',
  element: lazyload('layouts/BaseLayout'),
  children: [
    {
      path: '/layout/home',
      redirect: '/layout/home/home1',
      element: lazyload('views/home'),
      children: [
        {
          path: '/layout/home/home1',
          element: lazyload('views/home')
        }
      ]
    }
  ]
}
// 路由列表
const routes: Record<string, any>[] = [
  menuRoute,
  {
    path: '/home',
    element: lazyload('views/home'),
  },
  {
    path: '/user',
    element: lazyload('views/user'),
  },
  {
    path: "/404",
    element: (<>页面地址不存在</>),
  },
  { path: "/", element: <Navigate to="/home" /> },
  { path: "*", element: <Navigate to="/404" /> },
]

// 加载配置式路由
function Router () {
  return (
    <BeforeEach>
      <ExRouter routes={routes}></ExRouter>
    </BeforeEach>
  )
}

// 导出
export default Router
