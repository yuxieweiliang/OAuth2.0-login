// 初始化脚本
import orm from '../database'
import models from '../model'

// new class Relationship
export default  {

  /**
   * 用户 - 角色 - 角色组
   * @param database
   * @returns {Promise<{UserModel: *, RoleModel: *}>}
   */
  async user(database) {
    const name = database.config.database
    const UserModel = await models.userModel(database)
    const RoleModel = await models.roleModel(database)
    RoleModel.hasMany(UserModel, {foreignKey: 'group' })
    // UserModel.belongsTo(RoleModel, {foreignKey: 'group' })
    RoleModel.hasMany(UserModel, {foreignKey: 'role' })
    // UserModel.belongsTo(RoleModel, {foreignKey: 'role' })

    await orm.define(name, UserModel)

    return {UserModel, RoleModel}
  },

  /**
   *
   * @param database
   * @returns {Promise<{RightModel: *, JurisdictionModel: *, RoleModel: *}>}
   */
  async jurisdiction(database) {
    const name = database.config.database
    const RightModel = await models.rightModel(database)
    const JurisdictionModel = await models.jurisdictionModel(database)
    const RoleModel = await models.roleModel(database)

    // 一条规则可以被多个权限组使用
    RightModel.belongsToMany(RoleModel, {through: JurisdictionModel, foreignKey: 'right' })
    // 一个权限需要多条规则
    RoleModel.belongsToMany(RightModel, {through: JurisdictionModel, foreignKey: 'role' })

    // UserModel.hasOne(RoleModel, { foreignKey: 'role' })
    // UserModel.hasOne(RoleModel, { foreignKey: 'group' })

    await orm.define(name, JurisdictionModel)

    return {RightModel, RoleModel, JurisdictionModel}
  },

}



















