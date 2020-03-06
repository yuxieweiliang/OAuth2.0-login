/**
 * Controller Error handler
 * 格式：`Tolerance: ${name}.${method}`
 */
class Tolerance extends Error {
  constructor(name, method, code, ...args) {
    super()
    this.message = `${name}.${method}`
    this.replace = args.length > 0 ? args : null
    this.name = 'Tolerance'
    this.code = code
    this.stack = null // 不打印错误栈
  }
}

// koa API Error Middleware
export  default async function tolerance(ctx, next) {
  if (!ctx.Tolerance) {
    ctx.Tolerance = Tolerance
  }
  await next()
}
