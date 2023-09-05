const path = require('path')
const lessPlugin = require("craco-less")

module.exports = {
  // 插件配置
  plugins: [
    {
      plugin: lessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            // modifyVars: { "@primary-color": "#1DA57A" },
            javascriptEnabled: true
          }
        }
      }
    }
  ],
  // webpack 配置
  webpack: {
    // 配置别名
    alias: {
      // 约定：使用 @ 表示 src 文件所在路径
      "@": path.resolve(__dirname, "src")
    }
  }
}
