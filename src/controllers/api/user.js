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


@constructor('api/user')
export default class User {

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
        'gander',
        'mobile',
        'email',
        'avatar',
        'intro',
        'role',
        'group',
        'father',
        'status'
      ]
    };

    if (isInteger(queries.father)) {
      options.where.father = queries.father
    }

    ctx.body = await model.findOne(options);
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
        const userPassword = queries.password || '123456'; // default password

        ctx.body = await model.create({
          account: queries.account,
          password: md5(userPassword),
          name: queries.name,
          gander: queries.gander,
          mobile: queries.mobile,
          email: queries.email,
          avatar: queries.avatar,
          intro: queries.intro,
          grade: queries.grade,
          role: 1,
          group: 5,
          father: 0,
          status: 1
        });

        if (ctx.body) {
          ctx.body.password = userPassword
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
      if (Array.isArray(values.password)) {
        const theUser = await model.findByPk(id);
        const oldPassword = md5(values.password[0]);

        if (oldPassword === theUser.password) {
          values.password = md5(values.password[1])
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
      where: { id },
      force: true,
      fields: ['name', 'password', 'sex', 'mobile', 'email', 'avatar', 'intro', 'role', 'status']
    }
  }

  /**
   * Token issued
   * user login
   * @param {string} account
   * @param {string} password
   */
  @post('/sign')
  async sign(ctx, next) {
    const pool = await orm.use(database)
    const rBody = ctx.request.body; // { account, password }
    const { account, password } = isString(rBody) ? JSON.parse(ctx.request.body) : rBody;

    if (isString(account)) {
      const UserModel = await tables.userModel(pool)

      let user = await UserModel.findOne({where: { account }})
      if (user) {
        user = user.toJSON()
        if (md5(password) === user.password) {
          delete user.password
          const token = jwt.sign({
            id: user.id,
            time: Date.now()
          }, secret, { expiresIn: '3650h' })

          ctx.body =  {
            ...user,
            token
          }
        } else {
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
