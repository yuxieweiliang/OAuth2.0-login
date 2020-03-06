import Sequelize from 'sequelize'
import md5 from 'md5'
import jwt from 'jsonwebtoken'
import orm from '../../database'
import { constructor, get, post, put, del } from '../../services/controller'
import { secret } from '../../../config/secret';
import { isInteger, isString, getPagerOptions, getPositiveInteger, createDatabase } from '../../services/utils'
import tables from '../../database/tables'
import _ from 'lodash'

const database = orm.configures.default


@constructor('user')
export default class User {
  /**
   * get users by user ids
   * @param {array} ids      - user Id
   */
  @post('/ids')
  async getUserByIds(ctx, next) {
    const queries = ctx.queries;
    const pool = await createDatabase();
    const model = await tables.userModel(pool);
    const options = {
      where: {
        status: {
          [Sequelize.Op.gt]: 0
        },
        id: {
          [Sequelize.Op.in]: queries.ids
        }
      },
      attributes: ['id', 'name', 'avatar', 'role', 'group']
    };

    ctx.body = await model.findAll(options);
    await next()
  }

  /**
   * get users
   * @param {number} pageNo    - page Number
   * @param {number} pageSize  - page Size
   * @param {number} user      - user Id
   */
  @get('/')
  async getUsers(ctx, next) {
    const queries = ctx.queries;
    const [user_id, client_id] = ctx.oAuth;
    const pool = await createDatabase();
    const model = await tables.userModel(pool);
    const pager = getPagerOptions(queries);

    console.log(user_id, client_id);
    const options = {
      offset: pager.offset,
      limit: pager.limit,
      where: {
        status: 1,
        id: user_id
      },
      order: [
        ['updated_at', 'DESC']
      ],
      fields: [
        'account',
        'name',
        'sex',
        'mobile',
        'email',
        'avatar',
        'intro',
        'school',
        'role',
        'group',
        'father',
        'status'
      ]
    };

    if (isInteger(queries.father)) {
      options.where.father = queries.father
    }

    // console.log(options);
    ctx.body = await model.findOne(options);
    // console.log(ctx.body);
    await next()
  }

  /**
   * get student
   * param {number} grade ID
   * param {number} class ID
   * queries: {
   *   pageNo    - page Number
   *   pageSize  - page Size
   * }
   */
  @get(/student\/(\d+)\/(\d+)\/?$/)
  async getStudents(ctx, next) {
    const queries = ctx.queries;
    const { school, rights } = ctx.user;
    const pool = await createDatabase();
    const model = await tables.userModel(pool);
    const pager = getPagerOptions(queries);
    const grade = getPositiveInteger(ctx.params[0]);
    const classes = getPositiveInteger(ctx.params[1]);

    const options = {
      offset: pager.offset,
      limit: pager.limit,
      where: {
        status: 1,
        grade,
        classes,
      },
      order: [
        ['updated_at', 'DESC']
      ],
      fields: [
        'account',
        'name',
        'sex',
        'mobile',
        'email',
        'avatar',
        'intro',
        'school',
        'role',
        'group',
        'father',
        'status'
      ]
    };

    if(school) {
      options.where.school = school;
    }

    if (isInteger(queries.father)) {
      options.where.father = queries.father
    }

    console.log(ctx.user);

    ctx.body = await model.findAndCountAll(options);
    await next()
  }

  /**
   * get user info by  ID
   * @param {number} id - user ID
   */
  @get(/(\d+)\/?$/)
  async getUserById(ctx, next) {
    const pool = await createDatabase();
    const id = getPositiveInteger(ctx.params[0]);
    if (id) {
      const model = await tables.userModel(pool);

      ctx.body = await model.findByPk(id);
      if (!ctx.body) {
        ctx.body = new ctx.Tolerance('User', 'getUserById', 1, id)
      }
    } else {
      ctx.body = new ctx.Tolerance('User', 'getUserById', 2)
    }

    await next()
  }

