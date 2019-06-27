import serializer from 'serializer';
import querystring from 'querystring';
import oAuth2 from '../services/middleware/OAuth2.0';// 认证
import Sequelize from 'sequelize';
import md5 from 'md5';
import jwt from 'jsonwebtoken';
import React from 'react'
import { renderToString } from 'react-dom/server'
import orm from '../services/database';
import { constructor, get, post, put, del } from '../services/controller';
import { secret } from '../config/secret';
import { isInteger, isString, getPagerOptions, getPositiveInteger, createDatabase } from '../services/utils';
import tables from '../services/tables';
import _ from 'lodash';
import AllowComponent from '../../client/components/Allow';
import AuthorizeLoginComponent from '../../client/components/AuthorizeLogin';

const database = orm.configures.default;


const myGrants = {};

/**
 * 同意认证:
 * GET:
 * /oauth/authorize ? client_id = 1 & response_type = token & redirect_uri=http://localhost:3000
 *
 * POST:
 *  /oauth/authorize ? client_id = 1 & redirect_uri = http://localhost:3000 & response_type=token & x_user_id = MCS2L4YEoNfLzX-2esG7nQDicEs%3DT8yv9RVTcd4e809b0c0e16035b0e2e2b9cca6c88
 *  {
 *    client_id: 'xxxxxxxxx',
 *    x_user_id: 'xxxxxxxxx',
 *    response_type: 'token',
 *    redirect_uri: 'xxxxxx',
 *  }
 *  {
 *    client_id: 'xxxxxxxx',
 *    x_user_id: 'xxxxxxxx',
 *    response_type: 'code',
 *    state: 'xxxxxxxxxxxx' || null,
 *    redirect_uri: 'xxxxx',
 *  }
 */
@constructor('oauth2.0')
export default class Login {
  @get('/login')
  async loginPage(ctx, next) {
    const queries = ctx.queries;
    let str = renderToString(<AuthorizeLoginComponent next_url={queries.next} />);

    await ctx.render('index', {
      initialState: queries.next || '/',
      root: str,
      script: 'authorizeLogin.build.js',
    });

    await next();
  }
  /**
   * 请求验证
   * 如果已经登陆，则显示同意与拒绝
   * 如果没有，则跳转到登陆页面
   * http://localhost:8063/oauth2.0/authorize?client_id=1&redirect_uri=http://myapp.foo
   * { 必填 } client_id
   * { 必填 } redirect_uri
   */
  @get('/authorize')
  async getAuthorize(ctx, next) {
    const queries = ctx.queries;
    const user_id = ctx.session.user_id;
    console.log('user_id ', ctx.session);
    // ctx.session = null;
    // ctx.session.user_id = null;
    let str = renderToString(<AllowComponent next_url={queries.next} />);

    let client_id       = queries.client_id,
      redirect_uri    = queries.redirect_uri;

    if(!client_id || !redirect_uri) {
      ctx.status = 400;
      ctx.body = ('client_id and redirect_uri required');
    }

    // authorization form will be POSTed to same URL, so we'll have all params
    let authorize_url = ctx.req.url;

    if(!user_id) {
      await ctx.redirect('/oauth2.0/login?next=' + encodeURIComponent(authorize_url));
      return;
    }
    authorize_url += '&' + querystring.stringify({ x_user_id: oAuth2.serializer.stringify(user_id) });
    /**
     * 用户已登录
     * 显示 允许 界面
     */
    await ctx.render('index', {
      initialState: authorize_url,
      root: str,
      script: '/allow.build.js',
    });
  }



