'use strict';
var url = require('url');

module.exports = function(options) {
  var parent = this;

  var opts = typeof options === 'function' ? {custom: options} : options;
  opts.useOriginalUrl = (typeof opts.useOriginalUrl === 'undefined') ? true : opts.useOriginalUrl;

  return async function(ctx, next) {
    // Original: 原件 | 原始
    var requestedUrl = url.parse((opts.useOriginalUrl ? ctx.originalUrl : ctx.url) || '', true);

    var skip = false;

    /**
     * unless({
     *  custom: function(ctx) {
     *    console.log(ctx)
     *  }
     * })
     */
    if (opts.custom) {
      skip = skip || opts.custom(ctx);
    }

    var paths = !opts.path || Array.isArray(opts.path) ?
                opts.path : [opts.path];
    /**
     * unless({
     *  path: [/^\/system\/register/, /^\/system\/login/, /^\/system\/token/,]
     * })
     */
    if (paths) {
      // 只要其中有一个符合要求，则成功
      skip = skip || paths.some(function(p) {
        return (typeof p === 'string' && p === requestedUrl.pathname) ||
          (p instanceof RegExp && !! p.exec(requestedUrl.pathname));
      });
    }
    console.log('skip1:', skip);

    var exts = !opts.ext || Array.isArray(opts.ext) ?
               opts.ext : [opts.ext];

    /**
     * exterior 外部的;external 外部的;externally 外部地;extent 范围
     * unless({ ext: ['html', 'css'] })
     */
    if (exts) {
      skip = skip || exts.some(function(ext) {
         return requestedUrl.pathname.substr(ext.length * -1) === ext;
      });
    }

    var methods = !opts.method || Array.isArray(opts.method) ?
                  opts.method : [opts.method];

    /**
     * unless({ method: ['GET', 'OPTIONS'] })
     */
    if (methods) {
      skip = skip || !!~methods.indexOf(ctx.method);
    }


    if (skip) {
      return await next();
    }

    return parent(ctx, next);
  };
};
