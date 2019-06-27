import orm from '../services/database';
// 初始化脚本
import Users from './data/user';
import Clients from './data/client';
import tables from '../services/tables'

function toArray(array) {
 return Array.isArray(array) ? array : [array];
}

/**
 * 初始化成功之后执行的函数
 * @param {function} callback
 */
async function initial(callback) {
  let isOk;
  let values, model;

  // 初始化数据库
  const database = await orm.use(orm.configures.default);

  const IM = await tables.initialModel(database);
  isOk = await IM.findAll({
    where: { status: 1 },
    attributes: ['status']
  });

  if (isOk.length) return typeof callback === 'function' && callback(true);

  /**
   * { 创建 } 用户
   */
  model = await tables.userModel(database);
  values = toArray(Users);
  isOk = await model.bulkCreate(values, { ignoreDuplicates : true });
  if (!isOk) return typeof callback === 'function' && callback(false);

  /**
   * { 创建 } 企业
   */
  model = await tables.clientModel(database);
  values = toArray(Clients);
  isOk = await model.bulkCreate(values, { ignoreDuplicates : true });
  if (!isOk) return typeof callback === 'function' && callback(false);


  /**
   * { 完成 }
   */
  isOk = await IM.create({ status: 1 });
  if (!isOk) return typeof callback === 'function' && callback(false);
  typeof callback === 'function' && callback(true)
}

export {
  initial as default
}



















