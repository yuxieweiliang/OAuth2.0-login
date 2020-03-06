import Sequelize from 'sequelize';
import md5 from 'md5';
import jwt from 'jsonwebtoken';
import React from 'react'
import { renderToString } from 'react-dom/server'
import orm from '../../database'
import tables from '../../database/tables'
import { constructor, get, post, put, del } from '../../services/controller';
import { secret } from '../../../config/secret';
import { isInteger, isString, getPagerOptions, getPositiveInteger, createDatabase } from '../../services/utils';
import _ from 'lodash';

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
    await ctx.render('index', {
      name: 'allow',
      initialState: queries.next,
      root: str,
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
    await ctx.render('index', {
      root: str,
      script: 'login.build.js',
    });
    // ctx.body = str;
    // console.log(ctx.body);
    // await next()
  }

}
