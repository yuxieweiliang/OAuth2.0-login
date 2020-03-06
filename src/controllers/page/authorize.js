import React from 'react'
import querystring from 'querystring'
import { renderToString } from 'react-dom/server'
import oAuth2 from '../../services/middleware/OAuth2.0' // 认证
import { constructor, get } from '../../services/controller'
import AllowComponent from '../../../client/page/oauth2.0/Allow/Allow'
import LoginComponent from '../../../client/page/oauth2.0/Login/Login'

/**
 * 同意认证:
 * GET:
 * /oauth2.0/authorize ? client_id = 1 & response_type = token & redirect_uri=http://localhost:3000
 *
 * POST:
 *  /oauth2.0/authorize ? client_id = 1 & redirect_uri = http://localhost:3000 & response_type=token & x_user_id = MCS2L4YEoNfLzX-2esG7nQDicEs%3DT8yv9RVTcd4e809b0c0e16035b0e2e2b9cca6c88
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
export default class OAuth2 {
  @get('/login')
  async loginPage(ctx, next) {
    const queries = ctx.queries;
    let str = renderToString(<LoginComponent next_url={queries.next} />);

    await ctx.render('index', {
      name: 'oauth2.0.login',
      initialState: queries.next || '/',
      root: str,
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

    // console.log(ctx.req);
    if(!user_id) {
      ctx.status = 300;
      await ctx.redirect('/oauth2.0/login?next=' + encodeURIComponent(ctx.req.url));
      return;
    }
    redirect_uri += '?' + querystring.stringify({ x_user_id: oAuth2.serializer.stringify(user_id) });
    /**
     * 用户已登录
     * 显示 允许 界面
     */
    ctx.status = 200;
    await ctx.render('allow', {
      name: 'oauth2.0.allow',
      initialState: redirect_uri,
      root: str,
    });
  }
}

