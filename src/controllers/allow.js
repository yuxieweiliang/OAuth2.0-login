import Sequelize from 'sequelize';
import md5 from 'md5';
import jwt from 'jsonwebtoken';
import React from 'react'
import { renderToString } from 'react-dom/server'
import orm from '../services/database';
import { constructor, get, post, put, del } from '../services/controller';
import { secret } from '../../config/secret';
import { isInteger, isString, getPagerOptions, getPositiveInteger, createDatabase } from '../services/utils';
import tables from '../services/tables';
import _ from 'lodash';
import LoginComponent from '../../client/components/Login'

const database = orm.configures.default;

@constructor('allow')
export default class Login {
  /**
   * get users
   */
  @get('/')
  async login(ctx, next) {
    const queries = ctx.queries;
    const pool = await createDatabase();
    let str = renderToString(<LoginComponent next_url={queries.next} />);
    console.log('--------------------2', queries.next);
    ctx.session.user = {a: 'aaaaaaaaaaa'};
    await ctx.render('index', {
      initialState: queries.next,
      root: str,
      script: 'login.build.js',
    });
    // ctx.body = str;
    // console.log(ctx.body);
    // await next()
  }

  @post('/')
  async postUsers(ctx, next) {
    const queries = ctx.queries;
    const pool = await createDatabase();
    let str = renderToString(<LoginComponent />);
    console.log('----------------------2', ctx.sessions);
    // ctx.sessions.set('fffffffffffffff');
    await ctx.render('index', {
      root: str,
      script: 'login.build.js',
    });
    // ctx.body = str;
    // console.log(ctx.body);
    // await next()
  }

}
