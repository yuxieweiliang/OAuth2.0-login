/**
 * index.js
 * OAuth 2.0 provider
 *
 * @author Amir Malik
 */

/**
 * {
    "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVC……",
    "expires_in": 1296000,
    "token_type": "Bearer",
    "refresh_token": "84a09b5ae3a248a6562b66d8b1758af5e……"
}
 * @type {*}
 */

var EventEmitter = require('events').EventEmitter,
  querystring = require('querystring'),
  serializer = require('serializer'); // 序列化库
import unless from './koa-unless'

let _extend = function(dst,src) {

  var srcs = [];
  if ( typeof(src) == 'object' ) {
    srcs.push(src);
  } else if ( typeof(src) == 'array' ) {
    for (var i = src.length - 1; i >= 0; i--) {
      srcs.push(this._extend({},src[i]))
    };
  } else {
    throw new Error("Invalid argument")
  }

  for (var i = srcs.length - 1; i >= 0; i--) {
    for (var key in srcs[i]) {
      dst[key] = srcs[i][key];
    }
  };

  return dst;
};
/**
 * 将token转换为名字与密码字符串
 * @param authorization
 * @returns {*}
 */
function parse_authorization(authorization) {
  if(!authorization)
    return null;

  var parts = authorization.split(' ');

  if(parts.length !== 2 || (parts[0] !== 'Basic' && parts[0] !== 'Bearer'))
    return null;

  var creds = new Buffer(parts[1], 'base64').toString(),
    i = creds.indexOf(':');

  if(i === -1) {
    return null;
  }

  var username = creds.slice(0, i),
  password = creds.slice(i + 1);

  return [username, password];
}

/**
 * OAuth2 构造函数
 * 需要传入 { crypt_key, sign_key }
 * @param options
 * @constructor
 */
function OAuth2Provider(options) {
  if(arguments.length !== 1) {
    console.warn('OAuth2Provider(crypt_key, sign_key) constructor has been deprecated, yo.');

    options = {
      crypt_key: arguments[0],
      sign_key: arguments[1],
    };
  }

  options['authorize_uri'] = options['authorize_uri'] || '/oauth/authorize';
  options['access_token_uri'] = options['access_token_uri'] || '/oauth/access_token';

  this.options = options;
  console.log('------------------------------------------------------------');
  console.log('------------------------------------------------------------');
  console.log(this.options.crypt_key, this.options.sign_key);
  // 序列化 token
  this.serializer = serializer.createSecureSerializer(this.options.crypt_key, this.options.sign_key);
}

OAuth2Provider.prototype = new EventEmitter();
OAuth2Provider.prototype.parse_authorization = parse_authorization;

/**
 * 生成访问令牌
 * @param user_id
 * @param client_id
 * @param extra_data
 * @param token_options
 */
OAuth2Provider.prototype.generateAccessToken = function(user_id, client_id, extra_data, token_options) {
  token_options = token_options || {};
  var out = _extend(token_options, {
    access_token: this.serializer.stringify([user_id, client_id, +new Date, extra_data]),
    refresh_token: null,
  });
  return out;
};

/**
 * 登录中间件
 * 用来保存用户的 access_token
 * @returns {Function}
 */
OAuth2Provider.prototype.login = function() {
  var self = this;


  async function _login(ctx, next) {
    const query = ctx.request.query;
    const authorization = ctx.req.headers.authorization;
    let data, atok, user_id, client_id, grant_date, extra_data;

    /**
     * 获取 access_token || authorization
     * 1、 www.xxx.com ? access_token = xxxxxxxxx
     * 2、 headers: {authorization: 'Bearer xxxxxxxxx'}
     */
    if(query['access_token']) {
      atok = query['access_token'];
    } else if((authorization || '').indexOf('Bearer ') === 0) {
      atok = authorization.replace('Bearer', '').trim();
    } else {
      console.log('----------');
      return await next();
    }
    /**
     * 如果有token 则为token 重新赋值过期时间
     */
    try {
      data = self.serializer.parse(atok);
      user_id = data[0];
      client_id = data[1];
      grant_date = new Date(data[2]);
      extra_data = data[3];
    } catch(e) {
      ctx.status = 400;
      ctx.body = e.message;
      return;
    }

    console.log('atok', data);
    // 发送给access_token
    self.emit('access_token', ctx, { user_id, client_id, extra_data, grant_date }, next);

    await next();
    console.log('atok -> access_token');

  };

  _login.unless = unless;
  return _login
};



