import extend from 'extend'

// controller hook
export default new class RouterHooks {
  constructor() { }

  // All routing middleware before execution
  async beforeRun(ctx, next) {
    ctx.queries = this.getQueries(ctx);
    await next()
  }

  // All routing middleware afterF execution
  async afterRun(ctx, next) {
    await next()
  }

  // get user params
  getQueries(ctx) {
    if ('get,head,options'.split(',').includes(ctx.method.toLowerCase())) {
      return ctx.query
    }

    let queries;
    try {
      const body = ctx.request.body;
      queries = extend({}, ctx.query, typeof body === 'string' ? JSON.parse(body) : body);
    } catch (error) {
      queries = ctx.query
    }
    return queries
  }
}
