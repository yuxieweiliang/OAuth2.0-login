/**
 * 数据库配置
 */
import { isPro } from './environment';


const setting = {
  pool: {
    max: 500,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  operatorsAliases: false,                          // 运算符别名
  logging: isPro ? false : console.log,
  // timezone: '+00:00',
  define: {
    underscored: false,                             // 强调
    freezeTableName: false,                         // 冻结表名
    charset: 'utf8',                                // 字符集
    dialectOptions: {                               // 方言选择
      collate: 'utf8_general_ci'                    // 核对/检查
    },
    timestamps: true                                // 时间戳
  }

};

const database = {
  host: 'localhost',
  dialect: 'mysql',
  database: 'program_oAuth',
  username: 'root',
  /*dialectOptions: {
    socketPath: '/tmp/mysql.sock' // 指定套接字文件路径
  },*/
};

const development = {
  ...database,
  port: 3306,
  password: '123456'
};

const production = {
  ...database,
  port: 3306,
  password: 'as123456'
};

export default {
  setting: setting,
  config: isPro ? production : development,
}
