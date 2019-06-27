import jwt from 'jsonwebtoken'
import { secret } from '../config/secret'
import oAuth2 from '../services/middleware/OAuth2.0';// 认证

export default function mixinUser() {
  return async function mixin(ctx, next) {
    if(ctx.headers.authorization) {
      const token = ctx.headers.authorization.replace('Bearer', '').trim();

      /*jwt.verify(ctx.headers.authorization, secret, function(a, b) { console.log(a, b) });*/

      // var decoded = jwt.verify(token, secret);
      //       // console.log(decoded);
      // console.log(jwt.decode(token));
      ctx.oAuth = oAuth2.serializer.parse(token);
      console.log(token);
      console.log(ctx.oAuth);
    }
    await next();
  }
};
