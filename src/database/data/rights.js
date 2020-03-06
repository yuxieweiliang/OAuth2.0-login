// 权限

// 普通用户
// user_share_product,user_look_tutorial,user_can_search,user_can_creation,user_register
// user_share_product # 分享作品
// user_look_tutorial # 观看教程
// user_can_creation # 作品创作
// user_register # 用户注册


// 超级管理员
// admin_entry_back,admin_import_user,admin_managing_schools,admin_managing_user
// admin_managing_user, # 用户管理
// admin_import_user, # 用户导入
// admin_entry_back, # 进入后台管理
// admin_managing_schools, # 管理学校

// 学校
// school_managing_class,school_managing_student,
// school_managing_class # 管理班级
// school_modify_class # 修改班级
// school_managing_student # 管理学生
// school_modify_student # 修改学生

export default [
  {
    user: 1,
    key: 'admin_root',
    name: '超级管理员',
    intro: '允许所有操作',
    status: 1
  },
  {
    user: 1,
    key: 'admin_entry_back',
    name: '进入管理后台',
    intro: '允许用户进入管理后台',
    status: 1
  },

  /**
   * 用户管理
   */
  {
    user: 1,
    key: 'admin_managing_user',
    name: '用户管理',
    intro: '允许用户在后端管理，添加、修改、删除用户',
    status: 1
  },
  {
    user: 1,
    key: 'admin_import_user',
    name: '导入用户',
    intro: '允许用户在管理后端批量导入用户',
    status: 1
  },
  {
    user: 1,
    key: 'admin_managing_schools',
    name: '管理/添加学校',
    intro: '允许管理/添加学校组织',
    status: 1
  },
  {
    user: 1,
    key: 'admin_managing_power',
    name: '管理权限',
    intro: '允许管理权限',
    status: 1
  },


  /**
   * 普通用户
   */
  {
    user: 1,
    key: 'user_share_product',
    name: '分享作品',
    intro: '允许用户分享自己或他人的作品',
    status: 1
  },
  {
    user: 1,
    key: 'user_look_tutorial',
    name: '观看教程',
    intro: '允许用户使用编辑器开始创作',
    status: 1
  },
  {
    user: 1,
    key: 'user_can_creation',
    name: '作品创作',
    intro: '允许用户使用编辑器开始创作',
    status: 1
  },

  /**
   * 学校管理
   */
  {
    user: 1,
    key: 'school_managing',
    name: '学校管理',
    intro: '学校最高管理员，可以管理所有信息。',
    status: 1
  },

  {
    user: 1,
    key: 'school_managing_class',
    name: '班级管理',
    intro: '班级管理员，允许添加/修改/删除自己所在的班级信息。',
    status: 1
  },

  /**
   * 评论管理
   */
  {
    user: 1,
    key: 'comment_managing',
    name: '评论管理',
    intro: '管理用户的评论信息。',
    status: 1
  },
];
