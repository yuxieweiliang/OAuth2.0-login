// 初始化脚本
import orm from '../database'
import name from '../config/table-name'

import initial from './initial'

import user from './user'
import client from './client'
import role from './role'
import right from './right'
import jurisdiction from './jurisdiction'


async function findModel(database, tableName, opts) {
  if(!database) throw new Error(database + 'is not find')
  return await orm.model(database, tableName, opts)
}


export default {
  initialModel: async (database) => await findModel(database, name.initial, initial),
  userModel: async (database) => await findModel(database, name.user, user),
  clientModel: async (database) => await findModel(database, name.client, client),
  roleModel: async (database) => await findModel(database, name.role, role),
  rightModel: async (database) => await findModel(database, name.right, right),
  jurisdictionModel: async (database) => await findModel(database, name.jurisdiction, jurisdiction),
}

