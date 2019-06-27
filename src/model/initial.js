import Sequelize from 'sequelize'

/**
 * 系统所属标识
 */
export default {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    comment: '标识'
  },

  status: {
    type: Sequelize.BIGINT,
    defaultValue: 0,
    comment: '系统的初始化状态，0：表示系统没有初始化 1：表示系统已经初始化成功'
  }
}
