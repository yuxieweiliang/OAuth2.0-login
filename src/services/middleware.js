import pa from 'path';
import logger from 'koa-logger';
import koaStatic from 'koa-static';
import compress from 'koa-compress';
import cacheControl from 'koa-cache-control';
import helmet from 'koa-helmet';
import views from 'koa-views';

import config, { location } from "../../config";
import returns from './returns';
import httpLogger from './http-logger';
import mixinUser from './mixinUser';

import setRouter from './middleware/router';
import tolerance from './middleware/tolerance';
import koaWebpack from './middleware/koa-webpack';
import bodyParser from './middleware/koa-body';
import cors from './middleware/cors';
import jwt from './middleware/koa-jwt';
import redis from './redis';


export default function (app) {
  /**
   * 模板
   */
  app.use(views(pa.resolve(__dirname, '../../views'), { map: { html: 'ejs' } }));

  /**
   * 必须包含 验证字段
   */
  app.use(cors({
    headers: ['authorization', 'content-type'],
    origin: true,
    credentials: true // 证书
  }));

  /**
   * 过滤网络攻击
   * XSS filter
   */
  app.use(helmet.xssFilter({
    setOnOldIE: true
  }));

  /**
   * 静态资源
   * static source
   */
  app.use(koaStatic(location.public));
  app.use(koaStatic(location.static));
  app.use(koaStatic(location.dist));
  app.use(koaStatic(location.node_modules));

  console.log(location.public);

  /**
   * 处理 body
   * process message.body
   */
  bodyParser(app);

  /**
   * 添加 redis 缓存
   */
  redis(app);
  /**
   * 服务端渲染
   * webpack
   */
  koaWebpack(app);

  /**
   * jwt 加密
   */
 /* jwt(app)*/

  /**
   * gzip 压缩
   */
  app.use(compress());

  /**
   * 混入用户
   * mixinUser
   */
  app.use(mixinUser());

  /**
   * 缓存
   * api cache
   */
  app.use(cacheControl({
    public: 'public'
  }));

  /**
   * 错误处理
   * API Error handler
   */
  app.use(tolerance);

  /**
   * 打印日志
   * develope logger
   */
  if (process.env.NODE_ENV === 'development') {
    app.use(logger())
  } else {
    app.use(httpLogger(config.logger))
  }

  /**
   * 添加路由
   */
  setRouter(app);

  /**
   * 标准化返回数据
   * Response standardized
   */
  app.use(returns)
}

