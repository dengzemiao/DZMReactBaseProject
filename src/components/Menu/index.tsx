import { useCallback, useEffect, useState } from 'react'
import { Menu, MenuProps as OldMenuProps } from 'antd'
import { ItemType } from 'antd/es/menu/hooks/useItems'
import { useLocation, Location } from 'react-router'
import { useNavigate, NavigateFunction } from 'react-router-dom'
import { ExRouteObject } from '@/router/ExRouter'
import MenuIcon from './Icon'

/**
 * @description: 访问的菜单路由状态属于隐藏(hidden=true)的情况下，菜单折叠处理方式
 */
export enum MenuRouteHiddenCollapseType {
  /**
   * @description: 折叠起全部文件夹
   */  
  all = 0,
  /**
   * @description: 保持当前原状，清空选中
   */  
  keep = 1,
  /**
   * @description: 打开对应菜单层级
   */  
  open = 2
}

/**
 * @description: 选中某个菜单层级中的路径后，其他菜单层级折叠处理方式
 */
export enum MenuRouteOpenKeyCollapseType {
  /**
   * @description: 只展开当前路由层级，其他层级全部折叠
   */  
  other = 0,
  /**
   * @description: 保留现有层级，与最新层级结合一起展示
   */  
  stacking = 1
}

/**
 * @description: 扩展菜单类型
 */
export interface MenuProps extends OldMenuProps {
  /**
   * @description: 路由列表，将会转成 items 接收的数据，注意：props.items 外部传值会覆盖路由列表转换的 items
   */  
  routes?: ExRouteObject[],
  /**
   * @description: 跳转路由，点击后会跳转到指定路由
   * @default: false
   */  
  routeJump?: boolean,
  /**
   * @description: 匹配路由，使用当前页面链接匹配菜单中对应的路由，展开并选中
   * @default: false
   */  
  routeMatch?: boolean,
  /**
   * @description: routeMatch 为 true 时生效，访问的菜单路由状态属于隐藏(hidden=true)的情况下，菜单层级折叠处理方式
   * @default: MenuRouteHiddenCollapseType.open
   */  
  routeHiddenCollapseType?: MenuRouteHiddenCollapseType,
  /**
   * @description: routeMatch 为 true 时生效，选中某个菜单层级中的路径后，其他菜单层级折叠处理方式
   * @default: MenuRouteOpenKeyCollapseType.stacking
   */  
  routeOpenKeyCollapseType?: MenuRouteOpenKeyCollapseType
  /**
   * @description: 延迟设置展开层级，在初始化展开文件夹时，有可能会发生一瞬间的卡顿，可以通过等渲染完成在进行设置展开达到效果丝滑过度
   * @default: 0
   */ 
  openKeysDelayTime?: number
}

