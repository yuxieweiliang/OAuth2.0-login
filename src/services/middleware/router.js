import path, { resolve } from 'path'
import Router from 'koa-router'
import oAuth2 from './OAuth2.0';
import pa from "path";
import glob from 'glob';

import * as config from "../../../config";

import {prefixs, routers} from "../routers";
import {getAbsPath} from "../utils";

// Router
const router = new Router();
const apis = config.location.apis;
const pages = config.location.pages;
const pattern = './*.js';
const unless = { ext: ['css'], path: [/\/register/, /\/login/, /\/oauth2.0/, /\//,] };

export default function setRouter(app) {
  glob.sync(pa.join(apis, pattern)).forEach(require);
  glob.sync(pa.join(pages, pattern)).forEach(require);

  for (let [options, controllers] of routers) {
    let located = options.target[prefixs];
    if (located) {
      located = getAbsPath(located)
    }

    let rule;
    if (typeof options.path === 'object') {
      const str = options.path.toString();
      const eq = str.lastIndexOf('/');
      const flag = str.substr(eq).substr(1) || 'i';
      const regex = located + str.substr(0, eq);

      rule = new RegExp(regex, flag)
    } else {
      rule = located + options.path
    }

    console.log(options.method, rule)
    router[options.method](rule, ...controllers)
  }

  app.use(oAuth2.oauth().unless(unless));
  // app.use(oAuth2.login().unless(unless));

  app.use(router.routes());
  app.use(router.allowedMethods());

}
