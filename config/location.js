import { resolve } from "path";

/**
 * 本地资源配置 - 用户上传的各种资源
 * public {
 *   images 图片
 *   assets 静态资源
 *   video 视频
 *   audio 音频
 * }
 *
 * 静态资源 - 存放系统需要的文件
 * static
 *
 * 本地静态资源打包路径
 * dist
 *
 * 线上发布 - 打包路径
 * bundle
 *
 */
export default {
  port: 8083,
  protocol: "http",
  host: 'localhost',
  domain: 'api.domain.com',
  root: process.cwd(),
  public: resolve(process.cwd(), 'public'),
  dist: resolve(process.cwd(), 'dist'),
  bundle: resolve(process.cwd(), 'bundle'),
  static: resolve(process.cwd(), 'static'),
  containers: resolve(process.cwd(), 'src', 'controllers'),
  node_modules: resolve(process.cwd(), 'node_modules'),

  // 证书
  certificate: {
    // if you use Https or http2, you must be has the options
  },

  logger: {
    name: 'program-api',
    level: 'error'
  }
}
/*
export default function(app) {
  app.use(serve(method.assemblyPath(process.cwd(), '/dist'), { extensions: ['js']}));
  app.use(serve(method.assemblyPath(process.cwd(), '/public'), { extensions: ['js', 'ico']}));
  // app.use(serve(method.assemblyPath(process.cwd(), '/assets/images'), { extensions: ['ico']}));
  app.use(serve(method.assemblyPath(process.cwd(), '/node_modules'), { extensions: ['js', 'css']}));
}
*/
