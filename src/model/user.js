import Sequelize from 'sequelize';

export default {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    comment: '用户标识'
  },
  account: {
    type: Sequelize.STRING(255),
    unique: true,
    allowNull: false,
    comment: '用户账号'
  },
  pwd: {
    type: Sequelize.STRING(255),
    allowNull: false,
    comment: '用户密码'
  },
  father: {
    type: Sequelize.BIGINT,
    defaultValue: 0,
    comment: '用户来源或者父级'
  },
  name: {
    type: Sequelize.STRING(255),
    comment: '用户昵称或者姓名'
  },
  sex: {
    type: Sequelize.SMALLINT,
    defaultValue: 0,
    comment: '用户性别 { (null|0): 保密, 1: 男, 2: 女 }'
  },
  age: {
    type: Sequelize.SMALLINT,
    defaultValue: 0,
    comment: '年龄'
  },
  mobile: {
    type: Sequelize.STRING(255),
    comment: '电话号码'
  },
  email: {
    type: Sequelize.STRING(255),
    comment: '邮箱'
  },
  avatar: {
    type: Sequelize.STRING(255),
    comment: '头像'
  },
  nation: {
    type: Sequelize.STRING(255),
    comment: '民族',
    defaultValue: 1
  },
  intro: {
    type: Sequelize.TEXT,
    comment: '简介'
  },

  /**
   * 通过 relationship 创建
   * role: {
    type: Sequelize.STRING(255),
    comment: '身份',
    defaultValue: 1
  },
  group: {
    type: Sequelize.STRING(255),
    comment: '分组',
    defaultValue: 6
  },
  school: {
    type: Sequelize.BIGINT,
    defaultValue: 0,
    comment: '用户所在学校（{null | 0}：没有学校，{id}：学校id）'
  },*/
  status: {
    type: Sequelize.SMALLINT,
    defaultValue: 1,
    comment: '用户状态 0 表示已删除或者被禁用 1 表示正常用户'
  }
}

/*
  查一个人，然后查学校，然后在学校所在的数据库中查学生的资源。

  人是整体的，资源是按照学院划分的。

  async getUserById(id) {
    const sql = 'SELECT name, sex, mobile, email, avatar, intro, joined_at, logined_at FROM user WHERE id=:id'
    return await orm.query('program', sql, function (queryTypes) {
      return {
        replacements: {
          id: id
        },
        type: queryTypes.SELECT
      }
    })
  }
*/


