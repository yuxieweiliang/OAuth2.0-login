// (2) 进入 logger 中间件
export default async function(ctx, next) {
  // 记录请求时间
  let start = new Date;
  console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
  await next();
  // (4) 再次进入 logger 中间件，记录2次通过此中间件「穿越」的时间
  let ms = new Date - start;
  console.log('%s %s - %s', ctx.method, ctx.url, ms);
}