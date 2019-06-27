import Sequelize from 'sequelize';

//
export default {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    comment: '学校标识'
  },
  name: {
    type: Sequelize.STRING(255),
    unique: true,
    allowNull: false,
    comment: '学校名称',
  },
   /**
    * 学校类型： configure.findById(school.type)
    * 年级：     grade.findAll({ where: { type: school.type}})
   * school.type = configure.findById(school.type) = [...grade.type]
   * 查询的configure表中status=1的字段中学校的ID，然后通过ID，在grade中查找相应type字段
   */
  type: {
    type: Sequelize.BIGINT,
    comment: '学校年级ID'
  },
  intro: {
    type: Sequelize.TEXT,
    comment: '学校的描述'
  },
  address: {
    type: Sequelize.TEXT,
    comment: '学校的地址'
  },
  domain: {
    type: Sequelize.TEXT,
    comment: '学校的域名'
  },
  status: {
    type: Sequelize.SMALLINT,
    defaultValue: 1,
    comment: '学校的状态: 0 表示已删除或者下架 1 正常'
  }
}
