import hooks from './hooks'
import { getAbsPath } from './utils'
import { routers, prefixs } from './routers'

export function constructor(path) {
  return function (target) {
    return target.prototype[prefixs] = path
  }
}

export function get(path) {
  return methods({
    method: 'get',
    path: path
  })
}

export function post(path) {
  return methods({
    method: 'post',
    path: path
  })
}

export function del(path) {
  return methods({
    method: 'delete',
    path: path
  })
}

export function put(path) {
  return methods({
    method: 'put',
    path: path
  })
}

export function all(path) {
  return methods({
    method: 'all',
    path: path
  })
}

function methods(conf) {
  return function (target, key, desc) {
    conf.path = getAbsPath(conf.path);
    routers.set({
      target: target,
      ...conf
    }, [hooks.beforeRun.bind(hooks), target[key].bind(target), hooks.afterRun.bind(hooks)])
  }
}
