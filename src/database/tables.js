// 初始化脚本
import orm from '../database';
import models from '../model';

export default {
  initialModel: async (database) => await orm.define(
    database.config.database,
    await models.initialModel(database)
  ),

  userModel: async (database) => await orm.define(
    database.config.database,
    await models.userModel(database)
  ),

  clientModel: async (database) => await orm.define(
    database.config.database,
    await models.clientModel(database)
  ),

  roleModel: async (database) => await orm.define(
    database.config.database,
    await models.roleModel(database)
  ),

  rightModel: async (database) => await orm.define(
    database.config.database,
    await models.rightModel(database)
  ),

  jurisdictionModel: async (database) => await orm.define(
    database.config.database,
    await models.jurisdictionModel(database)
  ),
}

