// 初始化脚本
import orm from '../services/database';
import name from '../config/table-name'

import initial from '../model/initial';

import user from '../model/user';
import client from '../model/client';
import school from '../model/school';
import role from '../model/role';
import right from '../model/right';
import jurisdiction from '../model/jurisdiction';


async function findModel(database, tableName, opts) {
  if(!database) throw new Error(database + 'is not find');
  return await orm.model(database, tableName, opts)
}


export default {
  initialModel: async (database) => await findModel(database, name.initial, initial),
  userModel: async (database) => await findModel(database, name.user, user),
  clientModel: async (database) => await findModel(database, name.client, client),
  schoolModel: async (database) => await findModel(database, name.school, school),
  roleModel: async (database) => await findModel(database, name.role, role),
  rightModel: async (database) => await findModel(database, name.right, right),
  jurisdictionModel: async (database) => await findModel(database, name.jurisdiction, jurisdiction),
}

