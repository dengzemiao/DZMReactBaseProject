import React from 'react'
import { ExRouteObject } from './ExRouter'
import { Navigate, Outlet } from 'react-router-dom'
import BeforeEach from './BeforeEach'
import ExRouter from './ExRouter'
import logo from '@/assets/logo.svg'
import MenuIcon from '@/components/Menu/Icon'
import './index.less'

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

// 菜单路由（path 无值菜单不展示该路由，等同于 hidden 属性，path 会作为 菜单Item key 使用）
export const menuRoute: ExRouteObject = {
  path: '/layout',
  redirect: '/layout/home',
  element: lazyload('layouts/BaseLayout'),
  children: [
    {
      path: '/layout/home',
      redirect: '/layout/home/home1',
      label: '首页1',
      icon: <MenuIcon src='icon-a-CombinedShape' type={3} />,
      sicon: logo,
      siconType: 2,
      element: <Outlet />,
      children: [
        {
          path: '/layout/home/home1',
          element: lazyload('views/home'),
          label: '子菜单1',
          icon: logo,
          sicon: <MenuIcon src='icon-a-CombinedShape' type={3} />,
          iconType: 2
        },
        {
          path: '/layout/home/home2',
          element: lazyload('views/home'),
          label: '子菜单2',
          icon: 'icon-a-CombinedShape',
          iconType: 3
        }
      ]
    },
    {
      path: '/layout/home2',
      redirect: '/layout/home2/home1',
      label: '首页2',
      icon: logo,
      sicon: <MenuIcon src='icon-a-CombinedShape' type={3} />,
      iconType: 2,
      iconClass: 'iconClassTest',
      element: <Outlet />,
      children: [
        {
          path: '/layout/home2/home1',
          element: lazyload('views/home'),
          label: '子菜单1',
          icon: logo,
          iconType: 2,
          sicon: <MenuIcon src='icon-a-CombinedShape' type={3} />
        },
        {
          path: '/layout/home2/home2',
          element: lazyload('views/home'),
          label: '子菜单2',
          icon: 'icon-a-CombinedShape',
          iconType: 3
        },
        {
          path: '/layout/home2/home3',
          element: lazyload('views/home'),
          label: '子菜单3',
          icon: 'UploadOutlined',
          hidden: true
        }
      ]
    },
    {
      path: '/layout/home3',
      redirect: '/layout/home3/home1',
      label: '首页3',
      icon: require('@/assets/dzm.jpg'),
      iconType: 2,
      element: <Outlet />,
      children: [
        {
          path: '/layout/home3/home1',
          element: lazyload('views/home'),
          label: '子菜单1',
          icon: logo,
          iconType: 2
        },
        {
          path: '/layout/home3/home2',
          element: lazyload('views/home'),
          label: '子菜单2',
          icon: 'icon-a-CombinedShape',
          iconType: 3
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
