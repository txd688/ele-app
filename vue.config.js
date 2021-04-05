module.exports = {
  publicPath: '/',
   // 输出文件目录
   outputDir: 'ele-app',
   assetsDir: 'Public',
   devServer: {
    port: 8777,
    proxy: {
      '/apis': {
        target: 'https://thirdparty.test.nbpitech.com/szggmh/api',
        changeOrigin: true,
        ws: false,
        pathRewrite: {
          '^/apis': ''
        }
      }
    }
  }
}