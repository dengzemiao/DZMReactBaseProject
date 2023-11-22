import './index.less'
import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { getDemo } from '@/api/request'

const Component = () => {
  // 接口数据
  const [detail, setDetail] = useState({})
  // 首次渲染调用
  useEffect(() => {
    // 输出 .env 配置
    console.log(process.env.REACT_APP_BASE_URL, process.env.NODE_ENV)
    // 请求案例
    getDemo().then((res) => {
      setDetail(res)
    }).catch((err) => {
      setDetail(err)
    })
  }, [])
  // 路由跳转对象
  const navigate = useNavigate()
  // 跳转事件
  const touchJump = () => {
    navigate('/layout')
  }
  return (
    <div className='page-view'>
      <div className='title'>首页</div>
      <button onClick={touchJump}>跳转 /layout</button>
      <Link to='/user'>跳转 /user</Link>
      <Link to='/layout'>跳转 /layout</Link>
      <Link to='/layout/home2/home1'>跳转 /layout/home2/home1</Link>
      <Link to='/layout/home2/home3'>跳转 /layout/home2/home3 隐藏的菜单路径</Link>
      <div>{ JSON.stringify(detail) }</div>
    </div>
  )
}

export default Component