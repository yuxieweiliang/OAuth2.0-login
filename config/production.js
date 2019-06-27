import { resolve } from 'path';

const ROOT = '/data/program/';
const SERVER =  resolve(ROOT, 'server');
const SRC = resolve(SERVER, 'src');

export default {
  /**
   * 根目录
   */
  root: ROOT,

  /**
   * 代码目录
   */
  src: SRC,

  /**
   * 打包目录
   */
  destination: './dist',

  /**
   * 服务路径
   */
  server: SERVER,

  /**
   * 公共资源目录
   */
  static: '/data/program/static/api',

  /**
   * 服务器地址
   * ssh 连接使用
   */
  service: [
    {
      host: '114.116.28.122',
      username: 'root',
      password: 'hw_xacxzx2018'
    }
  ],

  /**
   * 配置文件
   */
  package: require('../package.json'),
  launched: require('../launched.json')
}
