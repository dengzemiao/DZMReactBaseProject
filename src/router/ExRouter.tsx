// 基于 react-router-dom@6.15.0 封装
import { useRoutes, Navigate, IndexRouteObject, NonIndexRouteObject } from 'react-router-dom'
import { useLocation, Location } from 'react-router'

/**
 * @description: 扩展 IndexRouteObject
 */
interface exIndexRouteObject extends IndexRouteObject {
  /**
   * @description: 重定向路由地址
   */
  redirect?: string
}

/**
 * @description: 扩展 NonIndexRouteObject
 */
interface exNonIndexRouteObject extends NonIndexRouteObject {
  /**
   * @description: 重定向路由地址
   */
  redirect?: string
}

/**
 * @description: 路由对象类型
 */
export type exRouteObject = exIndexRouteObject | exNonIndexRouteObject
/**
 * @description: 找到路由对象类型
 */
export type findExRouteObject = exRouteObject | undefined

/**
 * @description: 组件参数
 */
type props = {
  /**
   * @description: 路由列表
   */
  routes: exRouteObject[],
  /**
   * @description: 子组件列表
   */
  children?: any
}

const Component = (props: props) => {
  // 当前导航对象
  const location = useLocation()
  // 找到路由对象
  const findRoute = (routes: exRouteObject[], location: Location): findExRouteObject => {
    // 当前层级检查一轮
    let route: any = routes.find((item: any) => item.path === location.pathname)
    // 没有则搜索当前层级同级子页面
    if (!route) {
      // 排查，找到停止
      routes.some((item: any) => {
        // 取出子列表
        const children: exRouteObject[] = item?.children || []
        // 进行排查
        route = findRoute(children, location) 
        // 有值则暂停
        return !!route
      })
    }
    // 返回
    return route
  }
  // 找到当前路由
  const route: findExRouteObject = findRoute(props.routes, location)
  // 返回渲染
  return (
    <>
      {/* 加载所有路由 */}
      { useRoutes(props.routes) }
      {/* 检查当前路由是否需要重定向 */}
      { route?.redirect && <Navigate to={route.redirect} replace /> }
    </>
  )
}

export default Component