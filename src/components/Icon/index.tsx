import Iconfont from './IconFont'
import Icon from './IconAntdv'

/**
 * @description: Icon 类型
 */
export enum IconType {
  /**
   * @description: Antdv 图标
   */  
  antdv = 1,
  /**
   * @description: img 图片
   */  
  img = 2,
  /**
   * @description: iconfont 图标
   */  
  iconfont = 3
}

/**
 * @description: 组件参数
 */
export type IconProps = {
  /**
   * @description: 根据 type 传入不同的值
   * @IconType_antdv : 传入图标名称，例如：<UploadOutlined /> 取 'UploadOutlined' 作为图标名称
   * @IconType_img : 传入 img 标签 src 属性所支持的图片内容
   * @IconType_iconfont : 传入 iconfont 图标的 font class 作为图标展示
   */
  src?: string,
  /**
   * @description: 图标类型
   * @default: IconType.antdv
   */
  type?: IconType,
  /**
   * @description: 自定义样式
   */
  className?: string,
  /**
   * @description: 图标描述，IconType.img
   * @return {*}
   */  
  alt?: string
}

const Component = (props: IconProps) => {
  // 默认值
  const { type = IconType.antdv } = props
  // className
  const className = `icontype-${type} ${props.className || ''}`
  // 是否有图标源
  if (props.src) {
    // 有值
    if (type === 3) {
      // iconfont
      return <Iconfont name={props.src} className={className}></Iconfont>
    } else if (type === 2) {
      // img
      return <img src={props.src} className={className} alt={props.alt || ''} />
    } else {
      // antdv
      return <Icon name={props.src} className={className}></Icon>
    }
  } else {
    // 空
    return <></>
  }
}

export default Component