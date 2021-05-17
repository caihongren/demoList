module.exports = {
  publicPath: './',
  outputDir: 'bigScreen',
  // 它支持webPack-dev-server的所有选项
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer[0].options.terserOptions.compress.warnings = false
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
      config.optimization.minimizer[0].options.terserOptions.compress.drop_debugger = true
      config.optimization.minimizer[0].options.terserOptions.compress.pure_funcs = ['console.log']
    } 
  },
  devServer: {
    host: "0.0.0.0",
    port: 8080, // 端口号
    https: false, // https:{type:Boolean}
    open: true, //配置自动启动浏览器



    // 配置多个代理
    proxy: {
      "/api": {
        // target: "http://10.8.3.125:8080/spc-admin/", // 要访问的接口域名测试
        target: "http://whty.tyjulink.com/", // 要访问的接口域名测试

        ws: true, // 是否启用websockets
        changeOrigin: true, //开启代理：
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }

}