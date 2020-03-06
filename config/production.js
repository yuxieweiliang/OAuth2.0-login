/**
 * 配置
 * 生产环境变量
 */
import { resolve } from 'path'

const root = '/data/program/'

export default {
  /**
   * 根目录
   */
  root,

  /**
   * 服务路径
   */
  server: resolve(root, 'server'),

  /**
   * 代码目录
   */
  src: resolve(root, 'server', 'src'),

  /**
   * 打包目录
   */
  destination: './dist',

  /**
   * 公共资源目录
   */
  static: resolve(root, 'static', 'api'),

  /**
   * 服务器地址
   * ssh 连接使用
   */
  service: [
    {
      host: '39.107.87.157/',
      username: 'root',
      password: 'xyf.3342'
    }
  ],

  /**
   * 配置文件
   */
  package: require('../package.json'),
  launched: require('../launched.json')
}
