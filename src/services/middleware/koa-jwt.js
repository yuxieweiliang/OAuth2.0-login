import jwt from 'koa-jwt';
import { secret } from '../../../config/secret';

export default function koaJwt(app) {
  app.use(jwt({ secret }).unless(function (ctx) {
    const paths = ['/user/sign', '/user/', '/login/', '/login'];

    console.log(ctx.path);
    /*if (ctx.method.toLowerCase() === 'post' && paths.includes(ctx.path)) {
    return true
  }*/
    if (paths.includes(ctx.path)) {
      return true
    }

    return /^\/(asset|project|icon.ico)\/!*!/.test(ctx.path)
  }));
}