  /**
   * get user info by  ID
   * @param {number} id - user ID
   */
  @get('/school')
  async findSchoolMaster(ctx, next) {
    const { name, account } = ctx.queries;
    const rights = ctx.user.rights;
    const pool = await createDatabase();

    if(rights.includes('admin_root')) {

      const model = await tables.userModel(pool);
      if(name) {
        ctx.body = await model.findOne({ where: { name }});
      } else if(account) {
        ctx.body = await model.findOne({ where: { account }});
      } else {
        ctx.body = new ctx.Tolerance('User', 'findSchoolMaster', 1, '用户姓名或账号不能为空');
      }

      if (!ctx.body) {
        ctx.body = new ctx.Tolerance('User', 'findSchoolMaster', 1, '没有找到！')
      }
    } else {
      //  权限不足
      ctx.body = new ctx.Tolerance('User', 'findSchoolMaster', 3008);
    }
    await next()
  }

  /**
   * create a user by other user
   * @param {Object} a user Model
   */
  @post('/')
  async createUser(ctx, next) {
    const queries = ctx.queries;
    const pool = await createDatabase();

    if (queries.account) {
      const model = await tables.userModel(pool);
      const user = await model.findOne({
        where: {
          account: queries.account
        }
      });

      if (user) {
        ctx.body = new ctx.Tolerance('User', 'create', 11, queries.account)
      } else {
        const userPwd = queries.pwd || '123456'; // default password

        ctx.body = await model.create({
          account: queries.account,
          pwd: md5(userPwd),
          name: queries.name,
          sex: queries.sex,
          mobile: queries.mobile,
          email: queries.email,
          avatar: queries.avatar,
          intro: queries.intro,
          grade: queries.grade,
          classes: queries.classes,
          school: ctx.user.school,
          role: 1,
          group: 5,
          father: 0,
          status: 1
        });

        if (ctx.body) {
          ctx.body.pwd = userPwd
        } else {
          ctx.body = new ctx.Tolerance('User', 'create', 3, uid)
        }
      }
    } else {
      ctx.body = new ctx.Tolerance('User', 'create', 12)
    }

    await next()
  }

  /**
   * create a user by other user
   * @param {Object} a user Model
   */
  @post(/(\d+)\/create?$/)
  async createUserByUser(ctx, next) {
    const queries = ctx.queries;
    const pool = await createDatabase();
    const uid = getPositiveInteger(ctx.params[0]);
    const model = await tables.userModel(pool);
    const createdUser = await model.findByPk(uid);

    if (!createdUser) {
      ctx.body = new ctx.Tolerance('User', 'createByUser', 13, uid)
    } else {
      const userPwd = queries.pwd || '123456';

      ctx.body = await model.create({
        account: queries.account,
        pwd: md5(userPwd),
        name: queries.name,
        sex: queries.sex,
        mobile: queries.mobile,
        school: queries.school,
        email: queries.email,
        avatar: queries.avatar,
        intro: queries.intro,
        role: queries.role,
        group: queries.group,
        father: uid || 0,
        status: 1
      });

      if (ctx.body) {
        ctx.body.pwd = userPwd
      } else {
        ctx.body = new ctx.Tolerance('User', 'createByUser', 3, uid)
      }
    }

    await next()
  }

  /**
   * delete user product id
   * @param {number} user id
   * @param {number} id - product id
   */
  @del(/(\d+)\/?$/)
  @post(/(\d+)\/delete\/?$/)
  async deleteUser(ctx, next) {
    // const queries = ctx.queries
    const pool = await createDatabase();
    const id = getPositiveInteger(ctx.params[0]);
    // const father = getPositiveInteger(queries.father) || 0
    if (id) {
      const model = await tables.userModel(pool);
      const where = { id };

      ctx.body = await model.update({ status: 0 }, { where: where });
      ctx.body = await model.destroy({ where: where });
      ctx.body = ctx.body > 0 ? { state: ctx.body } : new ctx.Tolerance('User', 'deleteUser', 5, id)

    } else {
      ctx.body = new ctx.Tolerance('User', 'deleteUser', 4, id)
    }

    await next()
  }

