import Sequelize from 'sequelize';

//
export default {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    comment: '角色标识'
  },

  /*role: {
    type: Sequelize.STRING(255),
    comment: '角色组的ID'
  },
  right: {
    type: Sequelize.STRING(255),
    comment: '权限的ID',
    defaultValue: 0,
  },*/
  status: {
    type: Sequelize.SMALLINT,
    defaultValue: 1,
    comment: '角色的状态: 0 表示已删除或者下架 1 角色 2 表示组织'
  }
}
