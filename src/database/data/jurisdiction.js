// 系统角色
import Sequelize from "sequelize";
import tables from '../../database/tables'


// 超级管理员
const root = 'admin_root';

// 普通用户组
const userKeys = [
    'user_share_product', // 分享作品
    'user_look_tutorial', // 查看教程
    'user_can_creation',  // 创建作品
  ];

// 管理员用户组
const adminKeys = [
  'admin_entry_back',       // 进入管理后台
  'admin_import_user',      // 导入用户
  'admin_managing_schools', // 管理学校
  'admin_managing_user',    // 管理用户
  'admin_managing_power',   // 修改权限
];

// 学校用户组
const schoolKeys = [
  'admin_entry_back',
  'admin_import_user',
  'school_managing',  // 学校管理
  'school_managing_class',// 班级管理
];


async function findAll(model, keys) {
  return await model.findAll({
    where: {
      key: {
        [Sequelize.Op.in]: keys
      }
    },
    attributes: [ 'id' ]
  });
}

export default async function f(database) {
  const model = await tables.rightModel(database);
  const rootId = await model.findOne({where: {key: root }, attributes: [ 'id' ]});
  const userIds = await findAll(model, userKeys);
  const adminIds = await findAll(model, userKeys.concat(adminKeys));
  const schoolIds = await findAll(model, userKeys.concat(schoolKeys));

  const data = [];

  // 超级管理员
  data.push({right: rootId.id, role: 2});

  // 普通用户组
  userIds.map(item => {
    data.push({right:item.id, role: 5})
  });

  // 管理员用户组
  adminIds.map(item => {
    data.push({right:item.id, role: 6})
  });

  // 学校用户组
  schoolIds.map(item => {
    data.push({right:item.id, role: 7})
  });

  return data;
}
