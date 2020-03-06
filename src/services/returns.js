import message from './message'
import { isObject } from './utils'

export default async function (ctx, next) {
  // console.log(ctx.body);
  ctx.body instanceof Error || ctx.status > 399 ? onerror(ctx) : normalized(ctx);
  await next()
}

// Normalized return value
function normalized(ctx) {
  if (Array.isArray(ctx.body) || isObject(ctx.body)) {
    ctx.body = {
      data: ctx.body,
      code: 200
    }
  }
}

// error handler
function onerror(ctx) {
  const body = {
    msg: 'Unknown Path',
    code: -1
  };

  if (ctx.body instanceof Error) {
    const error = ctx.body;

    body.code = error.code;
    body.msg = `(${error.message}) - ${getMessage(error)}`
  }

  ctx.body = body
}

// get message
function getMessage(err) {
  const msg = String(message[err.code] ? message[err.code] : '');

  return formatMessage(msg, err.replace)
}

// format message of replace
function formatMessage(msg, reps) {
  let i = 0

  return msg.replace(/\$\d+/g, function (meta) {
    return reps ? reps[i++] : meta
  })
}