  /**
   * 如果添加了允许字段，则否认。
   * allow：允许
   * denied：否认
   */
  @post('/authorize')
  async postAuthorize(ctx, next) {
    const queries = ctx.queries;
    // console.log(ctx.request);
    console.log(queries);

    let response_type = queries.response_type || 'code',
      state           = queries.state,
      x_user_id       = queries.x_user_id,
      client_id       = queries.client_id,
      redirect_uri    = queries.redirect_uri;

    /**
     * 验证是否包含 type
     */
    if(!response_type) {
      ctx.status = 400;
      ctx.body = ('invalid response_type requested');
      return;
    }

    redirect_uri += (response_type === 'code' ? '?' : '#');

    if(!('allow' in queries)) {
      redirect_uri += querystring.stringify({error: 'access_denied'});
      ctx.status = 303;
      await ctx.redirect(redirect_uri);
      return;
    }


    if('token' === response_type) {
      let user_id;
      if(!x_user_id) {
        // console.error('allow/token error');
        ctx.status = 500;
        ctx.body = ('invalid x_user_id requested');
        return;
      }

      user_id = oAuth2.serializer.parse(x_user_id);

      oAuth2.emit('create_access_token', user_id, client_id, function(extra_data, token_options) {
        const atok = oAuth2.generateAccessToken(user_id, client_id, extra_data, token_options);

        if(oAuth2.listeners('save_access_token').length > 0) {
          oAuth2.emit('save_access_token', user_id, client_id, atok);
        }

        redirect_uri += querystring.stringify(atok);

        ctx.status = 303;
        ctx.redirect(redirect_uri);

      });
    } else {

      /**
       * code 模式
       */
      let code = serializer.randomString(128);
      let user_id = ctx.session.user_id;

      if(!(user_id in myGrants)) {
        myGrants[user_id] = {};
      }

      myGrants[user_id][client_id] = code;

      let extras = {
        code: code,
      };

      // pass back anti-CSRF opaque value
      if(state) {
        extras['state'] = state;
      }

      redirect_uri += querystring.stringify(extras);

      ctx.status = 303;
      await ctx.redirect(redirect_uri);
    }
    await next()
  }

  /**
   * 如果添加了允许字段，则否认。
   */
  @get('/access_token')
  async getAccessToken(ctx, next) {
    const queries = ctx.queries;
    const pool = await createDatabase();
    let code              = queries.code || 'code',
      client_secret       = queries.client_secret, // 客户端密钥
      client_id           = queries.client_id,
      grant_type          = queries.grant_type;

    if(!client_id || !client_secret) {
      let authorization = oAuth2.parse_authorization(ctx.req.headers.authorization);

      if(!authorization) {
        ctx.status = 400;
        ctx.body = 'client_id and client_secret required';
        return;
      }

      client_id = authorization[0];
      client_secret = authorization[1];
    }

    /**
     * 如果是密码
     * 始用 账号 & 密码
     * 获取 access_token
     * client_id
     * username
     * password
     * client_secret
     */
    if('password' === grant_type) {
      const clientModel = await tables.clientModel(pool);
      const client = await clientModel.findById(client_id);
      const userModel = await tables.userModel(pool);
      const user = await userModel.findOne({where: {account: queries.username}});

      if(!user || md5(queries.password) !== user.pwd) {
        ctx.status = 401;
        ctx.body = 'username or password is wrong';
        return;
      }

      if(client_secret !== client.secret) {
        ctx.status = 401;
        ctx.body = new Error('client authentication denied');
        return;
      }

      /**
       * 验证确实存在
       */
      oAuth2._createAccessToken(user.id, client_id, function(atok) {
        ctx.status = 200;
        ctx.set('Content-Type', 'application/json; charset=utf-8');
        ctx.body = JSON.stringify(atok);
      });

    } else {
      /**
       * 查看授权
       */
      const clientModel = await tables.clientModel(pool);
      const client = await clientModel.findById(client_id);
      let user_id;

      if(!client || (client.secret !== client_secret)){
        ctx.status = 500;
        ctx.body = new Error('no such grant found');
        return;
      }

      for(let id in myGrants) {
        let clients = myGrants[id];

        if(clients[client_id] && clients[client_id] === code) {
          user_id = id;
        }
      }

      let clients = myGrants[user_id];

      if(!clients || !user_id) {
        ctx.status = 500;
        ctx.body = new Error('no such grant found');
        return;
      }

      oAuth2._createAccessToken(user_id, client_id, function(atok) {
        delete myGrants[user_id][client_id];
        ctx.status = 200;
        ctx.set('Content-Type', 'application/json; charset=utf-8');
        ctx.body = JSON.stringify(atok);
      });
    }
    await next()
  }
}

