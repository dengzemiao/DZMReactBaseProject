// 基于 react-router-dom@6.15.0 封装
import { useRoutes, Navigate, RouteObject, IndexRouteObject, NonIndexRouteObject } from 'react-router-dom'
import { useLocation, Location } from 'react-router'

/**
 * @description: 扩展属性
 */
interface ExRouteObjectProps {
  /**
   * @description: 重定向路由地址
   */
  redirect?: string,
  /**
   * @description: 子列表
   */  
  children?: ExRouteObject[]
}

/**
 * @description: 扩展 IndexRouteObject
 */
export interface ExIndexRouteObject extends Omit<IndexRouteObject, 'children'>, ExRouteObjectProps {
}

/**
 * @description: 扩展 NonIndexRouteObject
 */
export interface ExNonIndexRouteObject extends Omit<NonIndexRouteObject, 'children'>, ExRouteObjectProps {
}

/**
 * @description: 路由对象类型
 */
export type ExRouteObject = ExIndexRouteObject | ExNonIndexRouteObject

/**
 * @description: 找到路由对象类型
 */
type ExRouteObjectFind = ExRouteObject | undefined

/**
 * @description: 组件参数
 */
export interface ExRouterProps {
  /**
   * @description: 路由列表
   */
  routes: ExRouteObject[]
}

const Component = (props: ExRouterProps) => {
  // 当前导航对象
  const location = useLocation()
  // 找到路由对象
  const findRoute = (routes: ExRouteObject[], location: Location): ExRouteObjectFind => {
    // 当前层级检查一轮
    let route: any = routes.find((item: any) => item.path === location.pathname)
    // 没有则搜索当前层级同级子页面
    if (!route) {
      // 排查，找到停止
      routes.some((item: any) => {
        // 取出子列表
        const children: ExRouteObject[] = item?.children || []
        // 子列表有值
        if (children.length) {
          // 进行排查
          route = findRoute(children, location) 
        }
        // 有值则暂停
        return !!route
      })
    }
    // 返回
    return route
  }
  // 找到当前路由
  const route: ExRouteObjectFind = findRoute(props.routes, location)
  // 返回渲染
  return (
    <>
      {/* 加载所有路由 */}
      { useRoutes(props.routes as RouteObject[]) }
      {/* 检查当前路由是否需要重定向 */}
      { route?.redirect && <Navigate to={route.redirect} replace /> }
    </>
  )
}

export default Component