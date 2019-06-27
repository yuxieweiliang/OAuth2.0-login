import Sequelize from 'sequelize';

export default {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    comment: '用户标识'
  },
  user: {
    type: Sequelize.BIGINT,
    defaultValue: 1,
    comment: '创建者'
  },
  name: {
    type: Sequelize.STRING(255),
    comment: '名称'
  },
  father: {
    type: Sequelize.BIGINT,
    comment: '用户来源或者父级'
  },
  email: {
    type: Sequelize.STRING(255),
    comment: '邮箱'
  },
  figure: {
    type: Sequelize.STRING(255),
    comment: '形象'
  },
  website: {
    type: Sequelize.STRING(255),
    comment: '主页网址'
  },
  intro: {
    type: Sequelize.TEXT,
    comment: '简介'
  },
  secret: {
    type: Sequelize.STRING(255),
    unique: true,
    allowNull: false,
    comment: '简介'
  },
  status: {
    type: Sequelize.SMALLINT,
    defaultValue: 1,
    comment: '用户状态 0 表示已删除或者被禁用 1 表示正常用户'
  }
}
