import React from 'react'
import * as icons from '@ant-design/icons'

/**
 * @description: 组件参数
 */
export type IconProps = {
  /**
   * @description: Icon 名称
   */
  name: string,
  /**
   * @description: 自定义样式
   */
  className?: string
}

const Component = (props: IconProps) => {
  const antIcon: { [key: string]: any } = icons
  const icon = React.createElement(antIcon[props.name], { className: props.className })
  return icon
}

export default Component