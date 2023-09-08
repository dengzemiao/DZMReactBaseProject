// import { Navigate, useLocation, useSearchParams } from 'react-router-dom'

const Component = ({ children }: { children: JSX.Element }) => {
  // // 接收路由参数
  // const [searchParams] = useSearchParams()
  // // 当前导航对象
  // const location = useLocation()
  // // console.log(location, searchParams.get('token'))
  // // token (检查本地或路由参数)
  // const token = 'xxxx'
  // // 路由权限校验
  // if (location.pathname.includes('/login') && token) {
  //   // 跳转登录页 && token有值
  //   return <Navigate to="/home" replace />
  // } else if (!location.pathname.includes('/login') && !token) {
  //   // 不是跳转登录页 && token无值
  //   return <Navigate to="/login" replace />
  // }
  // 验证通过
  return children
}

export default Component