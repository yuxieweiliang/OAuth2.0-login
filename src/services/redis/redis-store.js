const debug = require('debug')('koa:session-store');
const redis = require("redis");
const bluebird = require("bluebird");
const wrap = require('co-wrap-all');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

/**
 * RedisStore for koa-session
 *
 * @param {object} options the options pass to node_redis
 * @returns RedisStore instance
 */
function RedisStore(options) {
  if (!(this instanceof RedisStore)) {
    return new RedisStore(options);
  }
  this.client = redis.createClient(options);
  this.client.on('connect', function () {
    debug('connected to redis');
  });
  this.client.on('ready', function () {
    debug('redis ready');
  });
  this.client.on('end', function () {
    debug('redis ended');
  });
  this.client.on('error', function () {
    debug('redis error');
  });
  this.client.on('reconnecting', function () {
    debug('redis reconnecting');
  });
  this.client.on('warning', function () {
    debug('redis warning');
  });
}
RedisStore.prototype.get = async function (key) {
  console.log('Redis GET', key);
  let json = await this.client.getAsync(key);
  debug(`GET ${key} -> ${json}`);
  return JSON.parse(json);
};
RedisStore.prototype.set = async function (key, sess, ttl) {
  let json = JSON.stringify(sess);
  console.log('RedisStore SET', json);
  debug(`SET ${key} -> ${json}`);
  if (typeof ttl === 'number') {
    ttl = Math.ceil(ttl / 1000);
  }
  if (ttl) {
    await this.client.setexAsync(key, ttl, json);
  } else {
    await this.client.setAsync(key, json);
  }
};
RedisStore.prototype.destroy = async function (key) {
  debug(`DELETE ${key}`);
  await this.client.delAsync(key);
};
RedisStore.prototype.quit = async function() {
  debug(`QUIT redis`);
  await this.client.quit();
};
wrap(RedisStore.prototype);

RedisStore.prototype.end = RedisStore.prototype.quit;              // End connection SAFELY. The real end() command should never be used, as it cuts off to queue.
module.exports = RedisStore;
