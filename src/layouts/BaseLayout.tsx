import { Outlet } from 'react-router-dom'
import './BaseLayout.less'

const Component = () => {
  return (
    <div className='layout-view'>
      <Outlet></Outlet>
    </div>
  )
}

export default Component