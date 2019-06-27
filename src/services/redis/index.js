const {promisify} = require('util');
const redis = require('redis');
const session = require('koa-session');
const RedisStore = require('./redis-store');
// const redisStore = require('koa-redis');

const options = {
  client: redis,
  db: 2
};

const store = new RedisStore(options);
const config = {
  /* other options */
  store: store,
  key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 864000000,
  autoCommit: true, /** (boolean) automatically commit headers (default true) */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: false, /** (boolean) renew se */
};

const key = 'cookies';

export default function(app) {
  const client = redis.createClient();
  const getAsync = promisify(client.get).bind(client);

  app.keys = ['some secret hurr'];
  client.on("error", function (err) {
    console.log("Error " + err);
  });

  app.use(session(config, app));


  app.use(async function(ctx, next) {
    let userId = ctx.cookies.get(key);

    // 如果缓存中可以找到， 则登陆成功
    if (userId) {
      /**
       * 设置用户 ID === true
       * 则证明登陆成功
       * @param userId
       * @returns {Promise.<void>}
       */
      ctx.$userInfo = await getAsync(userId).then(res => JSON.parse(res));
      // console.log('----------------', ctx.$userInfo);
    }

    app.context.sessions = ctx.session;
    /* ctx.cookies.set(key, userId, { maxAge: 60 * 60 * 24 * 7 });*/

    await next();
  });
};


