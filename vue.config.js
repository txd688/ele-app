const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: '/',
   // 输出文件目录
   outputDir: 'ele-app',
   assetsDir: 'Public',
  //  linkActiveClass:'',
   chainWebpack(config){
      // 1.让svgloader排除掉src/icons这个目录
    config.module.rule('svg')
    .exclude.add(resolve('src/icon'))
    .end();
    // 2.让插件svg-sprite-loader添加规则src/icons/svg
    config.module.rule('icons')
    .test(/\.svg$/)   //svg结尾的文件名
    .include.add(resolve('src/icon')).end()//include数组操作 end回退到上一层
    .use('svg-sprite-loader')
    .loader('svg-sprite-loader')
    .options({symbolId: 'icon-[name]'}).end();
  },
  // 全局引入 vant less 配置
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, './src/assets/Css/var.less')
      ]
    }
  },
   devServer: {
    port: 8111,
    proxy: {
      '/apis': {
        target: 'https://c.iwanmen.com/element/',
        // target: 'https://eleme4-2021.herokuapp.com/',
        changeOrigin: true,
        ws: false,
        pathRewrite: {
          '^/apis': ''
        }
      },
      '/api2': {
        target: 'https://c.iwanmen.com/element/',
        changeOrigin: true,
        ws: false,
        pathRewrite: {
          '^/api2': ''
        }
      }
    }
  }
}