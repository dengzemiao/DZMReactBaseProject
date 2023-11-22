import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout, Button, theme } from 'antd'
import { menuRoute } from '@/router'
import Icon from '@/components/Icon'
// import MenuIcon from '@/components/Menu/Icon'
import Menu from '@/components/Menu'
import './BaseLayout.less'

const { Header, Sider, Content } = Layout

const ComponentLayout: React.FC = () => {
  // 菜单收起/展开切换
  const [collapsed, setCollapsed] = useState(false);
  // 主题色
  const { token: { colorBgContainer }} = theme.useToken()
  // 渲染
  return (
    <Layout className='layout-view'>
      {/* 左侧菜单 */}
      <Sider trigger={null} collapsible collapsed={collapsed}>
        {/* logo */}
        <div className="layout-logo" />
        {/* 路由菜单 */}
        <Menu
          theme="dark"
          mode="inline"
          routes={menuRoute.children}
          routeMatch={true}
          routeJump={true}
          // items={[
          //   {
          //     key: '1',
          //     icon: <MenuIcon src='icon-a-CombinedShape' type={3} />,
          //     label: 'nav 1',
          //   },
          //   {
          //     key: '/layout/home',
          //     icon: <MenuIcon src={require('@/assets/dzm.jpg')} type={2} />,
          //     label: 'nav 2',
          //     children: [
          //       {
          //         key: '21',
          //         icon: <MenuIcon src='icon-a-CombinedShape' type={3} />,
          //         label: 'nav 21',
          //       },
          //     ]
          //   },
          //   {
          //     key: '3',
          //     icon: <MenuIcon src='UploadOutlined' />,
          //     label: 'nav 3',
          //   }
          // ]}
        />
      </Sider>
      {/* 右侧内容 */}
      <Layout>
        {/* 头部菜单 */}
        <Header style={{ padding: 0, background: colorBgContainer }}>
          {/* 展开/收起 */}
          <Button
            type="text"
            className='layout-collapsed'
            icon={collapsed ? <Icon src='MenuUnfoldOutlined' /> : <Icon src='MenuFoldOutlined' />}
            onClick={() => setCollapsed(!collapsed)}
          />
        </Header>
        {/* 页面内容 */}
        <Content style={{ margin: 16, background: colorBgContainer }} >
          {/* 页面可视区 */}
          <Outlet></Outlet>
        </Content>
      </Layout>
    </Layout>
  )
}

export default ComponentLayout