OAuth2Provider.prototype.oauth = function() {
  const self = this;

  async function _oauth(ctx, next) {
    const { req, res, request } = ctx;
    const { authorize_uri, access_token_uri } = self.options;
    let { client_id, redirect_uri } = request.query;


    const uri = ~req.url.indexOf('?') ? req.url.substr(0, req.url.indexOf('?')) : req.url;

    console.log('uri', uri);

    /**
     * 检查url中是否包含
     * client_id
     * redirect_uri
     * *******************************************
     * self.options:
     * {
     *  crypt_key: 'encryption secret',
     *  sign_key: 'signing secret',
     *  authorize_uri: '/oauth/authorize',
     *  access_token_uri: '/oauth/access_token'
     * }
     */

    /**
     * 获取授权页面，有同意以及拒绝按钮
     */
    if(req.method === 'GET' && authorize_uri === uri) {

      console.log(!client_id || !redirect_uri);
      if(!client_id || !redirect_uri) {
        ctx.type = 'text/html';
        ctx.status = 400;
        return ctx.body = ('client_id and redirect_uri required');
      }

      // authorization form will be POSTed to same URL, so we'll have all params
      var authorize_url = req.url;

      // 执行login
      self.emit('enforce_login', ctx, authorize_url, function(user_id) {

        // store user_id in an HMAC-protected encrypted query param
        authorize_url += '&' + querystring.stringify({x_user_id: self.serializer.stringify(user_id)});

        // user is logged in, render approval page
        self.emit('authorize_form', ctx, client_id, authorize_url);
      });

    }
    /**
     * 是否同意授权
     *
     */
    else if(req.method === 'POST' && self.options.authorize_uri === uri) {
        let response_type = (request.query.response_type || request.body.response_type) || 'code',
        state = (request.query.state || request.body.state),
        x_user_id = (request.query.x_user_id || request.body.x_user_id);

      client_id = (client_id || request.body.client_id);
      redirect_uri = (redirect_uri || request.body.redirect_uri);

      let url = redirect_uri;

      switch(response_type) {
        case 'code': url += '?'; break;
        case 'token': url += '#'; break;
        default:
          res.writeHead(400);
          return res.end('invalid response_type requested');
      }

      if('allow' in request.body) {
        if('token' === response_type) {
          var user_id;

          try {
            user_id = self.serializer.parse(x_user_id);
          } catch(e) {
            console.error('allow/token error', e.stack);

            ctx.status = 500;
            ctx.body = e.message;
            return;
          }

          self.emit('create_access_token', user_id, client_id, function(extra_data,token_options) {
            var atok = self.generateAccessToken(user_id, client_id, extra_data, token_options);

            if(self.listeners('save_access_token').length > 0)
              self.emit('save_access_token', user_id, client_id, atok);

            url += querystring.stringify(atok);

            ctx.status = 303;
            ctx.body = {url};
          });
        } else {
          let code = serializer.randomString(128);

          self.emit('save_grant', ctx, client_id, code, function() {
            let extras = {
              code: code,
            };

            // pass back anti-CSRF opaque value
            if(state)
              extras['state'] = state;

            url += querystring.stringify(extras);

            ctx.status = 303;
            ctx.body = {url};
          });
        }
      } else {
        url += querystring.stringify({error: 'access_denied'});

        ctx.status = 303;
        ctx.body = {url};
      }

    } else if(req.method === 'POST' && self.options.access_token_uri === uri) {
      /**
       * 始用 账号 & 密码
       * 获取 access_token
       */
      let code = request.body.code;

      client_id = request.body.client_id;
      let client_secret = request.body.client_secret; // 客户端密钥
      redirect_uri = request.body.redirect_uri;

      if(!client_id || !client_secret) {
        let authorization = parse_authorization(req.headers.authorization);

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
       */
      if('password' === request.body.grant_type) {

        if(self.listeners('client_auth').length === 0) {
          // 不支持客户端身份验证
          ctx.status = 401;
          ctx.body = 'client authentication not supported';
          return;
        }

        self.emit('client_auth', client_id, client_secret, req.body.username, req.body.password, function(err, user_id) {
          if(err) {
            ctx.status = 401;
            ctx.body = err.message;
            return;
          }

          ctx.status = 200;
          ctx.set('Content-Type', 'application/json; charset=utf-8');

          self._createAccessToken(user_id, client_id, function(atok) {
            ctx.body = JSON.stringify(atok);
          });
        });
      } else {

        /**
         * 查看授权
         */
        self.emit('lookup_grant', client_id, client_secret, code, function(err, user_id) {
          if(err) {
            ctx.status = 400;
            ctx.body = err.message;
            return;
          }

          ctx.status = 200;
          ctx.set('Content-Type', 'application/json; charset=utf-8');

          self._createAccessToken(user_id, client_id, function(atok) {
            self.emit('remove_grant', user_id, client_id, code);
            ctx.body = JSON.stringify(atok);
          });
        });
      }

    } else {

      console.log('auth next');
      return await next();
    }
  };
  _oauth.unless = unless;
  return _oauth;
};

OAuth2Provider.prototype._createAccessToken = function(user_id, client_id, cb) {
  let self = this;

  this.emit('create_access_token', user_id, client_id, function(extra_data, token_options) {
    let atok = self.generateAccessToken(user_id, client_id, extra_data, token_options);

    if(self.listeners('save_access_token').length > 0) {
      self.emit('save_access_token', user_id, client_id, atok);
    }


    return cb(atok);
  });
};

exports.OAuth2Provider = OAuth2Provider;
