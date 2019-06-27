/**
 * index.js
 * OAuth 2.0 provider
 *
 * @author Amir Malik
 "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVC……",
 "expires_in": 1296000,
 "token_type": "Bearer",
 "refresh_token": "84a09b5ae3a248a6562b66d8b1758af5e……"
 */

import { OAuth2Provider } from './OAuth2Provider'

const oAuth2 = new OAuth2Provider({
  crypt_key: 'encryption secret', // crypt_key：密码密钥； encryption secret：加密机密
  sign_key: 'signing secret' // sign_key：签名键；signing secret：签署秘密
});

// hardcoded list of <client id, client secret> tuples
// 客户端ID、客户端机密>元组的硬编码列表
/**
 * 这里存储的是客户端的密钥
 * @type {{}}
 */
var myClients = {
  // 1: '1secret'
};
// 临时授权存储
const myGrants = {};
/**
 * enforce: 执行
 * 在显示授权页之前，请确保用户已登录。
 * 验证保存再 session 上的数据是否存在。
 * 如果存在，证明已经登陆了
 * 否则跳转到登陆页面
 */
oAuth2.on('enforce_login', async function(ctx, authorize_url, next) {
  console.log('enforce_login');
  if(ctx.session.user_id) {
    next(ctx.session.user_id);
  } else {
    ctx.status = 303;
    ctx.redirect('/login?next=' + encodeURIComponent(authorize_url));
  }
});

/**
 * 请求开通权限：
 * 授权 | 拒绝。
 */
oAuth2.on('authorize_form', function(ctx, client_id, authorize_url) {
  console.log('authorize_form');

  ctx.redirect('/login?next=' + encodeURIComponent(authorize_url));
  /*ctx.status = 200;
  ctx.set('Content-Type', 'application/json; charset=utf-8');
  ctx.body = authorize_url;*/
  // ctx.redirect('/system/authorize');
});

/**
 * 点击同意 & 生成授权码
 * 为当前用户保存生成的授权代码
 */
oAuth2.on('save_grant', function(ctx, client_id, code, next) {
  console.log('save_grant');
  if(!(client_id in myGrants))
    myGrants[client_id] = {};

  myGrants[client_id] = code;
  next();
});

/**
 * 当访问令牌已被发送时移除授权
 */
oAuth2.on('remove_grant', function(user_id, client_id, code) {
  console.log('remove_grant');
  if(myGrants[user_id] && myGrants[user_id][client_id])
    delete myGrants[user_id][client_id];
});

/**
 * 找到授权用户
 */
oAuth2.on('lookup_grant', function(client_id, client_secret, code, next) {
  console.log('lookup_grant');
  // verify that client id/secret pair are valid
  if(client_id in myClients && myClients[client_id] === client_secret) {
    for(var user_id in myGrants) {
      var clients = myGrants[user_id];

      if(clients[client_id] && clients[client_id] === code)
        return next(null, user_id);
    }
  }

  next(new Error('no such grant found'));
});



/**
 * 再登陆的时候，创建令牌
 * 在生成的访问令牌中嵌入不透明值
 */
oAuth2.on('create_access_token', async function(user_id, client_id, next) {
  console.log('create_access_token');
  var extra_data = 'blah'; // 附加数据，可以为 null
  /*var access_token = oAuth2.serializer.stringify([user_id, client_id, +new Date, extra_data]);
  var refresh_token = oAuth2.serializer.stringify([user_id, +new Date, extra_data]);
  var oauth_params = {
    token_type: 'Bearer',
    refresh_token,
    access_token
  };*/

  await next(extra_data);
});

/**
 * 再登陆的时候，创建令牌
 * 在生成的访问令牌中嵌入不透明值
 */
oAuth2.on('create_token', function(user_id, user_id_name, cb) {
  console.log('create_token');
  let extra_data = 'blah'; // 附加数据，可以为 null
  let access_token = oAuth2.serializer.stringify([user_id, user_id_name, +new Date, extra_data]);
  let refresh_token = oAuth2.serializer.stringify([user_id, +new Date]);

  cb({
    token_type: 'Bearer',
    refresh_token,
    access_token
  });
});

// (optional) do something with the generated access token
oAuth2.on('save_access_token', function(user_id, client_id, access_token) {
  // console.log('save_access_token', client_id, client_id, access_token)
  console.log('saving access token %s for user_id=%s client_id=%s', JSON.stringify(access_token), user_id, client_id);
});



/**
 * 始用 oAuth2.login() 中会再每次请求时获取到 access_token
 * 然后调用此方法，处理
 * 在URL查询字符串参数或HTTP报头中接收访问令牌。
 */
oAuth2.on('access_token', async function(ctx, token) {
  var TOKEN_TTL = 10 * 60 * 1000; // 10 minutes
  let isOld = token.grant_date.getTime() + TOKEN_TTL > Date.now();
  console.log('access_token');

  if(!isOld) {
    ctx.session.user_id = token.user_id;
    ctx.session.data = token.extra_data;
  } else {
    console.warn('access token for user_id %s has expired', token.user_id);
  }
  console.log('access_token, next');
});
// (optional) client authentication (xAuth) for trusted clients
oAuth2.on('client_auth', function(client_id, client_secret, username, password, next) {
  if(client_id == '1' && username == 'guest') {
    var user_id = '1337';

    return next(null, user_id);
  }

  return next(new Error('client authentication denied'));
});

export default oAuth2
/*export default function(app) {

  app.use(oAuth2.oauth());
  app.use(oAuth2.login());

  app.use(auth().unless({
    //数组中的路径不需要通过jwt验证
    // path: [/\/system\/register/, /\/login/, /\/system\/token/,]
  }));
  app.use(async function(ctx, next) {


    console.log(':::::::::::: OAuth2Provider ::::::::::::');
    await next()
  });
}*/
