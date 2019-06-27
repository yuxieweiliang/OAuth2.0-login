import _ from 'lodash';
import queryString from 'query-string';


module.exports = {
  'POST /api/user': async ctx => {
    let data = ctx.request.body;
    let params = ctx.request.query || ctx.query;

    let result = await ctx.pg.save(ctx.sql.save(data));
    console.log('/////////', result);

    ctx.body = JSON.stringify(result);
  },
  'GET /api/user': async (ctx) => {
    // let data = JSON.parse(ctx.request.body);
    let params = ctx.request.query || ctx.query;
    let message = null;
    let result = await ctx.pg.save(ctx.sql.save(data));

    /*if(_.isEmpty(users)) {
     message = '用户不存在'
     } else {
     message = users;
     }*/
    ctx.body = '用户不存在';
  },
  // 'POST /api/user_update': updateUser,
  // 'POST /api/user_delete': deleteUser,
};
