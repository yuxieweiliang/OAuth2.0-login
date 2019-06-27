import Sequelize from 'sequelize';
import { database } from '../../../config';
import { isProd } from '../utils';
import autoCreateDatabaseMysql from './auto-create-databse-mysql'


class Operation {
  constructor() {
    this.configures = this._getConfig();
    this.connection = new Map();
    this.modelCache = new Map();
    this.createdDBS = new Map()
  }

  _getConfig() {
    const defaultConfig = this._getOption();
    const option = [].concat(defaultConfig);
    const config = {
      // 默认的数据库名字
      default: defaultConfig.database
    };

    option.forEach(opt => {
      config[opt.database] = Object.assign({}, opt)
    });

    return config
  }

  /**
   * 获取数据库配置
   * @returns {any}
   * @private
   */
  _getOption() {
    const { setting, config } = database || {};

    return Object.assign({}, setting, config);
  }

  _customConfig(database, name) {
    const _conf = this._getOption();
    this.configures[database] = Object.assign({}, _conf, { [name]: database });

    return this.configures[database]
  }

  async getConfig(database, name) {
    let config = this.configures[database] || this._customConfig(database, name);
    if (!config) {
      throw new Error(`Database: ${database} Config does not exsited .`)
    }

    try {
      const created = await autoCreateDatabaseMysql(config);

      if (created !== true) {
        throw created
      }
    }catch (e) {
      throw new Error(`Database
      isProd:（${isProd}）
      port:（${config.port}）
      host:（${config.host}）
      dialect:（${config.dialect}）
      database:（${config.database}）
      username:（${config.username}）
      password:（${config.password}）
      error: ${e}.`)
    }
    return config
  }

  /**
   * 如果已连接，则返回数据库
   * @param database
   * @returns {any}
   */
  getConnect(database) {
    if (this.connection.has(database)) {
      return this.connection.get(database)
    }
  }

  /**
   * 使用数据库
   * @param database ( 数据库名 | 数据库实例 )
   * @returns {Promise<*>}
   */
  async use(database) {
    const name = typeof database === 'string' ? database : database.config.database;
    let connect = this.getConnect(database);

    /**
     * 如果数据库未连接，
     * 则创建一个
     */
    if (!connect) {
      const config = await this.getConfig(database, name);

      connect = new Sequelize(config);
      this.connection.set(name, connect)
    }

    return connect
  }

  /**
   * @example
   *
   * orm.query('SELECT * FROM projects WHERE status = :status ',
   *    { replacements: { status: 'active' }, type: sequelize.QueryTypes.SELECT }
   * ).then(projects => {
   *    console.log(projects)
   * })
   *
   * sequelize.query('SELECT *, "text with literal $$1 and literal $$status" as t FROM projects WHERE status = $status',
   *   { bind: { status: 'active' }, type: sequelize.QueryTypes.SELECT }
   * ).then(projects => {
   *   console.log(projects)
   * })
   */
  async query(database, sql, handler) {
    const seqDB = await this.use(database);
    const option = typeof handler === 'function' ? handler(seqDB.QueryTypes, seqDB) : null;

    return seqDB.query(sql, option).then(projects => projects).catch(err => {
      console.log('sql:', sql);
      console.log('sql query error: ', err)
    })
  }

  async model(database, tableName, opts) {
    return database.define(tableName, opts, {
      // 不要添加时间戳属性 (updatedAt, createdAt)
      timestamps: true,

      // 不从数据库中删除数据，而只是增加一个 deletedAt 标识当前时间
      // paranoid 属性只在启用 timestamps 时适用
      paranoid: true,

      // 不使用驼峰式命令规则，这样会在使用下划线分隔
      // 这样 updatedAt 的字段名会是 updated_at
      underscored: true,

      // 禁止修改表名. 默认情况下
      // sequelize会自动使用传入的模型名（define的第一个参数）做为表名
      // 如果你不想使用这种方式你需要进行以下设置
      freezeTableName: true,

      // 定义表名
      tableName: tableName,

      // 表所在的数据库
      // schema: database
    });
  }

  async define(databaseName, model) {
    const cacheKey = databaseName + '.' + model.name;
    console.log('cacheKey: ===> ', cacheKey);
    if (cacheKey in this.modelCache) {

      return this.modelCache[cacheKey];
    }

    return model.sync().then(current => {
      this.modelCache[cacheKey] = model;

      return model;
    }).catch(err => {
      err.name = 'DB.Sync.Error';
      err.message = err.message + ' - 数据库同步出错';
      throw err;
    });
  }
}

export default new Operation()
