// 系统角色
export default [
  /**
   * 角色
   */
  {
    user: 1,
    name: '普通用户',
    intro: '系统权限最高者管理员',
    status: 1
  },
  {
    user: 1,
    name: '超级管理员',
    intro: '系统权限最高者管理员',
    status: 1
  },

  /**
   * 组织
   */
  {
    user: 1,
    name: '普通用户组',
    intro: '系统的管理者的集合',
    status: 2
  },
  {
    user: 1,
    name: '系统管理组',
    intro: '系统的管理者的集合',
    status: 2
  },

  /**
   * 作品归属
   * 一种为学生作品，组织归属学校。
   * 一种是个人作品，作品归属个人。
   */
  {
    user: 1,
    name: '大众作品',
    intro: '系统权限最高者管理员',
    status: 3
  },
];