const Component = (props: MenuProps) => {
  // 默认值
  const {
    openKeysDelayTime = 0,
    routeHiddenCollapseType = MenuRouteHiddenCollapseType.open,
    routeOpenKeyCollapseType = MenuRouteOpenKeyCollapseType.stacking
  } = props
  // 路由跳转
  const navigate: NavigateFunction = useNavigate()
  // 当前导航对象
  const location: Location = useLocation()
  // 处理过后的参数
  const [menuProps] = useState<MenuProps>(() => {
    // 新开一个对象
    const newProps = {...props}
    // 移除需要二次处理的参数
    delete newProps.routeMatch
    delete newProps.routeJump
    delete newProps.openKeysDelayTime
    delete newProps.openKeys
    // 返回新的接收对象
    return newProps
  })
  // 菜单列表
  const [items, setItems] = useState<ItemType[] | undefined>(undefined)
  // 选中菜单
  const [selectedKeys, setSelectedKeys] = useState<string[] | undefined>(undefined)
  // 展开菜单
  const [openKeys, setOpenKeys] = useState<string[] | undefined>(undefined)
  // 当前路由映射的菜单层级
  const menuMatched = useCallback((routes: Record<string, any>[], location: Location): Record<string, any>[] => {
    // 路由匹配
    let newMatched: Record<string, any>[] = []
    // 便利
    routes.some((route: Record<string, any>, index: number) => {
      // 清空
      newMatched = []
      // 匹配当前路由
      if (route.path === location.pathname) {
        // 匹配到了
        newMatched.push(route)
        // 停止
        return true
      } else {
        // 添加层级
        newMatched.push(route)
        // 没匹配到，有子集继续查找
        if (route.children && route.children.length) {
          // 继续匹配
          newMatched = newMatched.concat(menuMatched(route.children, location))          
          // 检查匹配结果
          return newMatched.some((item => item.path === location.pathname))
        } else {
          // 继续
          return false
        }
      }
    })
    // 返回
    return newMatched
  }, [])
  // 路由相关变化处理
  const menuMatchedHandler = useCallback(() => {
    // 匹配路由
    if (props.routeMatch && (props.items || props.routes)) {
      // 展开列表
      const openkeys: string[] = []
      // 选中列表
      const selectkeys: string[] = []
      // 需要路由匹配的列表
      const routes = (props.items || props.routes || []) as Record<string, any>[]
      // 获取菜单层级
      const matched =  menuMatched(routes, location)
      // 当前路由是否属于隐藏菜单
      let routeHidden = false
      // 区分
      matched.forEach((item: any) => {
        // 有子列表
        if (item.children && item.children.length) {
          // 展开
          openkeys.push(item.path!)
        } else {
          // 选中
          selectkeys.push(item.path!)
          // 取得状态
          routeHidden = !!item.hidden
        }
      })
      // 设置 OpenKeys
      const setupOpenKeys = () => {
        // 当前路由是否属于隐藏路由
        if (routeHidden) {
          // 区分隐藏路由展开层级类型
          if (routeHiddenCollapseType === MenuRouteHiddenCollapseType.all) {
            // 全部收起
            setOpenKeys([])
          } else if (routeHiddenCollapseType === MenuRouteHiddenCollapseType.keep) {
            // 保持当前层级
            setOpenKeys(props.openKeys || openKeys)
          } else if (routeHiddenCollapseType === MenuRouteHiddenCollapseType.open) {
            // 打开对应菜单层级
            if (routeOpenKeyCollapseType === MenuRouteOpenKeyCollapseType.other) {
              // 折叠其他层级
              setOpenKeys(props.openKeys || openkeys)
            } else if (routeOpenKeyCollapseType === MenuRouteOpenKeyCollapseType.stacking) {
              // 在当前层级上合并最新层级
              setOpenKeys(props.openKeys || (openKeys?.length ? Array.from(new Set(openKeys.concat(openkeys))) : openkeys))
            }
          }
        } else {
          // 区分层级展开类型
          if (routeOpenKeyCollapseType === MenuRouteOpenKeyCollapseType.other) {
            // 折叠其他层级
            setOpenKeys(props.openKeys || openkeys)
          } else if (routeOpenKeyCollapseType === MenuRouteOpenKeyCollapseType.stacking) {
            // 在当前层级上合并最新层级
            setOpenKeys(props.openKeys || (openKeys?.length ? Array.from(new Set(openKeys.concat(openkeys))) : openkeys))
          }
        }
      }
      // 设置选中
      setSelectedKeys(props.selectedKeys || selectkeys)
      // 延迟展开，优化展开效果丝滑
      if (openKeysDelayTime > 0) {
        setTimeout(() => { setupOpenKeys() }, openKeysDelayTime)
      } else {
        setupOpenKeys()
      }
    } else {
      // 设置选中
      setSelectedKeys(props.selectedKeys || selectedKeys)
      // 延迟展开，优化展开效果丝滑
      if (openKeysDelayTime > 0) {
        setTimeout(() => { setOpenKeys(props.openKeys || openKeys) }, openKeysDelayTime)
      } else {
        setOpenKeys(props.openKeys || openKeys)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    props.items,
    props.routes,
    props.openKeys,
    props.selectedKeys,
    menuMatched,
    location
  ])
  // 转换为 items
  const convertItems = useCallback((routes: ExRouteObject[]):  ItemType[] => {
    // 路由菜单列表
    const routeItems: ItemType[] = []
    // 便利
    routes.forEach((route: ExRouteObject) => {   
      // path 有值 && 菜单不隐藏
      if (route.path && !route.hidden) {
        // 组装
        const routeItem: ItemType = {
          key: route.path!,
          icon: <MenuIcon src={route.icon} className={route.iconClass} type={route.iconType} />,
          label: route.title || route.path,
          children: route.children && route.children.length ? convertItems(route.children) : undefined
        }
        // 加入
        routeItems.push(routeItem)
      }
    })
    // 返回
    return routeItems
  }, [])
  // 展开/关闭的回调
  const onOpenChange = (openKeys: string[]) => {
    // 设置
    setOpenKeys(openKeys)
    // 回传
    if (props.onOpenChange) { props.onOpenChange(openKeys) }
  }
  // 被选中时调用
  const onSelect = (info: any) => {
    // 设置
    setSelectedKeys(info.selectedKeys)
    // 跳转路由
    if (props.routeJump) { navigate(info.key) }
    // 回传
    if (props.onSelect) { props.onSelect(info) }
  }
  // 取消选中时调用
  const onDeselect = (info: any) => {
    // 设置
    setSelectedKeys(info.selectedKeys)
    // 回传
    if (props.onDeselect) { props.onDeselect(info) }
  }
  // 处理 items
  useEffect(() => {
    // 优先使用 items
    if (props.items) {
      // 外部 items 有传值
      setItems(props.items)
    } else if (!props.items && props.routes && props.routes.length) {
      // 外部 items 没有传值 && 菜单路由有值
      setItems(convertItems(props.routes))
    }
  }, [props.items, props.routes, convertItems])
  // 处理路由匹配
  useEffect(() => {
    menuMatchedHandler()
  }, [menuMatchedHandler])
  // 渲染
  return <Menu
    {...menuProps}
    items={items}
    selectedKeys={selectedKeys}
    openKeys={openKeys}
    onOpenChange={onOpenChange}
    onSelect={onSelect}
    onDeselect={onDeselect}
  ></Menu>
}

export default Component
