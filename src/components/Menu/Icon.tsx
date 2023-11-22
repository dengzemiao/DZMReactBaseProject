import Icon, { IconProps, IconType } from '@/components/Icon'
import './Icon.less'

const Component = (props: IconProps) => {
  // 默认值
  const { type = IconType.antdv } = props
  // className
  const className = `menu-icontype-${type} ${props.className || ''}`
  // 渲染
  return <Icon {...props} className={className} ></Icon>
}

export default Component