import webpack from 'webpack'
import { devMiddleware, hotMiddleware } from 'koa-webpack-middleware'
import devConfig from '../../webpack/webpack.config.js'

export default function(app) {
  const compile = webpack(devConfig);

  app.use(devMiddleware(compile, {
    // display no info to console (only warnings and errors)
    noInfo: false,

    // display nothing to the console 不在控制台显示
    quiet: false,

    // switch into lazy mode  切换到懒惰模式
    // that means no watching, but recompilation on every request  关闭懒加载，每次请求时编译不编译，只有在修改时编译
    lazy: false,

    // watch options (only lazy: false) // 监控的时间
    watchOptions: {
      aggregateTimeout: 300,
      poll: true
    },

    // public path to bind the middleware to
    // use the same as in webpack
    publicPath: devConfig.output.publicPath,

    // 自定义头部
    headers: { "X-Custom-Header": "yes" },

    // 格式化数据选项
    stats: {
      colors: true
    }
  }));

  app.use(hotMiddleware(compile, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000
  }));

}
