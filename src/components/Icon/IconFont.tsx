import './iconfont/iconfont.css'

/**
 * @description: 组件参数
 */
export type IconProps = {
  /**
   * @description: Icon 名称，取 iconfont 图标的 font class 作为图标展示
   */
  name: string,
  /**
   * @description: 自定义样式
   */
  className?: string
}

const Component = (props: IconProps) => {
  return <span className={props.className}><i className={`iconfont ${props.name}`}></i></span>
}

export default Component