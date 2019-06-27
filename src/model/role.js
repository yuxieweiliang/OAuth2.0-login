import Sequelize from 'sequelize';

//
export default {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    comment: '角色标识'
  },
  name: {
    type: Sequelize.STRING(255),
    unique: true,
    allowNull: false,
    comment: '角色的名称'
  },
  /*rights: {
    type: Sequelize.STRING(255),
    comment: '角色的权限（0：没有任何权限 [1, 2, 3, ...number]：权限列表）',
    defaultValue: 0,
  },*/
  school: {
    type: Sequelize.SMALLINT,
    defaultValue: 0,
    comment: '{null: 非学校, 0: 表示公共, {id}: 学校私有}'
  },
  intro: {
    type: Sequelize.TEXT,
    comment: '角色的描述'
  },
  status: {
    type: Sequelize.SMALLINT,
    defaultValue: 1,
    comment: '角色的状态: 0 表示已删除或者下架 1 角色 2 表示组织'
  }
}
