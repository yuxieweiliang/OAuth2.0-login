import md5 from 'md5';

// 默认用户
export default [
  {
    account: 'AKProot',
    pwd: md5('as123456'),
    father: 0,
    sex: 0,
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
    pwd: md5('123123'),
    father: 0,
    sex: 0,
    name: '云若风生',
    mobile: 12345678912,
    email: '541979581@qq.com',
    intro: '普通用户',
    role: 1,
    group: 5,
    status: 1
  },{
    account: '123456',
    pwd: md5('123456'),
    father: 0,
    sex: 1,
    name: '南宫安然',
    mobile: 12345678912,
    email: '541979581@qq.com',
    intro: '幻想世界的旅行者',
    role: 3,
    group: 7,
    status: 1
  },{
    account: 'dongfangqiubai',
    pwd: md5('123456'),
    father: 0,
    sex: 0,
    name: '东方求败',
    mobile: 12345678912,
    email: '541979581@qq.com',
    intro: '普通用户',
    // role: null,
    // group: null,
    status: 1
  },{
    account: 'ximenwenshan',
    pwd: md5('123456'),
    father: 0,
    sex: 0,
    name: '西门文山',
    mobile: 12345678912,
    email: '541979581@qq.com',
    intro: '普通用户',
    role: 3,
    group: 8,
    status: 1
  },{
    account: 'zhangtianyu',
    pwd: md5('123456'),
    father: 0,
    sex: 0,
    name: '张天宇',
    mobile: 12345678912,
    email: '541979581@qq.com',
    intro: '普通用户',
    role: 4,
    group: 9,
    status: 1
  }
]
