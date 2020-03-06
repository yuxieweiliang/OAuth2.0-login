import orm from '../database'
// 初始化脚本
import Users from './data/user'
import Clients from './data/client'
import Roles from './data/role';
import Rights from './data/rights';
import Jurisdiction from './data/jurisdiction';
import tables from '../database/tables'

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

  // 权限
  model = await tables.rightModel(database);
  values = toArray(Rights);
  isOk = await model.bulkCreate(values, { ignoreDuplicates : true });
  if (!isOk) return typeof callback === 'function' && callback(false);
  console.log('------------- rightModel', !!isOk);

  // 角色
  model = await tables.roleModel(database);
  values = toArray(Roles);
  isOk = await model.bulkCreate(values);
  if (!isOk) return typeof callback === 'function' && callback(false);
  console.log('------------- roleModel', !!isOk);

  // 权限分组关系
  model = await tables.jurisdictionModel(database);
  const jurisdiction = await Jurisdiction(database);
  values = toArray(jurisdiction);
  isOk = await model.bulkCreate(values, { ignoreDuplicates : true });
  if (!isOk) return typeof callback === 'function' && callback(false);
  console.log('------------- jurisdictionModel', !!isOk);

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



