  /**
   * update a user info
   * @param {Object} a product model, and ingore product id
   */
  @put(/(\d+)\/?$/)
  @post(/(\d+)\/update\/?$/)
  async updateUser(ctx, next) {
    const values = ctx.queries;
    const id = getPositiveInteger(ctx.params[0]);
    const pool = await createDatabase();
    // const father = getPositiveInteger(values.father) || 0

    if (id) {
      const model = await tables.userModel(pool);
      const options = this._getUpdateOptions(id); // ,father
      if (Array.isArray(values.pwd)) {
        const theUser = await model.findByPk(id);
        const oldPwd = md5(values.pwd[0]);

        if (oldPwd === theUser.pwd) {
          values.pwd = md5(values.pwd[1])
        } else {
          ctx.body = new ctx.Tolerance('User', 'updateUser', 16, id);

          return await next()
        }
      }

      const rs = await model.update(values, options);

      ctx.body = !rs
        ? new ctx.Tolerance('User', 'updateUser', 6, id)
        : { state: rs[0] }

    } else {
      ctx.body = new ctx.Tolerance('User', 'updateUser', 7, id)
    }

    await next()
  }

  _getUpdateOptions(id, father) {
    return {
      where: {
        id: id,
        // father: father
      },
      force: true,
      fields: ['name', 'pwd', 'sex', 'mobile', 'email', 'avatar', 'intro', 'role', 'status']
    }
  }

  /**
   * Token issued
   * user login
   * @param {string} account
   * @param {string} pwd
   */
  @post('/sign')
  async sign(ctx, next) {
    const pool = await orm.use(database);
    const rBody = ctx.request.body; // { account, pwd }
    const body = isString(rBody) ? JSON.parse(ctx.request.body) : rBody;

    if (isString(body.account)) {
      const { UserModel, SchoolModel } = await relationship.user(pool);

      const user = await UserModel.findOne({
        where: {
          account: body.account
        },
        // include: [SchoolModel]
      });

      if (user) {
        if (md5(body.pwd) === user.pwd) {
          const {RoleModel, RightModel } = await relationship.jurisdiction(pool);
          let rights = [], role, group, school;
          const options = {
            attributes: ['id', 'name', 'intro'],
            include: [{
              model: RightModel,
              where: {status: 1},
              attributes: ['id', 'key', 'name', 'intro']
            }]
          };

          /**
           * 如果存在角色
           */
          if(user.role) {
            options.where = {id: user.role};
            role = await RoleModel.findOne(options);
            /**
             * 因为 当权限关系不存在时，返回 null
             * 所以权限详情需要重新获取
             */
            if(role) {
              console.log('group: ', role.toJSON());
              rights = rights.concat(role.rights.map((item) => item.key));
            } else {
              // 去掉 include 重新获取
              const { include, ...opt} = options;
              role = await RoleModel.findOne(opt);
            }
          }


          /**
           * 如果存在用户组
           */
          if(user.group) {
            options.where = {id: user.group};
            group = await RoleModel.findOne(options);
            if(group) {
              console.log('group: ', group.toJSON());
              rights = rights.concat(group.rights.map((item) => item.key));
            } else {
              // 去掉 include 重新获取
              const { include, ...opt} = options;
              group = await RoleModel.findOne(opt);
            }
          }

          /**
           * 如果存在学校
           */
          if(user.school) {
            school = await SchoolModel.findOne({where: {id: user.school, status: 1}});
            console.log('school: ', school.toJSON());
          }

          const token = jwt.sign({
            id: user.id,
            // account: user.account,
            school: user.school,
            rights: rights.toString(),
            time: Date.now()
          }, secret, { expiresIn: '3650h' });

          user.role = role;
          user.group = group;
          user.school = school;
          // return the original user password
         delete user.pwd;

          ctx.body =  {
            info: user,
            rights: rights,
            token
          }
        } else{
          ctx.body = new ctx.Tolerance('User', 'sign', 10)
        }
      } else {
        ctx.body = new ctx.Tolerance('User', 'sign', 9)
      }
    } else {
      ctx.body = new ctx.Tolerance('User', 'sign', 8)
    }

    await next()
  }

}
