const Pub = {

  // ================================= 《 路 由 跳 转 》

  // 新窗口访问链接
  OPEN_URL(url) {
    window.open(url, '_blank')
  },

  // 跳转到指定地址
  JUMP_URL(url) {
    window.location = url
  },

  // 当前域名
  DOMAIN_NAME(path) {
    return window.location.protocol + '//' + window.location.host + (path || '')
  },

  // ================================= 《 正 则 效 验 》

  // 正则匹配是否存在
  REG_TEST(reg, value) {
    var re = new RegExp(reg)
    if (re.test(value)) {
      return true
    } else {
      return false
    }
  },

  // 删除字符串全部空格
  STRING_SPACE_ALL(str) {
    return str.replace(/\s/g, '')
  },

  // 删除字符串头尾空格
  STRING_SPACE_HF(str) {
    return str.replace(/(^\s*)|(\s*$)/g, '')
  },

  // 删除字符串头部空格
  STRING_SPACE_H(str) {
    return str.replace(/(^\s*)/g, '')
  },

  // 删除字符串尾部空格
  STRING_SPACE_F(str) {
    return str.replace(/(\s*$)/g, '')
  },

  // 判断是否为正数（允许小数点，不能为负数）
  REG_IS_NUMBER(value) {
    return (this.REG_TEST(/^\d+(\.\d+)?$/, value))
  },

  // 判断是否为正数（允许小数点，最多2位，不能为负数）
  REG_IS_NUMBER_FLOAT2(value) {
    return (this.REG_TEST(/^\d+(?:\.\d{1,2})?$/, value))
  },

  // 判断是否为正整数（包含 0）
  REG_IS_INTEGER(value) {
    return (this.REG_TEST(/^\d+$/, value))
  },

  // 判断是否为正整数（不包含 0）
  REG_IS_INTEGER_POSITIVE(value) {
    return (this.REG_TEST(/(^[1-9]\d*$)/, value))
  },

  // 判断是否为手机号
  REG_IS_PHONE(value) {
    return (this.REG_TEST(/^1[3456789]\d{9}$/, value))
  },

  // 判断是否为邮箱
  REG_IS_EMAIL(value) {
    return (this.REG_TEST(/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/, value))
  },

  // ================================= 《 小 数 点 处 理 》

  // 检查小数点是否超过指定个数 true: 超过 false：没超过
  CHECK_NUMBER_DECIMAL(value, maxLength) {
    // 转为字符串
    var valueString = `${(value || '')}`
    // 小数长度
    var decimalLength = 0
    // 是否存在小数点
    if (valueString.includes('.')) {
      // 获取小数长度
      decimalLength = valueString.split('.')[1].length
    }
    return decimalLength > maxLength
  },

  // 保留小数点位数
  // value: 数值，支持字符串
  // decimal：保留小数点位数
  // isNumber：是否转为 Number，默认 String
  // isComplete：小数点不够时，是否用 0 尾部进行补全
  // completeMax：补全最大数限制，0：按实际补全，也就是小数点差几位补几位
  KEEP_NUMBER_DECIMAL(value, decimal, isNumber, isComplete, completeMax = 0) {
    // 字符串
    var valueString = `${value || 0}`
    // 保留小数点位数
    var decimalCount = Math.max(0, decimal)
    // 补全数量
    var completeMaxCount = Math.max(0, completeMax)
    // 数字
    var numberString = valueString
    var decimalString = ''
    // 是否存在小数点
    if (valueString.includes('.')) {
      // 分割
      var strs = valueString.split('.')
      // 记录
      numberString = strs[0]
      decimalString = strs[1]
    }
    // 分割小数点
    if (decimalString.length > decimalCount) {
      // 截取小数点
      decimalString = decimalString.substring(0, decimalCount)
    }
    // 小数位数不够，是否用 0 补全
    if (isComplete && decimalString.length < decimalCount) {
      // 补全位数
      var completeCount = decimalCount - decimalString.length
      // 检查限制
      if (completeMaxCount) { completeCount = Math.min(completeMaxCount, completeCount) }
      // 进行补全
      if (completeCount) { for (let index = 0; index < completeCount; index++) { decimalString += '0' } }
    }
    // 有小数
    if (decimalString.length) {
      // 组合
      numberString += `.${decimalString}`
    }
    // 返回
    return isNumber ? Number(numberString) : numberString
  },

  // ================================= 《 JSON 快 捷 取 值 》

  // 获取指定 key 值
  VALUE(obj, key) {
    // 当前值
    var value = undefined
    // 是否有值
    if (obj && key) {
      // 赋值
      value = obj
      // 分析大括号
      if (key.includes('[') || key.includes(']')) {
        // 替换符号
        if (key.includes('[')) {
          key = key.replace(new RegExp('\\[', "gm"), '.')
          key = key.replace(new RegExp('\\]', "gm"), '')
        } else {
          key = key.replace(new RegExp('\\]', "gm"), '.')
        }
      }
      // 拆分
      const keys = key.split('.')
      // 过滤出来可用的 keys
      const newKeys = []
      // 过滤
      keys.forEach(itemKey => {
        // 有值则添加
        if (itemKey.length) { newKeys.push(itemKey) }
      })
      // 取值
      newKeys.some(itemKey => {
        // 直接取值
        if (value) { value = value[itemKey] }
        // 是否停止
        return !value
      })
    }
    // 返回
    return value
  },

  // ================================= 《 针 对 项 目 自 定 义 》

  // 项目运行环境
  IS_DEBUG() {
    // 当前 host
    const host = window.location.host
    // 方式一：域名中包含指定标识，为测试环境
    return host.includes('localhost') || host.includes('test.')
    // 方式二：不等于正式域名，为测试环境
    // return host !== 'task.hepai.video'
  },

  // (获取 || 设置) token
  ACCESS_TOKEN(value) {
    return this.CUSTOM('token', value)
  },

  // (获取 || 设置) userinfo
  USER_INFO(value) {
    return this.CUSTOM('userinfo', value)
  },

  // (获取 || 设置) 自定义字段
  CUSTOM(key, value) {
    if (value === undefined) {
      return localStorage.getItem(key)
    } else {
      return localStorage.setItem(key, value)
    }
  }
}

// 导出
export default Pub