import Sequelize from 'sequelize';
import md5 from 'md5';
import jwt from 'jsonwebtoken';
import React from 'react';
import { renderToString } from 'react-dom/server';
import orm from '../services/database';
import { constructor, get, post, put, del } from '../services/controller';
import { secret } from '../../config/secret';
import { isInteger, isString, getPagerOptions, getPositiveInteger, createDatabase } from '../services/utils';
import tables from '../services/tables';
import relationship from '../services/relationship';
import _ from 'lodash';
import LoginComponent from '../../client/components/Login';

const database = orm.configures.default;

@constructor('login')
export default class Login {
  /**
   * get users
   */
  @get('/')
  async loginPage(ctx, next) {
    const queries = ctx.queries;
    const pool = await createDatabase();

    let str = renderToString(<LoginComponent next_url={queries.next} />);
    console.log('--------------------2', queries.next);
    await ctx.render('index', {
      initialState: queries.next || '/',
      root: str,
      script: 'login.build.js',
    });
    // ctx.body = str;
    // console.log(ctx.body);
    // await next()
  }

  @post('/')
  async login(ctx, next) {
      const queries = ctx.queries;
      const pool = await createDatabase();
      const rBody = ctx.request.body; // { account, pwd }
      const body = isString(rBody) ? JSON.parse(ctx.request.body) : rBody;
      // ctx.session.user_id = queries.username;
      console.log('group: ', body);
      if (isString(body.account)) {
        const UserModel = await tables.userModel(pool);

        const user = await UserModel.findOne({ where: { account: body.account } });

        if (user) {
          if (md5(body.pwd) === user.pwd) {

            ctx.session.user_id = user.id;
            ctx.status = 303;
            ctx.methods = 'GET';
            await ctx.redirect(queries.next || '/');
          }
        } else {
          ctx.body = new ctx.Tolerance('User', 'sign', 9)
        }
      } else {
        ctx.body = new ctx.Tolerance('User', 'sign', 8)
      }

      // console.log('----------------------2', queries);
      // console.log('----------------------2', ctx.sessions);
      // console.log('----------------------2', queries.next);

      await next()
    }

}
