import Sequelize from 'sequelize';

export default {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    comment: '权限标识'
  },
  key: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    comment: '对应的系统功能的标识'
  },
  name: {
    type: Sequelize.STRING(255),
    allowNull: false,
    comment: '权限的名称'
  },
  intro: {
    type: Sequelize.TEXT,
    comment: '权限的描述'
  },
  status: {
    type: Sequelize.SMALLINT,
    defaultValue: 1,
    comment: '权限的状态: 0 表示已删除或者下架 1 正常可用'
  }
}
