import Database from './database';
import Server from './server';
import Location from './location';
import Production from './production';

export const database = Database;
export const server = Server;
export const location = Location;
export const production = Production;

export default {
  /**
   * 数据库配置
   */
  database: Database,

  /**
   * 服务器配置
   */
  server: Server,

  /**
   * 本地配置
   */
  location: Location,

  /**
   * 服务端配置
   */
  production: production,


  logger: {
    name: 'program-api',
    level: 'error'
  }
}
