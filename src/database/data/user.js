import md5 from 'md5';

// 默认用户
export default [
  {
    account: 'AKProot',
    password: md5('as123456'),
    father: 0,
    gander: 0,
    name: '无名',
    mobile: 12345678912,
    email: '541979581@qq.com',
    intro: '系统管理员',
    role: 2,
    group: null,
    status: 1
  },
  {
    account: '123123',
    password: md5('123123'),
    father: 0,
    gander: 0,
    name: '云若风生',
    mobile: 12345678912,
    email: '541979581@qq.com',
    intro: '普通用户',
    role: 1,
    group: 1,
    status: 1
  },{
    account: '123456',
    password: md5('123456'),
    father: 0,
    gander: 1,
    name: '南宫安然',
    mobile: 12345678912,
    email: '541979581@qq.com',
    intro: '幻想世界的旅行者',
    role: 3,
    group: 1,
    status: 1
  },{
    account: 'dongfangqiubai',
    password: md5('123456'),
    father: 0,
    gander: 0,
    name: '东方求败',
    mobile: 12345678912,
    email: '541979581@qq.com',
    intro: '普通用户',
    // role: null,
    // group: null,
    status: 1
  },{
    account: 'ximenwenshan',
    password: md5('123456'),
    father: 0,
    gander: 0,
    name: '西门文山',
    mobile: 12345678912,
    email: '541979581@qq.com',
    intro: '普通用户',
    role: 3,
    group: 1,
    status: 1
  },{
    account: 'zhangtianyu',
    password: md5('123456'),
    father: 0,
    gander: 0,
    name: '张天宇',
    mobile: 12345678912,
    email: '541979581@qq.com',
    intro: '普通用户',
    role: 4,
    group: 1,
    status: 1
  }
]
