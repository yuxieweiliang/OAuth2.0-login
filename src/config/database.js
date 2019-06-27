/**
 * @see http://docs.sequelizejs.com/manual/installation/getting-started.html
 * @default options {
 *             host: 'localhost',
 *             dialect: 'mysql'|'sqlite'|'postgres'|'mssql',
 *             operatorsAliases: false,
 *             pool: {
 *               max: 5,
 *               min: 0,
 *               acquire: 30000,
 *               idle: 10000
 *             },
 *
 *             // SQLite only
 *             storage: 'path/to/database.sqlite'
 * }
 */
import { isProd } from '../services/utils'

export default {
  common: {
    pool: {
      max: 500,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    operatorsAliases: false,                          // 运算符别名
    logging: isProd ? false : console.log,
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
  },

  default: {
    port: 3306,
    host: 'localhost',
    dialect: 'mysql',
    database: 'program',
    /*dialectOptions: {
      socketPath: '/tmp/mysql.sock' // 指定套接字文件路径
    },*/
    username: 'root',
    password: 'as123456' // zaq1xsw2
  },

  dev: {
    port: 3306,
    host: 'localhost',
    dialect: 'mysql',
    username: 'root',
    password: '123456'
  },

  prod: {
    port: 3306,
    host: 'localhost',
    dialect: 'mysql',
    username: 'root',
    password: 'as123456'
  }
}
